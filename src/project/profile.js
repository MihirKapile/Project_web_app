import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { profile, logout, profileThunk, logoutThunk } from "./user-service";
import * as service from "./service";
import * as userService from "./user-service";
import { Link } from "react-router-dom";

function Profile() {
  const [currentUser, setCurrentUser] = useState({});
  const [likes, setLikes] = useState([]);
  const [followed, setFollowed] = useState([]);

  const fetchFollowed = async (follower) => {
    const followed = await userService.getFollowedUsers(follower);
    setFollowed(followed);
  };
  const fetchLikes = async (userId) => {
    const likes = await service.getLikesForUser(userId);
    setLikes(likes);
  };

  const dispatch = useDispatch();
  const fetchUser = async () => {
    // const user = await profile();
    const { payload } = await dispatch(profileThunk());
    setCurrentUser(payload);
    await fetchLikes(payload._id);
    await fetchFollowed(payload._id);
  };
  useEffect(() => {
    fetchUser();
  }, []);

  const navigate = useNavigate();

  const handleLogout = async () => {
    // await logout();
    await dispatch(logoutThunk());
    navigate("/project/login");
  };

  return (
    <div>
      <h1>Profile</h1>
      <h3>{currentUser.firstName}   {currentUser.lastName}</h3>
      <h4>{currentUser.role}</h4>
      <button className="btn btn-warning" onClick={handleLogout}>Logout</button>
      <hr />
      <h3>People I follow</h3>
      <div className="list-group">
        {followed.map((f) => (
          <Link
            className="list-group-item"
            to={`/project/profile/${f.followed._id}`}
          >
            {f.followed.firstName} {f.followed.lastName}
          </Link>
        ))}
      </div>
      <hr />
      <h3>Restaurants I like</h3>
      <div className="list-group">
        {likes.map((like) => (
          <Link
            className="list-group-item"
            to={`/project/details/${like.restaurantId}`}
          >
            {like.restaurant.name}
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Profile;
import { useState, useEffect } from "react";
import { useParams } from "react-router";
import * as service from "./user-service";
import { Link } from "react-router-dom";

function ProfileOthers() {
  const { userId } = useParams();
  const [user, setUser] = useState({});
  const [currentUser, setCurrentUser] = useState({});
  const [followers, setFollowers] = useState([]);
  const fullNames = followers.map(entry => `${entry.follower.firstName} ${entry.follower.lastName}`);
  const fetchUser = async () => {
    const user = await service.getUserById(userId);
    setUser(user);
  };


  const fetchFollowers = async () => {
    const followers = await service.getFollowerUsers(userId);
    setFollowers(followers);
  };

  const followUser = async () => {
    const follow = await service.userFollowsAnotherUser(userId);
  };

  useEffect(() => {
    fetchUser();
    fetchFollowers();
  }, []);

  return (
    <div>
      <h1>
      <img src={user.avatar} width="50" style={{
                                                borderRadius: '50%',
                                                marginBottom: '10px'
                                            }}/>
        <h3>{user.firstName} {user.lastName}</h3>
        <h4> {user.role} </h4>
        <button onClick={followUser} className="btn btn-primary float-end">
                      Follow
                    </button>

      </h1>
      <br/>
      <h3> Followers </h3>
      <div className="list-group">
            {fullNames.map((fullName, index) => (
              <h5 className="list-group-item" key={index}>{fullName}</h5>
            ))}
      </div>
    </div>
  );
}

export default ProfileOthers;
import { Routes, Route } from "react-router";
import Login from "./login";
import Profile from "./profile";
import Register from "./register";
import Details from "./details";
import Home from "./home";
import Search from "./search";

function Project() {
  return (
    <div>
      <h1>Restaurant Review Service</h1>
      <Routes>
        <Route path="home" element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="profile" element={<Profile />} />
        <Route path="search" element={<Search />} />
        <Route path="search/:searchTerm" element={<Search />} />
        <Route path="details/:id" element={<Details />} />
      </Routes>
    </div>
  );
}

export default Project;
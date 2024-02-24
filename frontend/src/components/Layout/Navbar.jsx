import React, { useContext, useEffect, useState } from "react";
import { Context } from "../../main";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import Logo from '../../../public/assets/paw-white.png'
const Navbar = () => {

  const [show, setShow] = useState(false);
  const { isAuthorized, setIsAuthorized, user } = useContext(Context);
  const navigateTo = useNavigate();
  console.log("abraaa ka daabra")
  const handleLogout = async () => {

    try {
      console.log("abraaa ka daabra")
      const response = await axios.get(
        "http://localhost:4000/api/v1/user/logout",
        {
          withCredentials: true,
        }
      );
      toast.success(response.data.message);
      setIsAuthorized(false);
      navigateTo("/login");

    } catch (error) {
      toast.error(error.response.data.message), setIsAuthorized(true);
    }
  };

  const renderGuestMenu = () => (
    <>
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="/login">Login</Link>
      </li>
      <li>
        <Link to="/registration">Registeration</Link>
      </li>
      <li>
        <Link to="/animals">Animals</Link>
      </li>
      <li>
        <Link to="/event">Events</Link>
      </li>
    </>
  );

  const renderRegisteredUser = () => (
    user && user.role === "Job Seeker" ? (
      <>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/rescue">Rescue Center</Link>
        </li>
        <li onClick={handleLogout}>Logout</li>
      </>

    ) : null

  );
  const renderModeratorMenu = () => (
    user && user.role === "Employer" ? (
      <>
        <li>
          <Link to={"/job/post"} onClick={() => setShow(false)}>
            POST NEW JOB
          </Link>
        </li>
        <li>
          <Link to={"/job/me"} onClick={() => setShow(false)}>
            VIEW YOUR JOBS
          </Link>
        </li>
        <li onClick={handleLogout}>Logout</li>
      </>
    ) : null
  );
  const renderAuthorizedMenu = () => {
    if (user && user.role === "Employer") {
      return renderModeratorMenu();
    } else {
      // Add other role-based menus as needed
      return renderRegisteredUser();
    }
  };

  return (
    <nav className="paws-nav">
      <div className="container">
        <div className="logo paws-logo">
          <Link to="/"> {/* Wrap the logo with Link and set to home page */}
            <img src={Logo} alt="logo" />
          </Link>
        </div>
        <ul className="menu">
          {isAuthorized ? (
            renderAuthorizedMenu()
          ) : (
            renderGuestMenu()
          )}
        </ul>

      </div>
    </nav>
  );
};

export default Navbar;

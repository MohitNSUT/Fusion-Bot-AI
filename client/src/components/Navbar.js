import React from "react";
import { Box, useTheme } from "@mui/material";
import { useNavigate, NavLink } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import "./Navbar.css"; 

const Navbar = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const loggedIn = JSON.parse(localStorage.getItem("authToken"));

  const handleLogout = async () => {
    try {
      await axios.post("/api/v1/auth/logout");
      localStorage.removeItem("authToken");
      toast.success("Logout successfully");
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box className="navbar" style={{ backgroundColor: theme.palette.background.alt }}>
      <h1 className="navbar-title">Fusion-Bot AI</h1>
      {loggedIn ? (
        <>
          <NavLink to="/" className="navbar-link">
            Home
          </NavLink>
          <NavLink to="/login" onClick={handleLogout} className="navbar-link">
            Logout
          </NavLink>
        </>
      ) : (
        <>
          <NavLink to="/register" className="navbar-link signup-signin-bnt">
            Sign Up
          </NavLink>
          <NavLink to="/login" className="navbar-link signup-signin-bnt">
            Sign In
          </NavLink>
        </>
      )}
    </Box>
  );
};

export default Navbar;

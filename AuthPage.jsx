import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

export default function Navbar() {
  return (
    <nav className="navbar">
      <h1 className="logo">My Portfolio</h1>
      <div className="nav-links">
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/portfolio">Portfolio</Link>
        <Link to="/login">Login</Link>
        <Link to="/register">Register</Link>
        
      </div>
    </nav>
  );
}
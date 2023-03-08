import React from "react";
import { Link } from "react-router-dom";


const Navbar = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/home">Home</Link>
        </li>
        <li>
          <Link to="/player">Player</Link>
        </li>
        <li>
          <Link to="/admin">Admin (protected)</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;

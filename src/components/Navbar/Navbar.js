import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-black flex mx-auto gap-3 justify-center">
      <ul className="list-inside">
        <li className="list-item">
          <Link
            to="/home"
            className="text-white hover:text-gray-400"
            activeClassName="text-gray-400"
            exact
          >
            Home
          </Link>
        </li>
        <li className="list-item">
          <Link
            to="/player"
            className="text-white hover:text-gray-400"
            activeClassName="text-gray-400"
            exact
          >
            Player
          </Link>
        </li>
        <li className="list-item">
          <Link
            to="/admin"
            className="text-white hover:text-gray-400"
            activeClassName="text-gray-400"
            exact
          >
            Admin (protected)
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;




import React from "react";
import Logo from "../../Logo/Logo";
import { Link } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";

const Navbar = () => {
  const auth = useAuth();

  return (
    <header>
      <nav className="bg-darkestgray h-{menu} bg-opacity-50 mx-auto p-4 flex text-center items-center justify-between font-primary font-light">
        <div className="header-left">
          <Logo />
        </div>

        <div className="header-right flex gap-4 ">
          {auth.currentUser ? (
            <>
              <Link to='/admin' className="text-white hover:text-gold transition-all">Administration</Link>
              <Link to='/myaccount' className="text-white hover:text-gold transition-all">Mon Compte</Link>
            </>
          ) : (
            <>
              <Link to="/login" className="text-white hover:text-gold transition-all">
                Connexion
              </Link>
              <Link to="/signup" className="text-white hover:text-gold transition-all">
                Inscription
              </Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;

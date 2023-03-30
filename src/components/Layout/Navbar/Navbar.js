import React from "react";
import Logo from "../../Logo/Logo";
import { Link } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";

const Navbar = () => {
  const auth = useAuth();

  const handleLogout = () => {
    auth.logout();
  };

  console.log(auth)
  return (
    <header>
      <nav className="bg-[#191919] bg-opacity-50 mx-auto p-4 flex text-center items-center justify-between font-primary font-light">
        <div className="header-left">
          <Logo />
        </div>

        <div className="header-right flex gap-4 ">
          {auth.currentUser ? (
            <>
              <Link to='/admin' className="text-white hover:text-gold transition-all">Administration</Link>
              <button className="text-white hover:text-gold transition-all" onClick={handleLogout}>Deconnexion</button>
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

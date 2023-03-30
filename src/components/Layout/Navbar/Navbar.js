import React from "react";
import Logo from "../../Logo/Logo";
import { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  return (
    <header>
      <nav className="bg-[#191919] bg-opacity-50 mx-auto p-4 flex text-center items-center justify-between font-primary font-light">
        <div className="header-left">
          <Logo />
        </div>

        {!isLoggedIn && (
          <div className="header-center flex flex-grow justify-center flex-row align-middle gap-4 text-end ">
            <button className="text-red-500 hover:text-gold transition-all" onClick={handleLogin}>Connexion auto</button>
          </div>
        )}

        <div className="header-right flex gap-4 ">
          {isLoggedIn ? (
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

import React from "react";
import Navbar from "./Navbar/Navbar";
import Footer from "./Footer/Footer";

const Layout = ({ children }) => {
  return (
    <div className="bg-darkgray">
      <Navbar />
      <main className="h-screen max-w-full flex text-center align-center justify-start flex-col text-white font-primary ">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
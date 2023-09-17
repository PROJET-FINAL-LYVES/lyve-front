import React from "react";
import Navbar from "./Navbar/Navbar";
import Footer from "./Footer/Footer";

const Layout = ({ children }) => {
  return (
    <div className="bg-darkgray flex min-h-screen h-full flex-col justify-between">
      <Navbar />
      <main className=" max-w-full flex text-center align-center justify-start flex-col text-white font-primary ">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
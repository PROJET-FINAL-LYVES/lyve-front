import React from "react";
import HeroBanner from "../../components/HeroBanner/HeroBanner";
import ServersList from "../../components/ServersList.js/ServersList.js";

const Landing = () => {
  return (
    <div className="w-11/12 mx-auto my-5">
      <HeroBanner />
      <ServersList />
    </div>
  );
};

export default Landing;
;

import React, { useEffect } from "react";
import HeroBanner from "../../components/HeroBanner/HeroBanner";
import ServersList from "../../components/ServersList.js/ServersList.js";
import { useLoading } from "../../context/LoadingContext";
import Loader from "../../components/Loader/Loader";

const Landing = () => {
  const isLoading = useLoading();

  return (
    <div className="w-11/12 mx-auto my-5">
      {isLoading.isLoading ? (
        <Loader />
      ) : (
        <>
          <HeroBanner />
          <ServersList />
        </>
      )}
    </div>
  );
};

export default Landing;
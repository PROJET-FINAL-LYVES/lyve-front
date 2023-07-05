import React from "react";
import HeroBanner from "../../components/HeroBanner/HeroBanner";
import RoomsList from "../../components/Rooms/RoomsList.js";
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
          <RoomsList />
        </>
      )}
    </div>
  );
};

export default Landing;
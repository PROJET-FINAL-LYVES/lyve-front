import React from "react";

const Loader = () => {
    return (
        <div className="fixed top-0 left-0 w-full h-full z-50 flex justify-center items-center bg-black">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-white"></div>
        </div>
    );
};

export default Loader;
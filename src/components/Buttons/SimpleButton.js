import React from "react";

const SimpleButton = ({ label, onClick, rounded = "" }) => {
    return (
        <button className={`btn bg-gold hover:bg-lightgray hover:text-white transition text-black font-bold py-2 px-6 focus:outline-none focus:shadow-outline ${rounded} `} onClick={onClick}>
            {label}
        </button>
    );
};

export default SimpleButton;
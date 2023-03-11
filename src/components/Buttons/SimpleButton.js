import React from "react";

const SimpleButton = ({ label, onClick, className = "" }) => {
    return (
        <button className={`btn ${className}`} onClick={onClick}>
            {label}
        </button>
    );
};

export default SimpleButton;
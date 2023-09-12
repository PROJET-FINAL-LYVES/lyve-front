import React from "react";

const ErrorModal = ({ message, onClose }) => {
    return (
        <div className="modal">
            <div className="modal-content">
                <h2>Error</h2>
                <p>{message}</p>
                <button onClick={onClose}>Back to Home</button>
            </div>
        </div>
    );
};

export default ErrorModal;

import React from "react";
import { Link } from "react-router-dom";

const SocialButtons = () => {
    return (
        <div className="flex flex-row flex-wrap">
            <Link
                to="/"
                className="block w-full text-center mb-5  bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
            >
                Inscrivez-vous avec Facebook
            </Link>
            <Link
                to="/"
                className="block w-full text-center mb-5 bg-white text-black hover:bg-red-700 font-bold py-2 px-4 rounded-full"
            >
                Inscrivez-vous avec Google
            </Link>
        </div>
    );
}

export default SocialButtons;
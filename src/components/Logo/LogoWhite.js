import React from 'react';
import { Link } from 'react-router-dom';

const Logo = (props) => {
    return (
        <span className="logo font-title text-gold w-fit">
            <img src="/assets/lyve-logo-white.svg" alt="logo" className={props.class} />
        </span>

    );
}

export default Logo;
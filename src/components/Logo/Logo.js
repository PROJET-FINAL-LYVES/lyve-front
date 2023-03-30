import React from 'react';
import { Link } from 'react-router-dom';


const Logo = () => {
    return (
        <span className="logo font-title text-gold">
            <Link className='font-bold text-5xl' to="/">LYVE</Link>
        </span>

    );
}

export default Logo;
import React from 'react';
import { Link } from 'react-router-dom';


const Logo = () => {
    return (
        <h1 className="logo font-title text-gold mb-3">
            <Link className='font-bold text-5xl' to="/">LYVE</Link>
        </h1>

    );
}

export default Logo;
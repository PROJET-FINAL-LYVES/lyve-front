import React from 'react';
import { Link } from 'react-router-dom';

const Logo = ( props ) => {
    return (
        <span className="logo font-title text-gold">
            <Link className='font-bold text-5xl' to="/"><img src="/assets/lyve-logo.svg" alt="logo" className={props.class}/></Link>
        </span>

    );
}

export default Logo;
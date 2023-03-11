import React from 'react'

import { Link } from 'react-router-dom'

const Footer = () => {
    return (
        <footer className="bg-darkgray">
            <div className="container mx-auto px-4 py-4">
                <div className="flex flex-wrap items-center md:justify-between justify-center">
                    <div className="w-full md:w-4/12 px-4">
                        <div className="text-sm text-white font-semibold py-1 text-center md:text-left">
                            © 2021
                            <Link
                                to="/"
                                className="text-white hover:text-gray-400 text-sm font-semibold py-1"
                            >
                                Lyve
                            </Link>
                        </div>
                    </div>
                    <div className="w-full md:w-8/12 px-4">
                        <ul className="flex flex-wrap list-none md:justify-end  justify-center">
                            <li>
                                <Link
                                    to="/"
                                    className="text-white hover:text-gray-400 text-sm font-semibold block py-1 px-3"
                                >
                                    About Us
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/"
                                    className="text-white hover:text-gray-400 text-sm font-semibold block py-1 px-3"
                                >
                                    Blog
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/"
                                    className="text-white hover:text-gray-400 text-sm font-semibold block py-1 px-3"
                                >
                                    Github
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/"
                                    className="text-white hover:text-gray-400 text-sm font-semibold block py-1 px-3"
                                >
                                    MIT License
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer
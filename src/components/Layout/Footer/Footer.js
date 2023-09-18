import React from 'react'
import { Link } from 'react-router-dom'
import Logo from '../../Logo/Logo'
import { useContext } from 'react'
import {AuthContext} from '../../../context/AuthProvider'

const Footer = () => {
    const { currentUser } = useContext(AuthContext);
    return (
        <footer className="bg-[#191919] bg-opacity-50  text-white w-200 flex p-6 mt-6">
            <section className='w-1/2 flex gap-4'>
                <div className='column w-1/3  flex flex-col gap-2'>
                    <p className='text-gold text-md mb-4'>
                        Contactez-nous
                    </p>
                    <p className='text-lightgray'>
                        lyvemusic@lyve.com
                    </p>
                    <p className='text-lightgray'>
                        +33 656 56 56 56
                    </p>
                    <p className='text-lightgray'>
                        Rue Raoul Servant, 69007 Lyon
                    </p>
                </div>
                <div className='column w-1/3  flex flex-col gap-2 '>
                    <p className='text-gold text-md mb-4 '>
                        Menu
                    </p>
                    <Link to="/pricing" className="text-lightgray hover:text-gold transition-all">
                        Tarifs
                    </Link>
                    {currentUser ? (
                        <>
                            <Link to='/admin' className="text-lightgray hover:text-gold transition-all">Administration</Link>
                            <Link to='/myaccount' className="text-lightgray hover:text-gold transition-all">Mon Compte</Link>

                        </>
                    ) : (
                        <>
                            <Link to="/login" className="text-lightgray hover:text-gold transition-all">
                                Connexion
                            </Link>
                            <Link to="/signup" className="text-lightgray hover:text-gold transition-all">
                                Inscription
                            </Link>
                        </>
                    )}
                </div>
            </section>
        </footer>
    )
}

export default Footer
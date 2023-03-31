import React from 'react'
import Logo from '../../components/Logo/Logo'
import SimpleButton from '../../components/Buttons/SimpleButton'

const ForgotPassword = () => {

    <div className='bg-black  p-7 w-auto mx-auto my-5 text-darkgray rounded-2xl'>
        <Logo />

        <h2 className='text-white text-2xl font-bold mb-12'>
            Réinitialisation du mot de passe
        </h2>

        <form className=' px-8 pt-6 pb-8 mb-4 text-white'>

            <div className='mb-8'>
                <label className='block text-left text-white text-xs font-bold mb-3' htmlFor='email' >
                    Adresse email ou nom d'utilisateur
                </label>
                <input className='bg-black border-white border text-lightgray font-bold text-sm rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline' id='email' type='text' placeholder="Adresse email ou nom d'utilisateur">
                </input>
            </div>
        </form>

        <SimpleButton
            label='Envoyer'
            type='submit'
            rounded='rounded-full'
        />
    </div>
}

export default ForgotPassword;
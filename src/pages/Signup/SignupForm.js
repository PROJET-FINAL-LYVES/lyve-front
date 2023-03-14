import { React } from "react";
import Logo from "../../components/Logo/Logo";
import SocialButtons from "../../components/Buttons/SocialButtons";
import Separator from "../../components/Separator/Separator";

const SignupForm = () => {

    return (

        <div className="bg-black  p-7 w-auto mx-auto my-5 text-darkgray rounded-lg">
            <Logo/>
            <h2 className="text-white font-bold mb-5"> 
                Inscrivez-vous dès maintenant et vivez une expérience musicale inoubliable.
            </h2>
            <SocialButtons/>
            <Separator/>
            <h2 className="text-white font-bold mb-5">
                Ou inscrivez-vous avec votre adresse e-mail
            </h2>
            <form className=" px-8 pt-6 pb-8 mb-4 text-white">

                <div className="mb-8">
                    <label className="block text-left text-white text-xs font-bold mb-3" htmlFor="email" >
                        Quelle est votre adresse email ?
                    </label>
                    <input className="bg-black border-white border text-lightgray font-bold text-sm rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline" id="email" type="text" placeholder="Saisissez votre adresse e-mail">
                    </input>
                </div>

                <div className="mb-8">
                    <label className="block text-white text-left text-xs font-bold mb-3" htmlFor="email-confirm" >
                        Confirmez votre adresse email
                    </label>
                    <input className="bg-black border-white border rounded-0 text-lightgray font-bold text-sm rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline" id="email-confirm" type="text" placeholder="Confirmez votre adresse e-mail">
                    </input>
                </div>

                <div className="mb-8">
                    <label className="block text-white text-left text-xs font-bold mb-3" htmlFor="password" >
                        Quel est votre mot de passe ?
                    </label>
                    <input className="bg-black p-4 border-white border rounded-0 text-lightgray font-bold text-sm rounded w-full py-2 px-3  mb-3 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" placeholder="Saisissez votre mot de passe">
                    </input>
                </div>

                <div className="mb-8">
                    <label className="block text-white text-left text-xs font-bold mb-3" htmlFor="password-confirm" >
                        Confirmez votre mot de passe
                    </label>
                    <input className="bg-black border-white border rounded-0 text-lightgray font-bold text-sm rounded w-full py-2 px-3  mb-3 leading-tight focus:outline-none focus:shadow-outline" id="password-confirm" type="password" placeholder="Confirmez votre mot de passe">
                    </input>
                </div>

                <div className="mb-8">
                    <label className="block text-white text-left text-xs font-bold mb-3" htmlFor="pseudo" >
                        Comment doit-on vous appeler ?
                    </label>
                    <input className="bg-black border-white border rounded-0 text-lightgray font-bold text-sm rounded w-full py-2 px-3  mb-3 leading-tight focus:outline-none focus:shadow-outline" id="pseudo" type="text" >
                    </input>
                </div>

                <div className="mb-8">
                    <label className="block text-white text-left text-xs font-bold mb-3" htmlFor="birthday" >
                        Quelle est votre date de naissance ?
                    </label>
                    <input className="bg-black border-white border rounded-0 text-lightgray font-bold text-sm rounded w-full py-2 px-3  mb-3 leading-tight focus:outline-none focus:shadow-outline" id="birthday" type="date" >
                    </input>
                </div>
        
                <div className="mb-8">
                    <label className="">

                    </label>
                        <input type="checkbox" className="mr-2 leading-tight" />
                </div>
                <div className="flex items-center justify-between">
                    <button className="bg-lightgray hover:bg-gold hover:text-black transition text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
                        Se connecter
                    </button>
                </div>
            </form>

        </div>

    );
}

export default SignupForm;
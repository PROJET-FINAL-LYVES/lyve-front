import { React, useState } from "react";
import Logo from "../../components/Logo/Logo";
import SocialButtons from "../../components/Buttons/SocialButtons";
import Separator from "../../components/Separator/Separator";
import SimpleButton from "../../components/Buttons/SimpleButton";

import axios from "axios";

const LoginForm = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();
        // Query the MongoDB database with the username and password
        axios
            .get("/user", { email, password })
            .then((response) => {
                console.log(response);
            })
            .catch((error) => {
                console.error(error);
            });
    };

    return (

        <div className="bg-black  p-7 w-auto mx-auto my-5 text-darkgray rounded-2xl">
            <Logo />
            <h2 className="text-white text-2xl font-bold mb-12">
                Pour continuer, connectez-vous à Lyve.
            </h2>
            <SocialButtons />
            <Separator />
            
            <form className=" px-8 pt-6 pb-8 mb-4 text-white">

                <div className="mb-8">
                    <label className="block text-left text-white text-xs font-bold mb-3" htmlFor="email" >
                        Adresse email ou nom d'utilisateur
                    </label>
                    <input className="bg-black border-white border text-lightgray font-bold text-sm rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline" id="email" type="text" placeholder="Saisissez votre adresse e-mail">
                    </input>
                </div>

                <div className="mb-8">
                    <label className="block text-white text-left text-xs font-bold mb-3" htmlFor="password" >
                        Mot de passe
                    </label>
                    <input className="bg-black p-4 border-white border rounded-0 text-lightgray font-bold text-sm rounded w-full py-2 px-3  mb-3 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" placeholder="Saisissez votre mot de passe">
                    </input>
                </div>

                <a href='/forgot' className="hover:text-gold transition-all underline underline-offset-2">
                    <p className="text-xs font-bold mb-3 text-left">
                        Mot de passe oublié ?
                    </p>
                </a>

                <div className="flex items-center justify-start mb-10">
                    <input className="mr-2 leading-tight" type="checkbox" id="checkbox_id" />
                    <label className="text-xs font-bold text-left" htmlFor="checkbox_id">
                        Se souvenir de moi
                    </label>
                </div>
                
                <div className="flex items-center justify-center">
                    <SimpleButton
                        label="Se connecter"
                        type="submit"
                        className="bg-gold hover:bg-lightgray hover:text-white transition text-black font-bold py-2 px-6 rounded-full focus:outline-none focus:shadow-outline"
                    />
                </div>

                <p className="mt-10 text-xs">
                    Vous n'avez pas de compte ? <br/> <a href="/signup" className="text-gold hover:text-gold transition-all underline underline-offset-2 ">Inscrivez-vous</a>
                </p>

            </form>
        </div>

    );
}

export default LoginForm;
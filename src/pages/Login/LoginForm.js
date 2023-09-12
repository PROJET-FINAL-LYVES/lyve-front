import { React, useState } from "react";
import Logo from "../../components/Logo/Logo";
import SocialButtons from "../../components/Buttons/SocialButtons";
import Separator from "../../components/Separator/Separator";
import SimpleButton from "../../components/Buttons/SimpleButton";


import { Link } from "react-router-dom";

import { useLoading } from '../../context/LoadingContext';
import useAuth from "../../hooks/useAuth";


import axios from "axios";

const LoginForm = () => {

    const { setIsLoading } = useLoading();
    const [errorMessage, setErrorMessage] = useState("");

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const instance = axios.create({ baseURL: 'http://localhost:3001' })

    const auth = useAuth();


    const handleSubmit = (event) => {
        event.preventDefault();
        setIsLoading(true);
        instance
            .post("/login", { mail: email, password: password })

           .then((response) => {
            console.log("Full response:", response);
            console.log("Response data:", response.data);
            if (response.data && response.data.user && response.data.user.token) {
                auth.login(response.data.user, response.data.user.token);
            }
        })
            .catch((error) => {
                if (error.response && error.response.data) {
                    setErrorMessage(error.response.data.message.join(' '));
                } else {
                    setErrorMessage("An unknown error occurred.");
                }
                console.error(error);
            })
            .finally(() => {
                setIsLoading(false);
            });
    };

    return (

        <div className="bg-black  p-7 w-auto mx-auto my-5 text-darkgray rounded-2xl">
            <h1>

            </h1>
            <Logo />
            <h2 className="text-white text-2xl font-bold mb-12">
                Pour continuer, connectez-vous à Lyve.
            </h2>
            <SocialButtons />
            <Separator />
            <form
                className="px-8 pt-6 pb-8 mb-4 text-white"
                onSubmit={handleSubmit}
            >
                <div className="mb-8">
                    <label
                        className="block text-left text-white text-xs font-bold mb-3"
                        htmlFor="email"
                    >
                        Adresse email ou nom d'utilisateur
                    </label>
                    <input
                        className="bg-black border-white border text-lightgray font-bold text-sm rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
                        id="email"
                        type="text"
                        placeholder="Saisissez votre adresse e-mail"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>

                <div className="mb-8">
                    <label
                        className="block text-white text-left text-xs font-bold mb-3"
                        htmlFor="password"
                    >
                        Mot de passe
                    </label>
                    <input
                        className="bg-black p-4 border-white border rounded-0 text-lightgray font-bold text-sm rounded w-full py-2 px-3 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                        id="password"
                        type="password"
                        placeholder="Saisissez votre mot de passe"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                {errorMessage && <p className="text-red-500">{errorMessage}</p>}
                <div className="flex items-center justify-center">
                    <SimpleButton
                        label="Se connecter"
                        type="submit"
                        className="bg-gold hover:bg-lightgray hover:text-white transition text-black font-bold py-2 px-6 rounded-full focus:outline-none focus:shadow-outline"
                    />
                </div>

                <p className="mt-10 text-xs">
                    Vous n'avez pas de compte ? <br /> <Link to="/signup" className="text-gold hover:text-gold transition-all underline underline-offset-2 ">Inscrivez-vous</Link>
                </p>
            </form>
        </div>

    );
}

export default LoginForm;
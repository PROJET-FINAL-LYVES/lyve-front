import { React } from "react";
import Logo from "../../components/Logo/Logo";
import SocialButtons from "../../components/Buttons/SocialButtons";
import SimpleButton from "../../components/Buttons/SimpleButton";
import Separator from "../../components/Separator/Separator";

import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useLoading } from '../../context/LoadingContext';

import axios from "axios";

const SignupForm = () => {
    const navigate = useNavigate();

    const { setIsLoading } = useLoading();
    const [errors, setErrors] = useState({}); 

    const [email, setEmail] = useState("");
    const [emailConfirm, setEmailConfirm] = useState("");
    const [newsletter, setNewsletter] = useState(false);
    const [dataSharing, setDataSharing] = useState(false);
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");
    const [pseudo, setPseudo] = useState("");
    const [birthday, setBirthday] = useState("");

    const instance = axios.create({ baseURL: 'http://localhost:3001' })

    const handleSubmit = (event) => {
        event.preventDefault();
        setIsLoading(true);

        if (!email || !emailConfirm || !password || !passwordConfirm || !pseudo || !birthday) {
            console.error("Tous les champs sont obligatoires.");
            setIsLoading(false);
            return;
        }

        if (email !== emailConfirm) {
            console.error("Les adresses e-mail ne correspondent pas.");
            setIsLoading(false);
            return;
        }

        if (password !== passwordConfirm) {
            console.error("Les mots de passe ne correspondent pas.");
            setIsLoading(false);
            return;
        }

        instance

            .post("/register", {
                username: pseudo,
                mail: email,
                dob: birthday,
                password: password,
                newsletter: newsletter,
                data_sharing: dataSharing,
                password_confirm: passwordConfirm,
            })
            .then((response) => {
                navigate("/login");
            })
            .catch((error) => {
                console.error(error);
            })
            .finally(() => {
                setIsLoading(false); 
            });
    };

    return (

        <div className="bg-black  p-7 w-auto mx-auto my-5 text-darkgray rounded-2xl">
            <Logo />
            <h2 className="text-white text-2xl font-bold mb-12">
                Inscrivez-vous dès maintenant et vivez une expérience musicale inoubliable.
            </h2>
            <SocialButtons />
            <Separator />
            <h2 className="text-white font-bold mb-5">
                Ou inscrivez-vous avec votre adresse e-mail
            </h2>
            <form
                className=" px-8 pt-6 pb-8 mb-4 text-white"
                onSubmit={handleSubmit}
            >
                <div className="mb-8">
                    <label className="block text-left text-white text-xs font-bold mb-3" htmlFor="email" >
                        Quelle est votre adresse email ?
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
                    <label className="block text-white text-left text-xs font-bold mb-3" htmlFor="email-confirm" >
                        Confirmez votre adresse email
                    </label>
                    <input
                        className="bg-black border-white border rounded-0 text-lightgray font-bold text-sm rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
                        id="email-confirm"
                        type="text"
                        placeholder="Confirmez votre adresse e-mail"
                        value={emailConfirm}
                        onChange={(e) => setEmailConfirm(e.target.value)}
                    />
                </div>

                <div className="mb-8">
                    <label className="block text-white text-left text-xs font-bold mb-3" htmlFor="password" >
                        Quel est votre mot de passe ?
                    </label>
                    <input
                        className="bg-black p-4 border-white border rounded-0 text-lightgray font-bold text-sm rounded w-full py-2 px-3  mb-3 leading-tight focus:outline-none focus:shadow-outline"
                        id="password"
                        type="password"
                        placeholder="Saisissez votre mot de passe"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>

                <div className="mb-8">
                    <label className="block text-white text-left text-xs font-bold mb-3" htmlFor="password-confirm" >
                        Confirmez votre mot de passe
                    </label>
                    <input
                        className="bg-black border-white border rounded-0 text-lightgray font-bold text-sm rounded w-full py-2 px-3  mb-3 leading-tight focus:outline-none focus:shadow-outline"
                        id="password-confirm"
                        type="password"
                        placeholder="Confirmez votre mot de passe"
                        value={passwordConfirm}
                        onChange={(e) => setPasswordConfirm(e.target.value)}
                    />
                </div>

                <div className="mb-8">
                    <label className="block text-white text-left text-xs font-bold mb-3" htmlFor="pseudo" >
                        Comment doit-on vous appeler ?
                    </label>
                    <input
                        className="bg-black border-white border rounded-0 text-lightgray font-bold text-sm rounded w-full py-2 px-3  mb-3 leading-tight focus:outline-none focus:shadow-outline"
                        id="pseudo"
                        type="text"
                        value={pseudo}
                        onChange={(e) => setPseudo(e.target.value)}
                    />
                </div>

                <div className="mb-8">
                    <label className="block text-white text-left text-xs font-bold mb-3" htmlFor="birthday" >
                        Quelle est votre date de naissance ?
                    </label>
                    <input
                        className="bg-black border-white border rounded-0 text-lightgray font-bold text-sm rounded w-full py-2 px-3  mb-3 leading-tight focus:outline-none focus:shadow-outline"
                        id="birthday"
                        type="date"
                        value={birthday}
                        onChange={(e) => setBirthday(e.target.value)}
                    />
                </div>

                <div className="mb-8 flex text-left items-center">
                    <input type="checkbox" className="mr-2 leading-tight inline " />
                    <label className=" text-white text-left text-xs font-light  inline-block">
                        Devenir artiste sur Lyve
                    </label>
                </div>
                <div className="mb-8 flex text-left items-center">
                    <input 
                        type="checkbox" 
                        className="mr-2 leading-tight inline " 
                        onChange={(e) => setNewsletter(e.target.checked)}
                    />
                    <label className=" text-white text-left text-xs font-light  inline-block">
                        J'accepte de recevoir des actualités et des offres.                    
                    </label>
                </div>
                <div className="mb-8 flex text-left items-center">
                    <input 
                        type="checkbox" 
                        className="mr-2 leading-tight inline "
                        onChange={(e) => setDataSharing(e.target.checked)}    
                    />
                    <label className=" text-white text-left text-xs font-light  inline-block">
                        Partagez les données sur mon inscription avec les fournisseurs de contenu à des fins de marketing. Notez que vos données peuvent être transférées vers des pays en dehors de l'Espace économique européen, comme précisé dans notre Politique de confidentialité.
                    </label>
                </div>
                <p className="mb-8 flex text-xs text-center items-center">
                    En vous inscrivant, vous acceptez nos Conditions d'utilisation et notre Politique de confidentialité.
                </p>
                <p className="mb-8 flex text-xs text-center items-center">
                    Pour en savoir plus sur la façon dont Lyve recueille, utilise, partage et protège vos données personnelles, veuillez consulter la Politique de confidentialité de Lyve.
                </p>
                {errors.email && <p>{errors.email}</p>}
                {errors.pseudo && <p>{errors.pseudo}</p>}
                <div className="flex items-center justify-center">
                    <SimpleButton
                        label="S'inscrire"
                        type="submit"
                        className="bg-gold hover:bg-lightgray hover:text-white transition text-black font-bold py-2 px-6 rounded-full focus:outline-none focus:shadow-outline"
                    />
                </div>
            </form>
        </div>

    );
}

export default SignupForm;
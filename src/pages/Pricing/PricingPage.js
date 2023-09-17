import Logo from '../../components/Logo/Logo';
import React from 'react';

const PricingPage = () => {
    return (
        <div className="flex flex-col items-center justify-center">
            <div className="mb-10 text-center">
                <Logo />
                <h1 className="text-white text-2xl font-bold">Choisissez un abonnement et débloquez les fonctionnalités exclusives</h1>
            </div>

            {/* Blocs de tarification */}
            <div className="flex space-x-8">
                {/* Plan Basique */}
                <div className="bg-lightgray p-7 w-auto mx-auto my-5 flex flex-col justify-between text-darkgray rounded-2xl">
                    <h2 className="text-white text-xl font-bold mb-4">Basique</h2>
                    <ul className="list-disc text-left list-inside mb-4 text-white">
                        <li>Accès aux fonctionnalités de base</li>
                        <li>Création d'une room artiste </li>
                        <li>Augmentation de la taille des rooms</li>

                    </ul>
                    <button className="bg-gold hover:bg-darkgray hover:text-white transition text-black font-bold  w-fit mx-auto py-2 px-6 rounded-full focus:outline-none focus:shadow-outline">
                        S'abonner pour 8.99€/mois
                    </button>
                </div>
                {/* Plan Premium */}
                <div className="bg-lightgray p-7 w-auto mx-auto my-5 flex flex-col justify-between text-darkgray rounded-2xl">
                    <h2 className="text-white text-xl font-bold mb-4">Premium</h2>
                    <ul className="list-disc text-left list-inside mb-4 text-white">
                        <li>Accès aux fonctionnalités du plan <span className='text-gold'>basique</span></li>
                        <li>Augmentation de la taille des rooms</li>
                        <li>Diffusion de votre musique sous forme de publicité</li>
                        <li>Support amélioré</li>
                    </ul>
                    <button className="bg-gold hover:bg-darkgray hover:text-white transition text-black font-bold py-2 px-6 w-fit mx-auto rounded-full focus:outline-none focus:shadow-outline">
                        S'abonner pour 16.99€/mois
                    </button>
                </div>
                <br/>

            </div>
                <p className='text-sm mx-auto text-lightgray'>Les rooms <b>artiste</b> sont permanentes et vous seul avez la possibilité d'ajouter des vidéos à la playlist.</p>
        </div>
    );
};

export default PricingPage;

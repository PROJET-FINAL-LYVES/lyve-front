import React from 'react'
import { useAuth } from '../../context/AuthContext'
import { useEffect } from 'react'
import SimpleButton from "../../components/Buttons/SimpleButton"; 

const MyAccount = () => {

    const auth = useAuth();
    useEffect(() => {
        console.log(auth)
    }, [auth]);


    const handleLogout = () => {
        auth.logout();
    };


    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();

        return `${day}-${month}-${year}`;
    };
   
    return (
        <div className="bg-black p-7 w-auto mx-auto my-5 text-darkgray rounded-2xl">
            <h1 className="text-white text-2xl font-bold mb-12">
                Mon compte
            </h1>
            <div className="text-white mb-6">
                <p>
                    <span className="font-bold">Nom d'utilisateur : </span>
                    {auth.currentUser.username}
                </p>
                <p className="mt-4">
                    <span className="font-bold">Email : </span>
                    {auth.currentUser.mail}
                </p>
                <p className="mt-4">
                    <span className="font-bold">Date de naissance : </span>
                    {formatDate(auth.currentUser.dob)}
                </p>
            </div>
            <SimpleButton
              onClick={handleLogout}
              label='Déconnexion'/>
        </div>
    )
}

export default MyAccount
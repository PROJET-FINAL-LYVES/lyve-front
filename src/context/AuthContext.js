import { createContext, useState, useContext, useEffect } from "react";
import Cookies from "js-cookie";
import { io } from "socket.io-client";

const AuthContext = createContext();

export const useAuth = () => {
    return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [socket, setSocket] = useState(null);

    useEffect(() => {
        const storedUser = Cookies.get("user"); 
        const storedToken = Cookies.get("token");


        if (storedUser && storedUser !== "undefined") {
            setCurrentUser(JSON.parse(storedUser));

            const newSocket = io("http://localhost:3001", {  
                auth: {
                    token: storedToken
                }
            });

            newSocket.on("connect", () => {
                console.log("Socket connecté avec succès !");
            });

            setSocket(newSocket);
        }
    }, []);

    const login = (user, token) => {
        console.log("Tentative de connexion avec l'utilisateur et le token:", user, token);

        setCurrentUser(user);
        Cookies.set("user", JSON.stringify(user), { expires: 7 });
        Cookies.set("token", token, { expires: 7 });  // Utilisez le token ici

        // Initialize socket connection
        const newSocket = io("http://localhost:3001", {
            auth: {
                token: token  // Utilisez le token ici
            }
        });

        newSocket.on("connect", () => {
            console.log("Socket connecté avec succès après la connexion !");
        });

        setSocket(newSocket);
    };


    const logout = () => {
        console.log("Déconnexion de l'utilisateur et fermeture du socket.");

        setCurrentUser(null);
        Cookies.remove("user");
        Cookies.remove("token");

        if (socket) {
            socket.disconnect();
        }
    };

    const value = {
        currentUser,
        login,
        logout,
        socket // Expose socket to be used in other components
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

import React, { createContext, useState, useEffect } from 'react';
import io from 'socket.io-client';
import Cookies from 'js-cookie';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [socket, setSocket] = useState(null);

    useEffect(() => {
        const storedUser = Cookies.get("user");
        const storedToken = Cookies.get("token");

        if (storedUser && storedToken) {
            setCurrentUser(JSON.parse(storedUser));

            const newSocket = io(process.env.REACT_APP_SERVER_URL, {
                auth: {
                    token: storedToken
                }
            });

            newSocket.on("connect", () => {
                console.log("Socket connected successfully!");
            });

            setSocket(newSocket);
            
            return () => {
                newSocket.disconnect();
            };
        }
    }, []);

    const login = (user, token) => {
        setCurrentUser(user);
        Cookies.set("user", JSON.stringify(user));
        Cookies.set("token", token);

        const newSocket = io(process.env.REACT_APP_SERVER_URL, {
            auth: {
                token
            }
        });

        newSocket.on("connect", () => {
            console.log("Socket connected successfully!");
        });

        setSocket(newSocket);
    };

    const logout = () => {
        setCurrentUser(null);
        Cookies.remove("user");
        Cookies.remove("token");

        if (socket) {
            socket.disconnect();
        }
    };

    return (
        <AuthContext.Provider value={{ currentUser, login, logout, socket }}>
            {children}
        </AuthContext.Provider>
    );
};

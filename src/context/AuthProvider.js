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

            // Initialize socket connection
            const newSocket = io("http://127.0.0.1:3001", {
                auth: {
                    token: storedToken
                }
            });

            newSocket.on("connect", () => {
                console.log("Socket connected successfully!");
            });

            setSocket(newSocket);
        }
    }, []);

    const login = (user, token) => {
        setCurrentUser(user);
        Cookies.set("user", JSON.stringify(user));
        Cookies.set("token", token);

        // Initialize socket connection
        const newSocket = io("http://127.0.0.1:3001", {
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

import { createContext, useState, useContext, useEffect } from "react";
import Cookies from "js-cookie";

const AuthContext = createContext();

export const useAuth = () => {
    return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);

    useEffect(() => {
        const storedUser = Cookies.get("user");
        if (storedUser && storedUser !== "undefined") {
            setCurrentUser(JSON.parse(storedUser));
        }
    }, []);

    const login = (user) => {
        setCurrentUser(user);
        Cookies.set("user", JSON.stringify(user), { expires: 7 }); // expires in 7 days
    };

    const logout = () => {
        setCurrentUser(null);
        Cookies.remove("user");
    };

    const value = {
        currentUser,
        login,
        logout,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

import { createContext, useContext } from "react";
import { useState } from "react";

const LoadingContext = createContext();

export const useLoading = () => {
    return useContext(LoadingContext);
};

export const LoadingProvider = ({ children }) => {
    const [isLoading, setIsLoading] = useState(false);
    const value = {
        isLoading,
        setIsLoading,
    };


    return (
        <LoadingContext.Provider value={value}>{children}</LoadingContext.Provider>
    );
};

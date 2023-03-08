import React from "react";
import { Navigate, Outlet } from "react-router-dom";


const ProtectedRoutes = ({
    isAllowed,
    children,
    redirectPath = '/' ,
    }) => {
    if (!isAllowed) {
        return <Navigate to={redirectPath} />;
    }
    return children ? children : <Outlet/>
};

export default ProtectedRoutes;
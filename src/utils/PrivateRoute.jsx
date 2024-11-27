import React from "react";
import { Navigate } from "react-router-dom";
import { useUser } from "../contexts/UserContext";
import UserInfo from "../pages/UserInfo";

function PrivateRoute({children, allowedRoles}){
    const {userInfo} = useUser()

    const userHasRequireRole = userInfo && Array.isArray(allowedRoles) && allowedRoles.includes(userInfo.role)
    if(!userInfo){
        return <Navigate to='/' />   
    }
    if(userInfo && !userHasRequireRole){
        return <Navigate to='/dashboard' />   
    }

    return children
}

export default PrivateRoute
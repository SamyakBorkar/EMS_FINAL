import React from 'react'
import { Navigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

const RoleBasedRoute = ({children , role: requiredRole}) => {
    const token = localStorage.getItem('token');
    if(!token) return <Navigate to={'/login'} />

    try{
        const decode = jwtDecode(token);
        if(decode.role == requiredRole){
            return children;
        }
        else{
            return <Navigate to={'/'} />
        }
    }
    catch(e){
        console.log("error:",e)
        return <Navigate to={'/login'}/>
    }
}

export default RoleBasedRoute
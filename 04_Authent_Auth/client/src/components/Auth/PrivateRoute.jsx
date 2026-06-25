import React from 'react'
import useAuth from '../../hooks/useAuth'
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({children}) => {
    const {token} = useAuth();
   
    if(token !== null){
        return children;
    }else{
        return <Navigate to={'/login'}/>
    }
}

export default PrivateRoute
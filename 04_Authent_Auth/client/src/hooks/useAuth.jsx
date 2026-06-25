import React, { useContext } from 'react'
import { AuthContext } from '../context/AuthContext.jsx'

const useAuth = () => {
    const{token, user, setToken, loading, setUser, setLoading} = useContext(AuthContext);
  return {token, user, loading,setToken, setUser, setLoading};    
}

export default useAuth
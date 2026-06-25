import React from 'react'
import useAuth from '../../hooks/useAuth'

const OpenRoute = ({children}) => {
  const{token} = useAuth();
  
  if(token === null){
    return children;
  }
}

export default OpenRoute
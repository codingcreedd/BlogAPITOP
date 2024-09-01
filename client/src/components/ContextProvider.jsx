import React, { useState } from 'react'
import { createContext, Provider } from 'react'

export const Context = createContext(null);

const ContextProvider = ({children}) => {

    const [authState, setAuthState] = useState(false);
    const [signUp, setSignUp] = useState(true);
    const [mainPost, setMainPost] = useState({});
    const [featuredPosts, setFeaturedPosts] = useState([]);
    const [latestPosts, setLatestPosts] = useState([])

    const states = {
        authState, setAuthState,
        signUp, setSignUp,
        mainPost, setMainPost,
        featuredPosts, setFeaturedPosts,
        latestPosts, setLatestPosts
    }

  return (
    <Context.Provider value={states}>
        {children}
    </Context.Provider>
  )
}

export default ContextProvider
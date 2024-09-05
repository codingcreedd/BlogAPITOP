import React, { useEffect, useState } from 'react'
import { createContext, Provider } from 'react'
import logs from '../apis/logs';

export const Context = createContext(null);

const ContextProvider = ({children}) => {

    const [authState, setAuthState] = useState(false);
    const [signUp, setSignUp] = useState(true);
    const [mainPost, setMainPost] = useState({});
    const [featuredPosts, setFeaturedPosts] = useState([]);
    const [latestPosts, setLatestPosts] = useState([]);
    const [userId, setUserId] = useState(0);

    const states = {
        authState, setAuthState,
        signUp, setSignUp,
        mainPost, setMainPost,
        featuredPosts, setFeaturedPosts,
        latestPosts, setLatestPosts,
        userId, setUserId
    }

    useEffect(() => {
        const auth =  async () => {
          await logs.get('/protected').then(response => {
            if(response.data.authenticated){
              setAuthState(true);
              setUserId(response.data.user.id);
            } else {
              setAuthState(false);
            }
          })
        }

        auth();
    }, [])

  return (
    <Context.Provider value={states}>
        {children}
    </Context.Provider>
  )
}

export default ContextProvider
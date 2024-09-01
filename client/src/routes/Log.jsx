import React, { useContext, useState } from 'react'
import { Context } from '../components/ContextProvider'
import LogInForm from '../components/LogInForm';
import SignUpForm from '../components/SignUpForm';

const Log = () => {

    const {signUp} = useContext(Context);
    
  return (
    <div>
        {
            signUp ? (
                <SignUpForm />
            ) : (
                <LogInForm />
            )
        }
    </div>
  )
}



export default Log
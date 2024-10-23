import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'


//This component is made to control access to protected routes by redirecting users based on their authentication status while displaying a loading state during navigation checks.
export default function Protected({ children, authentication = true }) {

    const navigate = useNavigate();
    const [loader, setLoader] = useState(true);  // Loader state to show a loading screen if needed
    const authStatus = useSelector(state => state.auth.status)

    useEffect(() => {

        // Redirect to the login page if the user is not authenticated
        if (authentication && authStatus !== authentication) {// Execute if {true && false !== true} = {true && true} = true
            navigate("/login")


            // If the user is authenticated but shouldn't have access, redirect to the home page
        } else if (!authentication && authStatus !== authentication) { // Execute if {false && true !== true} = {false && false} = true 
            navigate("/")
        }
        // Note: authentication is send by user

        setLoader(false)

    }, [authStatus, navigate, authentication]) // navigate usually doesn't change, but including it ensures the effect uses the latest version if React Router updates. As it is a function of react-router-dom.

    return loader ? <h1>Loading...</h1> : <>{children}</>

}


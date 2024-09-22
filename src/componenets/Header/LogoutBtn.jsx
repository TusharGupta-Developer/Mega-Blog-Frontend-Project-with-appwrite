import React from 'react'
import { useDispatch } from 'react-redux'
import authService from '../../appwrite/auth'
import { logout } from '../../store/authSlice'

function LogoutBtn() {
    const dispatch = useDispatch()
    const LogoutHandler = () => {
        authService.logout().then(() => { // as async function logout in auth.js does not use return, but it used with async so it will return promise but value will be undefined. So how to check properly that session is deleted in logout function in auth.js ????????????
            dispatch(logout())
        })
    }

    return (
        <button className='inline-block px-6 py-2 duration-200 hover:bg-blue-100'>
            Logout</button>
    )
}

export default LogoutBtn
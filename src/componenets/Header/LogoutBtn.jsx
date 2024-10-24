import React from 'react';
import { useDispatch } from 'react-redux';
import authService from '../../appwrite/auth';
import {logout} from '../../store/authSlice'

function LogoutBtn() {
    const dispatch = useDispatch();

    const logoutHandler = async () => {
        const result = await authService.logout(); // Await the logout operation
        if (result) {
            dispatch(logout()); // Dispatch the logout action only if the operation succeeded
        } else {
            // Optionally, handle logout failure (e.g., show an error message)
            console.error("Logout failed, please try again.");
        }
    };

    return (
        <button
            className='inline-block px-6 py-2 duration-200 hover:bg-blue-100 rounded-full'
            onClick={logoutHandler}
        >
            Logout
        </button>
    );
}

export default LogoutBtn;

import React, { useState } from 'react'
import authService from '../appwrite/auth'
import { Link, useNavigate } from 'react-router-dom'
import { login } from '../store/authSlice'
import { Button, Input, Logo } from './index'
import { useDispatch } from 'react-redux'
import { useForm } from 'react-hook-form'


function Signup() {
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { register, handleSubmit, formState: { errors } } = useForm();

    const create = async (data) => {
        setError("");
        try {
            const userData = await authService.createAccount(data)
            if (userData) {
                const userData = await authService.getCurrentUser()
                if (userData) dispatch(login(userData))
                navigate('/')
            }
        } catch (error) {
            setError(error.meassge)
        }
    }

    return (
        <div className="flex items-center justify-center">
            <div className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}>

                <div className="mb-2 flex justify-center">
                    <span className="inline-block w-full max-w-[100px]">
                        <Logo width="100%" />
                    </span>
                </div>

                <h2 className="text-center text-2xl font-bold leading-tight">Sign up to create account</h2>
                <p className="mt-2 text-center text-base text-black/60">
                    Already have an account?&nbsp;
                    <Link
                        to="/login"
                        className="font-medium text-primary transition-all duration-200 hover:underline"
                    >
                        Sign In
                    </Link>
                </p>
                {error && <p className="text-red-600 mt-8 text-center">{error}</p>}

                {/* Form */}
                <form onSubmit={handleSubmit(create)}>
                    <div className='space-y-5'>
                        {/* Name Input */}
                        <Input
                            label="Full Name"
                            type="text"
                            placeholder="Enter your full name"
                            {...register("name", {
                                required: true
                            })}
                        />

                        {/* Email Input */}
                        <Input
                            label="Email"
                            type="email"
                            placeholder="Enter your email"
                            {...register("email", {
                                required: true,
                                validate: {
                                    matchPattern: (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) || "Please enter a valid address"
                                }
                            })}
                        />
                        {/* Display Error meassge */}
                        {errors.email && <p className='text-red-600'>{errors.email.message}</p>}

                        {/* Password Input */}
                        <Input
                            label="Password"
                            type="password"
                            placeholder="Enter your password"
                            {...register("password", {
                                required: true,
                                validate: {
                                    matchPattern: (value) => /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(value) || "Password must be at least 8 characters long, include an uppercase letter, a lowercase letter, a number, and a special character"
                                }
                            })}
                        />
                        {/* Display Error meassge */}
                        {errors.password && <p className='text-red-600'>{errors.password.message}</p>}

                        {/* Submit Button */}
                        <button type='submit' className='w-full'>
                            Create Account
                        </button>

                    </div>

                </form>



            </div>
        </div>
    )
}

export default Signup
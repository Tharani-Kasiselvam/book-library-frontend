import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuthStore } from '../store/authStore'
import toast from "react-hot-toast";

const Login = () => {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const {login, isLoading, error} = useAuthStore()
    const navigate = useNavigate()

    const handlelogin = async(e) => {
        e.preventDefault()

        try {
           const {message} = await login(email, password)
            toast.success(message,"success")
            navigate("/")
        } catch (error) {
            console.log(error)
        }
    }
    
  return (
    <div className='px-5'>
        <h2 className='text-center fw-bold mx-auto'>Login</h2>
    
        <form onSubmit={handlelogin} className='d-flex flex-column justify-center align-items-center mx-auto gap-4'>
            <div className='d-flex flex-column'>
                <label className='md-text-lg'>Email: </label>
                <input type='text'
                value = {email}
                onChange={(e)=>setEmail(e.target.value)}
                className='px-3 py-1.5 md-py-2 text-black rounded-pill bg-white border border-secondary'/>
            </div>
            <div className='d-flex flex-column'>
                <label className='md-text-lg'>Password: </label>
                <input type='password'
                value = {password}
                onChange={(e)=>setPassword(e.target.value)}
                className='px-3 py-1.5 md-py-2 text-black rounded-pill bg-white border border-secondary'/>
            </div>

            {error && <p className='text-danger fw-bold'>{error}</p>}

            <button 
            type = "submit" 
            className='btn btn-dark rounded-pill px-3 py-1'
            disabled = {isLoading}
            >
            {isLoading ? "Please wait..." : "Log In"}
            </button>
            <p>Don't have an account? <Link to="/signup" className='text-black fw-bold'>Sign Up</Link></p>
        </form>
    </div>
  )
}

export default Login
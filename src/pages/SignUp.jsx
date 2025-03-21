import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuthStore } from '../store/authStore'
import toast from 'react-hot-toast'

const SignUp = () => {
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")

    const {signup, isLoading, error} = useAuthStore()
    const navigate = useNavigate()

       const handleSignUp = async (e) => {
        e.preventDefault()
        
        try {
            if(password !== confirmPassword){
                //toast notification
                toast.error("Passwords must match")
                return ;
            }

            if(!username || !email){
                toast.error("All the fields are required")
                return;
            }

            await signup(username, email, password)
            toast.success("Resgistered successfully")
            navigate("/login")

        } catch (error) {
            console.log(error.message)
        }

        // console.log("username: ", username)
        // console.log("email: ", email)
        // console.log("password: ", password)
        // console.log("confirmPassword: ", confirmPassword)
    }
  return (
    <div className='px-5'>
        <h2 className='text-center fw-bold mx-auto'>SignUp</h2>
        <form onSubmit = {handleSignUp} className='d-flex flex-column justify-center align-items-center mx-auto gap-4 w-gull'>
            <div className='d-flex flex-column'>
                <label className='md-text-lg'>UserName: </label>
                <input type='text' 
                className='px-3 py-1.5 md-py-2 text-black rounded-pill bg-white border border-secondary'
                value = {username}
                onChange={(e)=>setUsername(e.target.value)}
                />
            </div>

            <div className='d-flex flex-column'>
                <label className='md-text-lg'>Email: </label>
                <input type='email'
                className='px-3 py-1.5 md-py-2 text-black rounded-pill bg-white border border-secondary'
                value = {email}
                onChange={(e)=>setEmail(e.target.value)}
                />
                
            </div>
            <div className='d-flex flex-column'>
                <label className='md-text-lg'>Password: </label>
                <input type='password' 
                className='px-3 py-1.5 md-py-2 text-black rounded-pill bg-white border border-secondary'
                value = {password}
                onChange={(e)=>setPassword(e.target.value)}
                />
            </div>
            
            <div className='d-flex flex-column'>
                <label className='md-text-lg'>Confirm Password: </label>
                <input type='password' 
                className='px-3 py-1.5 md-py-2 text-black rounded-pill bg-white border border-secondary'
                value = {confirmPassword}
                onChange={(e)=>setConfirmPassword(e.target.value)}
                />
            </div>

            {error && <p className='text-danger fw-bold'>{error}</p>}

            <button 
            type = "submit" 
            className='btn btn-dark rounded-pill px-3 py-1'
            disabled = {isLoading}
            >
                {isLoading ? "Please wait..." : "Sign Up"}
            </button>

            <p>Already have an account? <Link to="/login" className='text-black fw-bold'>Log in</Link></p>
        </form>

    </div>
  )
}

export default SignUp
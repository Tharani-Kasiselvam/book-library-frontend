import { useNavigate } from "react-router-dom"
import { useAuthStore } from "../store/authStore"
import { useEffect } from "react"

const RedirectAuthUsers = ({children}) => {

    const {user} = useAuthStore()
    const navigate = useNavigate()

    console.log("RedirectAuth: ",user)

    useEffect(()=>{
        if(user)
            navigate("/")
    },[user, navigate])

      // Render children only if no user is logged in
    if(user)
        return null //Don't render anything while redirecting

    return <>{children}</>
    
}

export default RedirectAuthUsers
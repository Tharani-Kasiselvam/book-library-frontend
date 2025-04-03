import { Link, useNavigate } from "react-router-dom"
import { useAuthStore } from "../store/authStore"
import toast from "react-hot-toast";


const Navbar = () => {

    const {user, logout, fetchingUser} = useAuthStore()
    const navigate = useNavigate()

    console.log("User:", user, "***", fetchingUser)

        const handleLogout = async () => {
        const {message} = await logout()
        toast.success(message)
        navigate("/login")
    }

    return (
        <nav className="navbar bg-dark border-bottom border-body text-white flex justify-between px-4 md-px-12 py-4 md-py-6" data-bs-theme="dark">

            <Link to="/">
            <label className="fw-semibold md-text-lg lg-text-xl text-white">BookLib</label>
            </Link>

            {/* <ToastContainer /> */}


           {!user ? 
            <div className="d-flex align-items-center flex-row gap-5 md-text-lg">
            <Link to="/login" className="text-decoration-none"><p className="text-white">Add Book</p></Link>
            <Link to="/login" className="text-decoration-none"><p className="text-white">Login</p></Link>
            <Link to="/signup" className="text-decoration-none"><p className="badge bg-secondary px-3 py-2">Sign Up</p></Link>
            </div>
            :
            <div className="d-flex align-items-center flex-row gap-5 md-text-lg">
            <Link to="/add-book" className="text-decoration-none">
                <p className="text-white text-decoration-none">Add Book</p></Link>
            <p className="text-white">Welcome {user.username}</p>
            <button onClick={handleLogout} className="btn btn-secondary btn-sm mb-3">Logout</button>
            </div>
           }
        </nav>
        
    )

}

export default Navbar
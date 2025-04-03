import { create } from "zustand";
import axios from "axios";

// const API_URL = "http://localhost:3001/api/v1"
const API_URL = "https://book-library-backend-n1wx.onrender.com/api/v1"
axios.defaults.withCredentials = true

export const useAuthStore = create((set) => ({
    //initial state
    user : null,
    isLoading : false,
    error : null,
    message : null,
    fetchingUser : true,

    //functions
    signup: async (username, email, password) => {
        set({isLoading : true, message : null})

        try {
            const signup_res = await axios.post(`${API_URL}/signup`,{
                username,
                email,
                password
            })
            console.log(signup_res)
            set({
                // user : signup_res.data.user, 
                isLoading : false
            })
        } catch (error) {
             set({
                isLoading : false,
                error : error.response.data.message || "Error in Sign Up"
             })

             throw error
        }
    },

    login : async (email, password) => {
        set({isLoading: true, message: null, error: null})

        try {
            const login_res = await axios.post(`${API_URL}/login`,{
                email,
                password
            })

            console.log(login_res)
            const {user, message} = login_res.data

            set({
                user, 
                isLoading:false, 
                message})

            return {user, message}
        } catch (error) {
            set({
                isLoading : false,
                error : error.response.data.message || "Error Logging in"
            })
            throw error
        }
    },

    fetchUser : async () => {
        set({fetchingUser : true, error:null})

        try {
            const response = await axios.get(`${API_URL}/fetch-user`)

            set({user : response.data.user, fetchingUser: false})
        } catch (error) {
            set({
                fetchingUser : false,
                error : null,
                user : null
            })
        }
    },

    logout : async () =>{
        set({isLoading:true, error:null, message:null})

        try {
            const response = await axios.post(`${API_URL}/logout`)

            const {message} = response.data

            set({message, isLoading:false, user:null, error:null })

            return {message}
        } catch (error) {
            set({
                iLoading : false,
                error : error.response.data.message || "Error logging out",
                user : null
            })
        }
    }
})) 
import { Route, Routes } from 'react-router-dom'
import Navbar from './Components/Navbar'
import './index.css'
import AddBook from './pages/AddBook'
import HomePage from './pages/HomePage'
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import { useAuthStore } from './store/authStore'
import { useEffect } from 'react'
import { Toaster } from "react-hot-toast";
import RedirectAuthUsers from './providers/RedirectAuthUsers'
import RedirectUnAuthUsers from './providers/RedirectUnAuthUsers'
import Footer from './Components/Footer'
import Searchpage from './pages/SearchPage'
import Bookpage from './pages/BookPage'
import UpdateBook from './pages/UpdateBook'


function App() {

  const { fetchUser, fetchingUser } = useAuthStore()

  useEffect(() => {
    fetchUser()
  }, [fetchUser])

  if (fetchingUser) {
    return <p>Loading...</p>
  }

  return (
    <div>
      <Toaster />
      <Navbar />
      <Routes>
        <Route path={"/"} element={<HomePage />} />

        <Route path={"/login"} element={
          <RedirectAuthUsers>
            <Login />
          </RedirectAuthUsers>
        } />
        <Route path={"/signup"} element={
          <RedirectAuthUsers>
            <SignUp />
          </RedirectAuthUsers>}
        />

        <Route path={"/add-book"} element={
          <RedirectUnAuthUsers>
          <AddBook />
          </RedirectUnAuthUsers>
        } />
        
        <Route path="/search" element={<Searchpage />} />

        <Route path="/book/:id" element={<Bookpage />} />
        
        <Route path="/book/:id" element={<Bookpage />} />

        <Route
          path="/book/:id/update"
          element={
            <RedirectUnAuthUsers>
              <UpdateBook />
            </RedirectUnAuthUsers>
          }
        />

      </Routes>
      <Footer/>
    </div>
  )
}

export default App
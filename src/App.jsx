import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import authService from './appwrite/auth'
import { login, logout } from './store/authSlice'
import './App.css'
import Header from './componenets/Header/Header';
import Footer from './componenets/Footer/Footer';


function App() {

  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch() // For, when appication loaded to ask user is login or not by using "useEffect"

  useEffect(() => {
    authService.getCurrentUser()
      .then((userData) => {

        if (userData) {
          // Dispatch login action if user data exists
          dispatch(login({ userData }))
        }
        else {
          // If no user data, create an anonymous session
          authService.anonymousLogin();
          dispatch(logout())
        }
  
      }) // For successfully 
      .finally(() => {
        setLoading(false); // Ensure loading is set to false when done
      })
  }, [])

  // return (
  //   <>
  //    <h1>Hello</h1>
  //   </>
  // ) 

  return (!loading ? (
    <>
      <div className='min-h-screen flex flex-wrap content-between bg-gray-400'>
        <div className="w-full block">
          <Header />
          <main>
            {/* <outlet/> */}
          </main>
          <Footer />
        </div>
      </div>
    </>
  ) : null
  )
}

export default App

import React from 'react'
import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom'
import {useAuthContext} from './hooks/useAuthContext'
import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/Signup'

const App = () => {
  const {user} = useAuthContext()

  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={user ? <Home/> : <Navigate to="/login"/>}/>
        <Route path="/login" element={!user ? <Login/> : <Navigate to="/" />}/>
        <Route path="/signup" element={!user ? <Signup/> : <Navigate to="/" />}/>
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
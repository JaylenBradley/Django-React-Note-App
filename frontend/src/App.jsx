/* eslint-disable no-unused-vars */
import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import Home from './pages/Home'
import NotFound from './pages/NotFound'
import ProtectedRoute from './components/ProtectedRoute'

const Logout = () => {
  localStorage.clear()
  return <Navigate to='/login'/>
   
}

const RegisterAndLogout = () => {
  localStorage.clear() //Make sure there aren't any old access tokens in storage
  return <Register/>
}

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route  
          path='/' 
          element={ //Can't access the home component unless you have an access token
           <ProtectedRoute> 
            <Home/> 
          </ProtectedRoute>
          }
        /> 
        <Route path='/login' element={<Login />} /> 
        <Route path='/logout' element={<Logout />} /> 
        <Route path='/register' element={<RegisterAndLogout />} />
        <Route path='/*' element={<NotFound />}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
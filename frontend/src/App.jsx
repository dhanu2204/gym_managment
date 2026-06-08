import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './Login.jsx'
import Register from './Register.jsx'
import Home from './Home.jsx'
import Editprofile from './Editprofile.jsx'
import Calorietracker from './Calorietracker.jsx'
import Vault from './Vault.jsx'
import Progress from './Progress.jsx'
import Chatbot from './Chatbot.jsx'


const App = () => {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/home" element={<Home />} />
      <Route path="/editprofile" element={<Editprofile />} />
      <Route path="/calorietracker" element={<Calorietracker />} />
      <Route path="/vault" element={<Vault />} />
      <Route path="/progress" element={<Progress />} />
      
    </Routes>
    <Chatbot />
    </BrowserRouter>
  )
}

export default App
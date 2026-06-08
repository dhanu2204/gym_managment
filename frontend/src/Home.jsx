import React from 'react'
import { useState, useEffect } from 'react'
import { Form, useNavigate } from 'react-router-dom'
import './Home.css'
import Navbar from './Navbar'
import { Link } from 'react-router-dom'
import Vault from './Vault'

function Home() {

    const[user,setUser]= useState(null)
    const navigate = useNavigate();

    useEffect(()=>{
      
      const userData = localStorage.getItem("user");
      
      if(userData){
          setUser(JSON.parse(userData));
      }else{
        navigate("/login");
      }
      
    },[]);

    if(!user){
      return <div>Loading...</div>
    }
    
  return (
    <div className="page-container">
      <Navbar />
      <div className='home-content'>
        <h1 className="cyber-title">Welcome back, {user.fullName}!</h1>
        
        
        <div className="quick-actions">
            <button className='action-btn' onClick={() => navigate('/calorietracker')}>
              Track Calories
            </button>
            <button className='action-btn' onClick={() => navigate('/vault')}>
              Workouts
            </button>
            <button className='action-btn' onClick={() => navigate('/progress')}>
              Track your Progress
            </button>
        </div>

      </div>
    </div>
  )
}

export default Home
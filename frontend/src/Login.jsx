import React from 'react'
import './Login.css'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
const Login = () => {

    const[email, setEmail] = useState('');
    const[password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleEmailChange = (e)=>{
        setEmail(e.target.value);
    }

    const handlePasswordChange = (e)=>{
        setPassword(e.target.value);
    }

    const handleSubmit = async  (e) => {
        e.preventDefault();
        console.log("data going to backend")
        try{
            // const response = await fetch('http://localhost:8080/api/users/login',{
            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/users/login`,{
              method:'POST',
              headers:{'Content-Type':'application/json'},
              body:JSON.stringify({email,password})
            })
            if(response.ok){
              const userdata = await response.json();
              localStorage.setItem("user",JSON.stringify(userdata));
              navigate("/home");
            }else{
              const errormsg = await response.text();
              alert("Error: "+ errormsg);
            }
        }catch(error){
          console.error('failed to connect to the server:', error);
          alert('Error: ' + error.message);
        }
    }
  return (
    <div className='page-container auth-container'>
      <h1 className="cyber-title">Personal Gym Manager</h1>
      
      <form className='login-form'  onSubmit={handleSubmit}>
        <h2 className='login-title'>Sign In</h2>
        
        <div className='login-input-group'>
          <label htmlFor="email">Email</label>
          <input type="email" id="email" placeholder='Email' required value={email} onChange={handleEmailChange}/>
        </div>
        
        <div className='login-input-group'>
          <label htmlFor="password">Password</label>
          <input type="password" id="password" placeholder='Password' required value={password} onChange={handlePasswordChange} />
        </div>
        
        <button type='submit' className='login-btn-submit' >Login</button>
        
        <footer className='login-footer'>
          Don't have an account? <Link to="/register">Sign Up</Link>
        </footer>
      </form>
    </div>
  )
}

export default Login

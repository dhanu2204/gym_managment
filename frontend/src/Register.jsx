import React from 'react'
import './Register.css'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'


const Register = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    phone: ''
  });

  const[errors,setErrors] = useState({});
  const navigate = useNavigate();

  const validateForm = () =>{
    const newErrors={};

    if(formData.fullName.trim() === ''){
      newErrors.fullName = "Full Name is required";
    }

    if(formData.email.trim() === ''){
      newErrors.email = "Email is required";
    }else if(!formData.email.includes('@')){
      newErrors.email = "Email is invalid";
    }

    if(formData.password.trim() === ''){
      newErrors.password = "Password is required";
    }
    else if(formData.password.length < 6){
      newErrors.password = "Password must be at least 6 characters long";
    }

    if(formData.phone.trim() === ''){
      newErrors.phone = "Phone Number is required";
    }
    else if(formData.phone.length != 10){
      newErrors.phone = "Invalid Phone Number";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  const handleFullNameChange = (e)=>{
    setFormData({...formData, fullName: e.target.value});
  }

  const handleEmailChange = (e)=>{
    setFormData({...formData, email: e.target.value});
  }

  const handlePasswordChange = (e)=>{
    setFormData({...formData, password: e.target.value});
  }

  const handlePhoneChange = (e)=>{
    setFormData({...formData, phone: e.target.value});
  }

    const handleSubmit = async (e) => {
    e.preventDefault();
    
    const isValid = validateForm();

        if (isValid) {
      console.log('1. Validation Passed!');
      try {
        console.log('2. About to start Fetch...'); // Add this!
        
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/users/register`, {
            method:'POST',
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify(formData)
        });
        
        console.log('3. Fetch finished! Response received.');
        
        const resultText = await response.text();
        if(response.ok){
          alert('User registered successfully');
          navigate("/login");
        } else {
          alert("Error: "+ resultText);
        }

      }catch(error){
        console.error('failed to connect to the server:', error);
        alert('Error: ' + error.message);
      }
    } else {
      console.log('Validation Failed!');
    }
  };

  return (
    <div className='page-container auth-container'>
    <h1 className="cyber-title">Personal Gym Manager</h1>
    
            <form className='register-form' onSubmit={handleSubmit}>
        <h2 className='register-title'>Sign Up</h2>
        
        <div className='register-input-group'> 
          <label htmlFor="fullName">FullName</label>
          <input type="text" placeholder='FullName' onChange={handleFullNameChange} />
          {errors.fullName && <span className="error-text">{errors.fullName}</span>}
        </div>
        
        <div className='register-input-group'>
          <label htmlFor="email">Email</label>
          <input type="email" placeholder='Email' onChange={handleEmailChange} />
          {errors.email && <span className="error-text">{errors.email}</span>}
        </div>
        
        <div className='register-input-group'>
          <label htmlFor="password">Password</label>
          <input type="password" placeholder='Password' onChange={handlePasswordChange} />
          {errors.password && <span className="error-text">{errors.password}</span>}
        </div>
        
        <div className='register-input-group'>
          <label htmlFor="phone">Phone Number</label>
          <input type="tel" placeholder='Phone Number' onChange={handlePhoneChange} />
          {errors.phone && <span className="error-text">{errors.phone}</span>}
        </div>

        <button type='submit' className='register-btn-submit'>Register</button>
        <footer className='register-footer'>Already have an account? <Link to="/login">Sign In</Link></footer>
      </form>
    </div>
  )
}

export default Register
import React from 'react'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import './Editprofile.css'
import Navbar from './Navbar'

const Editprofile = () => {

    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        phone: "",
        password: "",
        age: "",
        gender: "",
        weight: "",
        height: "",
        goal: "",
        experience: "",
        emergencyContactName: "",
        emergencyContactPhone: "",
        address: ""
    });

    useEffect(() =>{
        const user = JSON.parse(localStorage.getItem("user"));
        if(user){
            setFormData(user);
        }
    },[]);

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) =>{
        e.preventDefault();
        
        try{
            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/users/update/${formData.email}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData)
            });
            if(response.ok)
            {
                const updatedUser = await response.json();
                localStorage.setItem("user", JSON.stringify(updatedUser));
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
    <div className="page-container">
        <Navbar />
        <h1 className='cyber-title'>Edit Profile</h1>

        <form className='editprofile-form' onSubmit={handleSubmit} >
            <div className="form-grid">
                <div className="input-group">
                    <label htmlFor="name">FullName</label>
                    <input type="text" name="fullName" id="name" value={formData.fullName} onChange={handleInputChange} required placeholder='Enter your Full Name'/>
                </div>

                <div className="input-group">
                    <label htmlFor="email">Email</label>
                    <input type="text" name="email" id="email" value={`${formData.email}`} onChange={handleInputChange} disabled/>
                </div>

                <div className="input-group">
                    <label htmlFor="phone">Phone</label>
                    <input type="text" name="phone" id="phone" value={formData.phone} onChange={handleInputChange} required placeholder='Enter your Phone'/>
                </div>

                <div className="input-group">
                    <label htmlFor="password">Password</label>
                    <input type="text" name="password" id="password" value={formData.password} onChange={handleInputChange} required placeholder='Enter your Password'/>
                </div>

                <div className="input-group">
                    <label htmlFor="age">Age</label>
                    <input type="text" name="age" id="age" value={formData.age} onChange={handleInputChange} required placeholder='Enter your Age'/>
                </div>

                <div className="input-group">
                    <label htmlFor="gender">Gender</label>
                    <input type="text" name="gender" id="gender" value={formData.gender} onChange={handleInputChange} required placeholder='Enter your Gender'/>
                </div>

                <div className="input-group">
                    <label htmlFor="weight">Weight</label>
                    <input type="text" name="weight" id="weight" value={formData.weight} onChange={handleInputChange} required placeholder='Enter your Weight'/>
                </div>

                <div className="input-group">
                    <label htmlFor="height">Height</label>
                    <input type="text" name="height" id="height" value={formData.height} onChange={handleInputChange} required placeholder='Enter your Height'/>
                </div>

                <div className="input-group">
                    <label htmlFor="goal">Goal</label>
                    <input type="text" name="goal" id="goal" value={formData.goal} onChange={handleInputChange} required placeholder='Enter your Goal'/>
                </div>

                <div className="input-group">
                    <label htmlFor="experience">Experience</label>
                    <input type="text" name="experience" id="experience" value={formData.experience} onChange={handleInputChange} required placeholder='Enter your Experience'/>
                </div>

                <div className="input-group">
                    <label htmlFor="emergencyContactName">Emergency Contact Name</label>
                    <input type="text" name="emergencyContactName" id="emergencyContactName" value={formData.emergencyContactName} onChange={handleInputChange} required placeholder='Enter your Emergency Contact Name'/>
                </div>

                <div className="input-group">
                    <label htmlFor="emergencyContactPhone">Emergency Contact Phone</label>
                    <input type="text" name="emergencyContactPhone" id="emergencyContactPhone" value={formData.emergencyContactPhone} onChange={handleInputChange} required placeholder='Enter your Emergency Contact Phone'/>
                </div>

                <div className="input-group full-width">
                    <label htmlFor="address">Address</label>
                    <input type="text" name="address" id="address" value={formData.address} onChange={handleInputChange} required placeholder='Enter your Permenant Address'/>
                </div>
            </div>

            <button type="submit" className='cyber-button save-btn'>Save Changes</button>
        </form>
    </div>
  )
}

export default Editprofile
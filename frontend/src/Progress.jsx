import React, { useState,useEffect } from 'react'
import Navbar from './Navbar'
import './progress.css'

function Progress() {

    const[user,setUser] = useState(null);
    

    useEffect(()=>{
        const userdata = localStorage.getItem('user');
        if(userdata) {
            setUser(JSON.parse(userdata));
        }
    },[])


    const [caloriesToday, setCaloriesToday] = useState(0);

    useEffect(() => {
        if (!user) return;

        const fetchMeals = async () => {
            try {
                const response = await fetch(`${import.meta.env.VITE_API_URL}/api/meal/user/${user.id}`);
                const meals = await response.json();
                
                const today = new Date().toISOString().split('T')[0]; 
                
                let total = 0;
                meals.forEach(meal => {
                    if (meal.createdAt && meal.createdAt.startsWith(today)) {
                        total += meal.calories;
                    }
                });
                
                setCaloriesToday(total); 

            } catch (error) {
                console.error("Failed to fetch meals", error);
            }
        };

        fetchMeals();
    }, [user]); 



  return (
    <div className='page-container'>
        <Navbar />
        <h1 className="cyber-title">Your Daily Progress</h1>
        <div className='home-content'> 
                       <div className="dashboard-grid">
                
                <div className="dashboard-card">
                    <span className="card-title">Calories Today</span>
                    <h2 className="card-value">{caloriesToday} <span className="card-unit">/ 2500 kcal</span></h2>
                    <span className="card-subtitle calories-remaining">{2500-caloriesToday} calories remaining</span>
                </div>

                <div className="dashboard-card">
                    <span className="card-title">Current Weight</span>
                    <h2 className="card-value">{user?.weight ||0}<span className="card-unit">kg</span></h2>
                    <span className="card-subtitle">↓ 1.2 kg this month</span>
                </div>

                <div className="dashboard-card">
                    <span className="card-title">Workout Streak</span>
                    <h2 className="card-value">4 <span className="card-unit">Days 🔥</span></h2>
                    <span className="card-subtitle">You're on fire! Keep it up.</span>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Progress
import React, { useState } from 'react'
import './Vault.css'
import Navbar from './Navbar'

const Vault = () => {
    // 1. React Memory
    const [selectedMuscle, setSelectedMuscle] = useState(null);

    // 2. Our Custom Database (Lightning fast, no API limits!)
    const exerciseLibrary = [
        // Chest
        { id: 1, name: "Barbell Bench Press", muscle: "chest", equipment: "Barbell", target: "Pectorals", gifUrl: "https://fitnessprogramer.com/wp-content/uploads/2021/02/Barbell-Bench-Press.gif", desc: "Lower the bar to your mid-chest and push back up." },
        { id: 2, name: "Incline Dumbbell Press", muscle: "chest", equipment: "Dumbbells", target: "Upper Pectorals", gifUrl: "https://fitnessprogramer.com/wp-content/uploads/2021/02/Incline-Dumbbell-Press.gif", desc: "Press dumbbells upward on a 30-degree incline." },
        
        // Back
        { id: 3, name: "Lat Pulldown", muscle: "back", equipment: "Cable", target: "Lats", gifUrl: "https://fitnessprogramer.com/wp-content/uploads/2021/02/Lat-Pulldown.gif", desc: "Pull the bar down to your upper chest." },
        { id: 4, name: "Pull-ups", muscle: "back", equipment: "Bodyweight", target: "Lats", gifUrl: "https://fitnessprogramer.com/wp-content/uploads/2021/02/Pull-up.gif", desc: "Pull yourself up until your chin clears the bar." },
        
        // Legs
        { id: 5, name: "Squat", muscle: "legs", equipment: "Barbell", target: "Quads & Glutes", gifUrl: "https://fitnessprogramer.com/wp-content/uploads/2021/02/BARBELL-SQUAT.gif", desc: "Keep chest up and squat down until thighs are parallel." },
        { id: 6, name: "Leg Press", muscle: "legs", equipment: "Machine", target: "Quads", gifUrl: "https://fitnessprogramer.com/wp-content/uploads/2021/02/Leg-Press.gif", desc: "Push the platform away using your heels." },

        // Shoulders
        { id: 7, name: "Shoulder Press", muscle: "shoulders", equipment: "Dumbbells", target: "Deltoids", gifUrl: "https://fitnessprogramer.com/wp-content/uploads/2021/02/Dumbbell-Shoulder-Press.gif", desc: "Press dumbbells overhead until arms are extended." },
        
        // Biceps & Triceps
        { id: 8, name: "Bicep Curl", muscle: "biceps", equipment: "Dumbbells", target: "Biceps", gifUrl: "https://fitnessprogramer.com/wp-content/uploads/2021/02/Dumbbell-Curl.gif", desc: "Curl dumbbells up towards your shoulders." },
        { id: 9, name: "Tricep Pushdown", muscle: "triceps", equipment: "Cable", target: "Triceps", gifUrl: "https://fitnessprogramer.com/wp-content/uploads/2021/02/Pushdown.gif", desc: "Push the cable down until arms are fully extended." },
        
        // Abs
        { id: 10, name: "Crunches", muscle: "abs", equipment: "Bodyweight", target: "Core", gifUrl: "https://fitnessprogramer.com/wp-content/uploads/2021/02/Crunch.gif", desc: "Curl your shoulders towards your pelvis." },
        
        // Cardio
        { id: 11, name: "Treadmill Running", muscle: "cardio", equipment: "Treadmill", target: "Heart", gifUrl: "https://fitnessprogramer.com/wp-content/uploads/2021/02/Treadmill.gif", desc: "Run at a steady pace for cardiovascular health." }
    ];

    // 3. Instantly filter the array based on what was clicked!
    const filteredExercises = exerciseLibrary.filter(ex => ex.muscle === selectedMuscle);

  return (
    <div className='page-container'>
        <Navbar />
        <div className='home-content'>

            <h1 className="vault-title">All your exercises in one place</h1>

            <div className='muscle-filter-container'>
                <button className={`muscle-btn ${selectedMuscle === 'chest' ? 'active' : ''}`} onClick={() => setSelectedMuscle('chest')}>Chest</button>
                <button className={`muscle-btn ${selectedMuscle === 'shoulders' ? 'active' : ''}`} onClick={() => setSelectedMuscle('shoulders')}>Shoulders</button>
                <button className={`muscle-btn ${selectedMuscle === 'biceps' ? 'active' : ''}`} onClick={() => setSelectedMuscle('biceps')}>Biceps</button>
                <button className={`muscle-btn ${selectedMuscle === 'triceps' ? 'active' : ''}`} onClick={() => setSelectedMuscle('triceps')}>Triceps</button>
                <button className={`muscle-btn ${selectedMuscle === 'back' ? 'active' : ''}`} onClick={() => setSelectedMuscle('back')}>Back</button>
                <button className={`muscle-btn ${selectedMuscle === 'legs' ? 'active' : ''}`} onClick={() => setSelectedMuscle('legs')}>Legs</button>
                <button className={`muscle-btn ${selectedMuscle === 'abs' ? 'active' : ''}`} onClick={() => setSelectedMuscle('abs')}>Abs</button>
                <button className={`muscle-btn ${selectedMuscle === 'cardio' ? 'active' : ''}`} onClick={() => setSelectedMuscle('cardio')}>Cardio</button>
            </div>

            {selectedMuscle && (
                <div className="vault-container">
                    {filteredExercises.map((ex) => (
                        <div key={ex.id} className="exercise-card">
                            <img src={ex.gifUrl} alt={ex.name} className="exercise-gif" />
                            <div className="exercise-info">
                                <h2>{ex.name}</h2>
                                <p><strong>Target:</strong> {ex.target}</p>
                                <p><strong>Equipment:</strong> {ex.equipment}</p>
                                <p style={{ marginTop: '10px' }}>{ex.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    </div>
  )
}

export default Vault

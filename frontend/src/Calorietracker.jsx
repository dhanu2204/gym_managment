import React, { useState } from 'react'
import Navbar from './Navbar'
import './Calorietracker.css'
import { GoogleGenerativeAI } from '@google/generative-ai'; // <-- 1. Import AI SDK

const Calorietracker = () => {

    const [image, setImage] = useState(null);
    const [previewImage, setPreviewImage] = useState(null);
    
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState(null);

    const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if(file){
            setImage(file);
            setPreviewImage(URL.createObjectURL(file));
        }
    };

    const fileToGenerativePart = async (file) => {
        const base64EncodedDataPromise = new Promise((resolve) => {
            const reader = new FileReader();
            reader.onloadend = () => resolve(reader.result.split(',')[1]);
            reader.readAsDataURL(file);
        });
        return {
            inlineData: { data: await base64EncodedDataPromise, mimeType: file.type },
        };
    };

    const analyzeFood = async () => {
        if (!image) {
            alert("Please upload an image first!");
            return;
        }

        try {
            setLoading(true);
            setResult(null); 
            // We tell Google we ONLY want pure JSON back!
            const model = genAI.getGenerativeModel({ 
                model: "gemini-2.5-flash",
                generationConfig: { responseMimeType: "application/json" }
            }); 
            
            const prompt = `Analyze this food and return a JSON object with this exact structure:
            {
              "foodName": "Name of food",
              "calories": number (estimated total),
              "protein": number (in grams),
              "carbs": number (in grams),
              "fats": number (in grams),
              "sugar": number (in grams),
              "cons": "Cons or negative aspects of eating this",
              "weeklyLimit": "Recommended quantity/frequency per week",
              "hormonalImpact": "Detailed side effects of excess or low intake on human hormones, including any gender-specific impacts"
            }`;
            const imageParts = [await fileToGenerativePart(image)];

            const aiResult = await model.generateContent([prompt, ...imageParts]);
            const response = await aiResult.response;
            const text = response.text();
            
            const parsedData = JSON.parse(text);
            setResult(parsedData); 

            const userData = JSON.parse(localStorage.getItem("user"));
            
            if (userData && userData.id) {
                try {
                    await fetch(`${import.meta.env.VITE_API_URL}/api/meal/add/${userData.id}`, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(parsedData)
                    });
                    console.log("Meal successfully saved to the database!");
                } catch(err) {
                    console.error("Failed to connect to backend", err);
                }
            }

        } catch (error) {
            console.error("Error:", error);
            alert("Failed to analyze image. AI is Busy try again...");
        } finally {
            setLoading(false);
        }
    };

  return (
    <div className='page-container'>
        <Navbar />

        <div className='home-content'>
          <h1 className='cyber-title'>AI Calorie Tracker</h1>

          <div className='stats-card'>
            <h3>Upload Image of your meal</h3>

            <input type="file" accept='image/*' onChange={handleImageChange}  />
            <input type="file" accept="image/*" onChange={handleImageChange}  capture="environment" id="camera-input"/>
            {previewImage && <img src={previewImage} alt="preview" className="preview-image" />}

            <button className='analyze' onClick={analyzeFood} disabled={loading}>
                {loading ? "Analyzing..." : "Analyze Food"}
            </button>
            {/* NEW BEAUTIFUL JSON DASHBOARD */}
            {result && (
                <div className="ai-dashboard">
                    <h2 className="food-title">{result.foodName}</h2>
                    
                    <div className="macros-grid">
                        <div className="macro-box calorie-box">
                            <h4>Calories</h4>
                            <p>{result.calories}</p>
                        </div>
                        <div className="macro-box protein-box">
                            <h4>Protein</h4>
                            <p>{result.protein}g</p>
                        </div>
                        <div className="macro-box carbs-box">
                            <h4>Carbs</h4>
                            <p>{result.carbs}g</p>
                        </div>
                        <div className="macro-box fats-box">
                            <h4>Fats</h4>
                            <p>{result.fats}g</p>
                        </div>
                    </div>

                    <div className="health-details">
                        <div className="detail-card">
                            <h4>⚠️ Cons & Warnings</h4>
                            <p>{result.cons}</p>
                        </div>

                        <div className="detail-card">
                            <h4>📅 Weekly Limit</h4>
                            <p>{result.weeklyLimit}</p>
                        </div>

                        <div className="detail-card">
                            <h4>🧬 Hormonal & Gender Impact</h4>
                            <p>{result.hormonalImpact}</p>
                        </div>
                    </div>
                </div>
            )}
          </div>
        </div>

    </div>
  )
}

export default Calorietracker

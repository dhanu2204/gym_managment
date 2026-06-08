# 🏋️‍♂️ Futuristic Gym Manager

A high-performance, full-stack web application designed to help fitness enthusiasts track their workouts, monitor their daily calories, and get personalized advice from an AI Gym Buddy.

![Gym Manager Interface](frontend/public/favicon.svg) <!-- Replace with an actual screenshot of your app -->

## ✨ Features

- **🦾 AI Gym Buddy:** A built-in Google Gemini AI assistant that acts as your personal trainer. Ask it anything about diet, form, or workout routines!
- **📊 Real-time Dashboard:** Track your daily calories, workout streaks, and weight goals.
- **📚 Exercise Vault:** A comprehensive, filtered library of exercises complete with target muscles and animated demonstrations.
- **🔐 Secure Authentication:** Seamless user registration and login system.
- **🎨 Premium UI/UX:** A stunning, modern "Slate & Indigo" dark-mode interface built with responsive CSS flexbox/grid architecture.

## 🚀 Tech Stack

**Frontend:**
- React (Vite)
- React Router DOM
- Custom Vanilla CSS (Glassmorphism & CSS Variables)
- Google Generative AI SDK (Gemini)

**Backend:**
- Java 21
- Spring Boot
- Spring Data JPA (Hibernate)
- RESTful APIs

**Database & Deployment:**
- TiDB Cloud (Serverless MySQL)
- Vercel (Frontend Hosting)
- Render (Backend Hosting via Docker)

## 🛠️ Local Development Setup

### Prerequisites
- Node.js & npm
- Java 21
- Maven
- MySQL Database (or TiDB Cloud account)

### 1. Clone the repository
```bash
git clone https://github.com/dhanu2204/gym_managment.git
cd gym_managment
```

### 2. Backend Setup
1. Open the `src/main/resources/application.properties` file.
2. Add your database credentials:
   ```properties
   spring.datasource.url=jdbc:mysql://localhost:3306/your_db_name
   spring.datasource.username=root
   spring.datasource.password=your_password
   ```
3. Run the Spring Boot application:
   ```bash
   ./mvnw spring-boot:run
   ```

### 3. Frontend Setup
1. Open a new terminal and navigate to the frontend folder:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the `frontend` folder and add your Gemini API Key and local backend URL:
   ```env
   VITE_GEMINI_API_KEY=your_gemini_api_key_here
   VITE_API_URL=http://localhost:8080
   ```
4. Start the Vite development server:
   ```bash
   npm run dev
   ```

## 🌐 Live Deployment
- **Frontend:** [https://gym-managment-beta.vercel.app](https://gym-managment-beta.vercel.app)
- **Backend:** Hosted on Render via Docker
- **Database:** Hosted on TiDB Cloud

## 🤝 Contributing
Contributions, issues, and feature requests are welcome! Feel free to check the [issues page](https://github.com/dhanu2204/gym_managment/issues).

## 📝 License
This project is open-source and available under the [MIT License](LICENSE).

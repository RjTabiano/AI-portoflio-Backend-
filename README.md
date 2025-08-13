# 🧠 AI Portfolio – Backend

## 📌 Overview
This is the **backend** for my AI-powered interactive portfolio.  
It handles AI conversation logic, integrates with the **Gemini-2.5-flash** model, and supports tool calling to fetch accurate, real-time project and personal data.

---

## ✨ Features
- **Express.js** server for handling API requests
- Integration with **Google's Gemini-2.5-flash** model
- **Tool calling** for accurate and dynamic responses
- API endpoints to interact with the AI
- Cross-Origin Resource Sharing (**CORS**) enabled for frontend communication

---

## 🧠 How It Works
1. The frontend sends user queries to the backend API.
2. The backend processes the message and uses **Gemini-2.5-flash** to generate a reply.
3. If a tool call is needed, the backend fetches data from the right source.
4. The backend returns a fully formatted AI response to the frontend.

---

## 🛠 Tech Stack
- **Node.js**
- **Express.js**
- **Axios** for API requests
- **Google Generative AI API (Gemini-2.5-flash)**

---

## 🚀 How to Run Locally

### **1️⃣ Clone the Repository (Develop Branch)**
```bash
git clone -b develop https://github.com/RjTabiano/AI-portoflio-Backend.git
cd AI-portoflio-Backend
```

### **2️⃣ Install Dependencies**
```bash
npm install
```

### **3️⃣ Create a .env File**
```env
PORT=5000
GEMINI_API_KEY=your_gemini_api_key_here
```

### **4️⃣ Start the Server**
```bash
npm run dev
```

#### The app will be running at: http://localhost:5173

## 📂 Related Repository
- **Frontend**: [AI-portfolio](https://github.com/RjTabiano/AI-portfolio/tree/main)
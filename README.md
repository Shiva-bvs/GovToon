# 🏛️ GovToon — Government Schemes, Told Simply

[![India.gov.in Grounded](https://img.shields.io/badge/Grounded%20Data-India.gov.in%20Portal-orange.svg)](https://www.india.gov.in/my-government/schemes)
[![AI Powered](https://img.shields.io/badge/AI%20Engine-Gemini%203.5%20Flash-blue.svg)](https://deepmind.google/technologies/gemini/)
[![Multilingual Speech](https://img.shields.io/badge/Audio-EN%20%7C%20TE%20%7C%20HI-green.svg)](#multilingual-audio-narration)
[![License: ISC](https://img.shields.io/badge/License-ISC-yellow.svg)](LICENSE)

> **"We don't change what the government says — we change how easily citizens understand it."**

**GovToon** is an AI-powered visual explainer platform that transforms complex Indian Government administrative documents, scheme guidelines, eligibility rules, and application procedures into simple, engaging **4-panel visual comic stories** with **multilingual voice narration (English, Telugu, Hindi)**, **visual eligibility checking**, and **comprehension testing**.

---

## 🌟 Key Features

1. **🛡️ Grounded on India.gov.in National Portal**:
   - Every scheme record, eligibility threshold, benefit amount, and required document is strictly grounded on authoritative data from **[Schemes | My Government | National Portal of India](https://www.india.gov.in/my-government/schemes)**.
   - Panel citations link directly back to verified source sections.

2. **🎨 4-Panel AI Visual Comics**:
   - Generates relatable 4-panel visual stories featuring persona characters (*Small Farmer Ramu Kaka, Street Vendor Kalu, Domestic Worker Lata Tai, Student Raju, Senior Citizen Sharma Ji*).

3. **🗣️ Multilingual Audio & Speech Synthesis Engine**:
   - Built-in Speech Synthesis TTS with **Natural Voice Engine** support for English (`en-IN`), Telugu (`te-IN`), and Hindi (`hi-IN`) with speed controls (0.8x, 1.0x, 1.25x).

4. **🟢 Visual Eligibility Checker**:
   - Citizens can input age, annual income, state, and occupation to get an instant visual traffic-light assessment (`🟢 Likely Eligible`, `🔴 Age Exceeded`, `🟡 Income Threshold Check`).

5. **📄 Interactive Documents Checklist & Roadmap**:
   - Track document preparation progress (*Aadhaar, Land Passbook, Income Certificate*) and view a step-by-step application roadmap.

6. **✅ Comprehension Test & Grounded AI Assistant**:
   - Take interactive quizzes to verify understanding with auto panel-jump help.
   - Grounded Q&A chatbot answers questions strictly from official records.

7. **🔍 Real-Time Live Portal Keyword Search**:
   - Search for any keyword (*e.g., "scholarship", "loan", "farmer", "health", "solar", "pension", "women"*) to instantly query, retrieve, and generate AI comics for matching government schemes.

---

## 📂 Project Architecture

```
GovToon/
├── 📄 index.html              # Main Web App UI (Entry point for Web & GitHub Pages)
├── 📄 styles.css              # Modern Responsive Design System & CSS Utility Tokens
├── 📄 app.js                  # Frontend Application Engine (TTS, AI Reader, Live Search)
├── 📄 README.md               # GitHub Project Documentation
├── 📄 package.json            # Node.js Project Dependencies & Scripts
├── 📄 package-lock.json       # Node.js Locked Dependency Tree
├── 📄 schemes_cache.json      # Offline Grounded Scheme Facts Cache
├── 📁 assets/                 # Visual Comic Illustrations & Images
│   ├── pm_kisan_1.jpg
│   ├── pm_kisan_2.jpg
│   ├── pm_kisan_3.jpg
│   └── pm_kisan_4.jpg
└── 📁 backend/                # Backend API Servers
    ├── server.py              # Flask Python AI Server (Gemini 3.5 Flash + Portal Search)
    ├── server.js              # Express Node.js Server
    └── requirements.txt       # Python Dependencies
```

---

## 🚀 Quick Start & Local Setup

### 1. Prerequisites
- **Node.js**: `v18+` or `v20+`
- **Python**: `v3.10+` or `v3.14+`

### 2. Installation
Clone the repository:
```bash
git clone https://github.com/Shiva-bvs/GovToon.git
cd GovToon
npm install
```

### 3. Running Backend AI Servers

**Option A: Express Node.js Server (Port 3000)**
```bash
npm start
```

**Option B: Python Flask AI Server (Port 5000)**
```bash
python backend/server.py
```

### 4. Running Web Client
Open `index.html` directly in any web browser or serve via:
```bash
python -m http.server 5173
```
Access the application at: `http://localhost:5173` or `http://localhost:3000`.

---

## ⚙️ Environment Variables (`.env`)

Create a `.env` file in the root directory:
```env
GEMINI_API_KEY=AIzaSy...
PORT=3000
PYTHON_PORT=5000
```

---

## 📜 License
This project is licensed under the ISC License. Data sources belong to the **National Portal of India (India.gov.in)**.

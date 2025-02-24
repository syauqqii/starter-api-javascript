# ⚙ Starter API JavaScript
Express.js starter template with a modular structure for easy scalability.

## 📂 Project Structure
```
/starter-api-javascript
│── database/
│ │── migrations/
│ │── seeders/
│ └── index.js
│── src/
│ │── controllers/
│ │── dtos/
│ │── routes/
│ │── middlewares/
│ │── models/
│ │── repositories/
│ │── utils/
│ │── app.js
│ └── server.js
│── test/
│── .env.example
│── .gitignore
│── CHANGELOG.md
│── LICENSE
│── package.json
└── README.md
```

## 🚀 Setup
### 1️⃣ Install dependencies
```sh
npm install
```

### 2️⃣ Set up environment variables
Copy `.env.example` to `.env`  
```sh
cp .env.example .env
```

### 3️⃣ Run the application
```sh
npm start
```
# 🔗 MERN URL Shortener (Industry-Ready)

A production-grade URL shortener built using MongoDB, Express.js, React, and Node.js.

---

# 🚀 Features
- Shorten long URLs
- Custom alias support
- Redirect to original URL
- Click tracking (analytics)
- Expiry links (optional)
- Authentication (JWT)
- Rate limiting (anti-spam)
- QR Code generation (bonus)

---

# 🧠 System Design Overview

### Flow:
1. User submits long URL
2. Backend generates short code
3. Store in MongoDB
4. Return short URL
5. On visit → redirect + track analytics

---

# 🏗️ Tech Stack

### Frontend:
- React (Vite)
- Tailwind CSS
- Axios

### Backend:
- Node.js
- Express.js

### Database:
- MongoDB (Mongoose)

### DevOps (Optional but Industry):
- Docker
- Nginx
- AWS / Vercel / Railway

---

# 📁 Folder Structure

```
url-shortener/
│
├── client/ (React)
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/api.js
│   │   └── App.jsx
│
├── server/ (Node)
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── utils/
│   └── server.js
│
└── README.md
```

---

# 🔧 Backend Implementation

## 1. Install Dependencies

```
npm init -y
npm install express mongoose dotenv nanoid cors morgan jsonwebtoken bcryptjs
```

---

## 2. URL Model

```js
import mongoose from "mongoose";

const urlSchema = new mongoose.Schema({
  originalUrl: { type: String, required: true },
  shortCode: { type: String, unique: true },
  clicks: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
  expiresAt: { type: Date }
});

export default mongoose.model("Url", urlSchema);
```

---

## 3. Controller

```js
import Url from "../models/url.js";
import { nanoid } from "nanoid";

export const shortenUrl = async (req, res) => {
  const { originalUrl } = req.body;

  const shortCode = nanoid(6);

  const newUrl = await Url.create({ originalUrl, shortCode });

  res.json({ shortUrl: `${process.env.BASE_URL}/${shortCode}` });
};

export const redirectUrl = async (req, res) => {
  const { code } = req.params;

  const url = await Url.findOne({ shortCode: code });

  if (!url) return res.status(404).json({ message: "Not found" });

  url.clicks++;
  await url.save();

  res.redirect(url.originalUrl);
};
```

---

## 4. Routes

```js
import express from "express";
import { shortenUrl, redirectUrl } from "../controllers/urlController.js";

const router = express.Router();

router.post("/shorten", shortenUrl);
router.get("/:code", redirectUrl);

export default router;
```

---

## 5. Server Setup

```js
import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

import urlRoutes from "./routes/urlRoutes.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api", urlRoutes);

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("DB Connected"));

app.listen(5000, () => console.log("Server running"));
```

---

# 🎨 Frontend Implementation

## 1. Create React App (Vite)

```
npm create vite@latest client
cd client
npm install axios
```

---

## 2. API Service

```js
import axios from "axios";

export const shorten = (url) => {
  return axios.post("http://localhost:3000/api/shorten", { originalUrl: url });
};
```

---

## 3. UI Component

```jsx
import { useState } from "react";
import { shorten } from "./services/api";

export default function App() {
  const [url, setUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");

  const handleSubmit = async () => {
    const res = await shorten(url);
    setShortUrl(res.data.shortUrl);
  };

  return (
    <div>
      <input value={url} onChange={(e) => setUrl(e.target.value)} />
      <button onClick={handleSubmit}>Shorten</button>
      {shortUrl && <p>{shortUrl}</p>}
    </div>
  );
}
```

---

# 🔐 Advanced (Industry Level)

## Add these to stand out:

### ✅ Authentication
- JWT login/signup
- User-specific URLs

### ✅ Rate Limiting
```
npm install express-rate-limit
```

### ✅ Caching
- Redis for fast redirects

### ✅ Analytics
- Store IP, device, location

### ✅ Custom Domain
- short.ly/abc

### ✅ QR Code
```
npm install qrcode
```

---

# 🌍 Deployment

### Backend:
- Railway / Render

### Frontend:
- Vercel / Netlify

### Database:
- MongoDB Atlas

---

# 🧪 Testing
- Postman
- Jest (unit testing)

---

# 📈 Scaling Strategy

- Use Redis cache
- Horizontal scaling (load balancer)
- Use CDN for redirects

---

# 🧾 README.md (Copy This)

## Project Name: Shortify

### Description:
A scalable URL shortener built with MERN stack.

### Features:
- URL shortening
- Analytics
- Authentication

### Setup:
```
git clone <repo>
cd server && npm install
cd client && npm install
```

### Run:
```
cd server
npm run dev

cd client
npm run dev
```

---

# 💡 Pro Tips
- Use clean code structure
- Add loading + error states
- Make UI modern (Tailwind)
- Add copy-to-clipboard button
- Use environment variables properly

---

# 🎯 Final Advice

If you want this to feel "industry-level":
- Add authentication
- Add analytics dashboard
- Deploy it
- Put it in your portfolio

---

If you want next level 🔥
I can:
- Design full UI (like Bitly)
- Give you production folder structure
- Add Redis + Docker setup
- Build dashboard UI in React


# 🍽️ Food Reel – Short Video Based Food Discovery App

Food Reel is a modern short-video based platform where users can explore food content in a reels-style interface.  
It supports seamless video playback, smooth scrolling, authentication, media optimization using ImageKit, and a clean UI inspired by real social media apps.

---

## 🚀 Features

### 🎥 Reels System
- Smooth vertical reels feed (9:16 layout)
- Auto-play and auto-pause using Intersection Observer
- Instagram-like action buttons (Like, Save, Comment)
- Description + CTA “Visit Store”
- Responsive and mobile-first UI

### 🔐 Authentication
- JWT-based authentication
- Token stored securely in **HTTP-only cookies**
- Protected routes to prevent unauthorized access
- Auto-redirect to login on 401

### 🗄️ Saved Items
- User can save reels
- Dedicated **Saved page** with grid layout

---

## 🌐 ImageKit Integration (CDN + Optimization)

Food Reel uses **ImageKit.io** to optimize and deliver videos/images efficiently.

### ✔ Why ImageKit?
- Global CDN delivery (super-fast loading)
- Automatic compression & quality optimization
- Real-time transformation via URL parameters
- Highly reliable for video thumbnails and media links

### ✔ How It's Used
- All media uploads are stored on ImageKit
- Reels load using ImageKit-optimized URLs
- Videos/images automatically adapt to device resolution

Example:
```js
<video src={`https://ik.imagekit.io/your_path/${item.video}`}></video>
```

🛠️ Tech Stack
🧩 Frontend

React.js

React Router DOM

Axios (withCredentials enabled)

Custom CSS (Instagram-like UI)

⚙️ Backend

Node.js + Express

MongoDB + Mongoose

JWT Authentication with secure cookies

CORS configuration for cross-site cookies

ImageKit for optimized media streaming

🌐 Deployment

Frontend → Vercel

Backend → Render

Media → ImageKit CDN

📦 Project Structure
```bash
Food-Reel/
│── src/
│   ├── controllers/
│   ├── middlewares/
│   ├── models/
│   ├── routes/
│   ├── db/
│   ├── services/
│   └── app.js
│── frontend/
│── public/
│── server.js
│── vercel.json
│── package.json
│── README.md
```
🔧 Setup Instructions
```bash
git clone https://github.com/Mayank-Pandey-Ji/Food-Reel.git
cd Food-Reel
```
Install backend dependencies
```bash
npm install
```
3️⃣ Create .env file
```bash
PORT=5000
MONGO_URI=your_mongo_connection_string
JWT_SECRET=your_secret
NODE_ENV=development

IMAGEKIT_PUBLIC_KEY=your_key
IMAGEKIT_PRIVATE_KEY=your_key
IMAGEKIT_URL_ENDPOINT=https://ik.imagekit.io/your_id
```
4️⃣ Install frontend dependencies
```bash
cd frontend
npm install
```
5️⃣ Start servers
backend:
```bash
npm start
```
frontend
```bash
npm run dev
```
🔐 Authentication Flow

User logs in

Server sets httpOnly + secure cookie

Protected routes validate cookie token

If invalid → server returns 401: Please login first

Frontend auto-redirects to login

Pull requests are welcome.
Open an issue for feature suggestions or improvements.

📜 License

This project is licensed under the MIT License.

👨‍💻 Author

Mayank Pandey
GitHub: @Mayank-Pandey-Ji

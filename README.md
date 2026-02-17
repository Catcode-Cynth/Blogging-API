# Blogging API

A RESTful blogging API built with **Node.js**, **Express**, and **MongoDB**.  
It supports user authentication, blog creation, publishing, and filtering features.  
Tests are written with **Jest** and use an in-memory MongoDB server.

---

## 🚀 Features
- User authentication (signup/signin with JWT)
- Secure password hashing with bcrypt
- Blog creation, editing, publishing, and deletion
- Draft and published states
- Pagination, filtering, and search
- Jest test suite with in-memory MongoDB

---

## 📦 Installation

Clone the repository and install dependencies:

```bash
git clone https://github.com/Catcode-Cynth/Blogging-API.git
cd Blogging-API
npm install

 Environment Variables

Create a .env file in the project root with the following:

Code
PORT=5000
MONGO_URI=<your MongoDB Atlas connection string>
JWT_SECRET=<your secret key>

Running Locally
Start the server:

bash
npm start
The API will be available at:

Code
http://localhost:5001

Testing
Run the test suite:

bash
npm test


Database Setup (MongoDB Atlas)
Go to MongoDB Atlas.

Create a free cluster.

Add a database user with username and password.

Whitelist your IP or allow access from anywhere.

Copy the connection string (looks like mongodb+srv://<username>:<password>@cluster0.mongodb.net/blogging-api).

Paste it into your .env file as MONGO_URI.

API Endpoints

Auth Routes
POST /api/v1/auth/signup → Register a new user
Request:

json
{
  "first_name": "Test",
  "last_name": "User",
  "email": "testuser@example.com",
  "password": "Password123"
}
Response:

json
{
  "msg": "User registered successfully"

 
  Deployment on Render
Push your repo to GitHub.

Go to Render → create a new Web Service.

Connect your GitHub repo.

Set:

Build Command: npm install

Start Command: npm start

Add environment variables (MONGO_URI, JWT_SECRET, PORT) in Render’s dashboard.

Deploy — Render will give you a live URL like:

Code
https://blogging-api.onrender.com

License
This project is licensed under the MIT License.

👩‍💻 Author
Cynthia (Catcode-Cynth)  
Built with ❤️ using Node.js, Express, and MongoDB.
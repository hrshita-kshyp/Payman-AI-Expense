# **AI Budget Tracker - Backend**  

## **Project Overview**  
AI Budget Tracker is a backend API for managing expenses using **Node.js, Express, and MongoDB**.  
It provides endpoints for adding, updating, retrieving, and deleting expenses.  

---

## **Technologies Used**  
- **Node.js** - Backend runtime  
- **Express.js** - Web framework  
- **MongoDB** - NoSQL database  
- **Mongoose** - ODM for MongoDB  
- **dotenv** - Environment variable management  
- **Postman** - API testing  

---

## **Installation and Setup**  

### **1. Clone the Repository**  
```sh
git clone <repo-link>
cd ai-budget-tracker
```
2. Install Dependencies
sh
Copy
Edit
npm install
3. Set Up Environment Variables
Create a .env file in the root folder and add the following:
```sh
ini
Copy
Edit
PORT=5000
MONGO_URI=<Your MongoDB Connection String>
```
4. Start the Server
```sh
Copy
Edit
npm start
The server will start running at http://localhost:5000 🚀
```
Project Structure
```sh
bash
Copy
Edit
ai-budget-tracker/
│── config/
│   └── db.js              # MongoDB connection
│── models/
│   └── expense.js         # Expense Schema
│── routes/
│   └── expenseRoutes.js   # Expense API Routes
│── server.js              # Main server file
│── .env                   # Environment variables
│── package.json           # Project dependencies
│── README.md              # Documentation
```
API Endpoints
```sh
Method	Endpoint	Description
POST	/api/expenses/add	Add a new expense
GET	/api/expenses	Get all expenses
PUT	/api/expenses/:id	Update an expense
DELETE	/api/expenses/:id	Delete an expense
Testing with Postman
Open Postman
```
Use POST, GET, PUT, DELETE requests to the above endpoints

Ensure the request body is formatted correctly for POST and PUT

✅ All API tests have passed successfully

Upcoming Features
Frontend Integration (In Progress)

Authentication System (User login/signup)

AI-Based Expense Insights

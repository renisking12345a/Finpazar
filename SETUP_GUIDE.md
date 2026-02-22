# FinPazar - Loan Marketplace Platform

Welcome to FinPazar! This comprehensive guide will help you set up and run the complete loan marketplace platform.

## 📋 Table of Contents

1. [Project Overview](#project-overview)
2. [Technology Stack](#technology-stack)
3. [Prerequisites](#prerequisites)
4. [Installation Steps](#installation-steps)
5. [Running the Application](#running-the-application)
6. [Database Setup](#database-setup)
7. [Features Overview](#features-overview)
8. [API Documentation](#api-documentation)
9. [Troubleshooting](#troubleshooting)

## 🎯 Project Overview

FinPazar is a complete loan marketplace platform designed for Macedonia that enables:

- **Customers** to browse, compare, and apply for loans
- **Administrators** to manage loans and schedule customer meetings
- **Transparent loan information** with clear terms and conditions
- **Professional meeting scheduling** workflow

## 🛠️ Technology Stack

### Frontend
- React 18 with Hooks
- React Router v6 for navigation
- Axios for HTTP requests
- CSS3 with responsive design
- React Context for state management

### Backend
- Node.js with Express.js
- MongoDB with Mongoose
- JWT authentication
- bcryptjs for password security
- CORS enabled

### Database
- MongoDB (local or cloud)
- Mongoose schema validation

## 📦 Prerequisites

Before starting, ensure you have:

- **Node.js** installed (v14 or higher)
  - Download from: https://nodejs.org/
  - Verify: `node --version` and `npm --version`

- **MongoDB** installed locally or MongoDB Atlas account
  - Local: https://docs.mongodb.com/manual/installation/
  - Cloud: https://www.mongodb.com/cloud/atlas (free tier available)

- **Git** (optional, for version control)

- **A code editor** (VS Code, WebStorm, etc.)

## 🚀 Installation Steps

### Step 1: Clone or Extract the Project

```bash
# If you have git
git clone <repository-url>

# Navigate to the project
cd Finpazar
```

### Step 2: Backend Setup

```bash
# Navigate to backend folder
cd backend

# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Edit .env with your settings
# MONGODB_URI=mongodb://localhost:27017/finpazar
# JWT_SECRET=your_secret_key_here
# PORT=5000
```

**Install MongoDB Locally (if not using Atlas):**
```bash
# macOS
brew install mongodb-community
brew services start mongodb-community

# Ubuntu/Linux
sudo apt-get install -y mongodb

# Windows
# Download installer from https://www.mongodb.com/try/download/community
```

### Step 3: Seed Initial Data

```bash
# From backend folder
npm run seed
# This will populate the database with 8 sample loans
```

### Step 4: Start Backend Server

```bash
# From backend folder, terminal 1
npm run dev
# Server will run on http://localhost:5000
```

### Step 5: Frontend Setup

```bash
# From project root, terminal 2
cd frontend

# Install dependencies
npm install

# Start development server
npm start
# Frontend will open at http://localhost:3000
```

## ▶️ Running the Application

After installation, to start the application:

**Terminal 1 (Backend):**
```bash
cd backend
npm run dev
```

**Terminal 2 (Frontend):**
```bash
cd frontend
npm start
```

The application will be available at:
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000

## 🗄️ Database Setup

### MongoDB Local Setup

1. **Start MongoDB service:**
   ```bash
   # macOS
   brew services start mongodb-community
   
   # Linux
   sudo systemctl start mongod
   
   # Windows
   net start MongoDB
   ```

2. **Create database (automatic):**
   - Mongoose will automatically create the `finpazar` database
   - Collections are created when first document is inserted

3. **Seed data:**
   ```bash
   npm run seed
   ```

### MongoDB Atlas (Cloud)

1. Create account at https://www.mongodb.com/cloud/atlas
2. Create a free cluster
3. Get connection string (looks like: `mongodb+srv://user:pass@cluster.mongodb.net/finpazar`)
4. Update `MONGODB_URI` in `.env` file

## ✨ Features Overview

### Customer Features

1. **Browse Loans**
   - View all available loans
   - Filter by city/region
   - See loan details (amount, duration, interest)

2. **Apply for Loan**
   - Fill application form
   - Select loan amount and duration
   - Submit personal information

3. **Track Applications**
   - View application status
   - See scheduled meetings
   - Receive updates on approvals

### Admin Features

1. **Dashboard**
   - View all loan requests
   - Filter by status (pending, scheduled, approved, rejected)
   - See statistics

2. **Request Management**
   - View detailed customer information
   - Review loan applications
   - Make approval decisions

3. **Meeting Scheduling**
   - Schedule meetings with customers
   - Set date and time
   - Add notes and comments

## 📚 API Documentation

### Authentication Endpoints

```http
POST /api/auth/register
Content-Type: application/json

{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john@example.com",
  "phone": "+38970123456",
  "password": "password123",
  "role": "customer"
}

POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

### Loans Endpoints

```http
GET /api/loans
GET /api/loans?city=Skopje

GET /api/loans/:id

POST /api/loans (Admin only)
Content-Type: application/json
Authorization: Bearer <token>

{
  "loanName": "Personal Loan",
  "description": "Quick personal loan",
  "minAmount": 1000,
  "maxAmount": 10000,
  "interestRate": 8.5,
  "minDuration": 6,
  "maxDuration": 36,
  "repaymentFrequency": "monthly",
  "city": "Skopje"
}
```

### Loan Requests Endpoints

```http
POST /api/requests
Content-Type: application/json

{
  "loanId": "loan_id",
  "requestedAmount": 5000,
  "requestedDuration": 12,
  "firstName": "John",
  "lastName": "Doe",
  "email": "john@example.com",
  "phone": "+38970123456",
  "city": "Skopje",
  "income": 2000
}

GET /api/requests (Admin only)
Authorization: Bearer <token>

PUT /api/requests/:id/schedule (Admin only)
Authorization: Bearer <token>
Content-Type: application/json

{
  "scheduledDate": "2024-03-15",
  "scheduledTime": "14:00",
  "notes": "Meeting confirmed"
}

PUT /api/requests/:id/status (Admin only)
Authorization: Bearer <token>
Content-Type: application/json

{
  "status": "approved",
  "notes": "Application approved"
}
```

## 🔐 Test Accounts

After creating accounts, you can use:

**Customer Account:**
- Email: customer@finpazar.mk
- Password: password123

**Admin Account:**
- Email: admin@finpazar.mk
- Password: admin123

## 🐛 Troubleshooting

### Issue: MongoDB Connection Error

**Solution:**
```bash
# Check if MongoDB is running
# macOS
brew services list

# Linux
sudo systemctl status mongod

# Verify connection string in .env
# Should be: mongodb://localhost:27017/finpazar
```

### Issue: Port Already in Use

**Solution:**
```bash
# Change PORT in backend/.env
PORT=5001

# Or kill process using the port
# macOS/Linux
lsof -ti:5000 | xargs kill -9

# Windows
netstat -ano | findstr :5000
taskkill /PID <PID> /F
```

### Issue: npm install fails

**Solution:**
```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules
rm -rf node_modules package-lock.json

# Reinstall
npm install
```

### Issue: CORS Errors

**Solution:**
- Ensure backend is running on port 5000
- Ensure frontend is running on port 3000
- Check that axios default URL is correct

### Issue: JWT Token not working

**Solution:**
- Ensure JWT_SECRET is set in .env
- Make sure token is sent with proper format:
  ```
  Authorization: Bearer <token>
  ```
- Check if token has expired

## 📝 Environment Variables

### Backend (.env)

```properties
# Database
MONGODB_URI=mongodb://localhost:27017/finpazar

# JWT
JWT_SECRET=your_very_secret_key_change_this

# Server
PORT=5000
NODE_ENV=development

# Email (optional)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_app_password
```

## 🎓 Learning Resources

### MongoDB
- https://docs.mongodb.com/manual/
- https://www.mongodb.com/docs/drivers/node/

### Express.js
- https://expressjs.com/
- https://expressjs.com/en/api.html

### React
- https://react.dev
- https://react-router.org/

### JWT
- https://jwt.io/
- https://www.npmjs.com/package/jsonwebtoken

## 📞 Support

If you encounter issues:

1. Check the troubleshooting section
2. Review error messages in terminal
3. Check browser console for frontend errors
4. Verify all environment variables
5. Ensure MongoDB is running

## 📄 Next Steps

After installation:

1. Create test accounts
2. Add some loans via admin panel
3. Test the full customer workflow
4. Explore admin features
5. Customize styling and branding

## 🚀 Deployment

For production deployment:

1. Use environment-specific .env files
2. Set secure JWT_SECRET
3. Use MongoDB Atlas or managed database
4. Configure CORS for your domain
5. Use HTTPS
6. Set NODE_ENV=production

## 📞 Need Help?

- Check the API documentation
- Review code comments
- Check console for error messages
- Verify all services are running

---

**Happy coding with FinPazar!** 🇲🇰

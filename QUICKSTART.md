# Quick Start Guide

Get FinPazar running in 5 minutes!

## Prerequisites
- Node.js installed
- MongoDB installed or MongoDB Atlas account

## Setup in 3 Steps

### 1. Backend (Terminal 1)
```bash
cd backend
npm install
cp .env.example .env
npm run seed
npm run dev
```

### 2. Frontend (Terminal 2)
```bash
cd frontend
npm install
npm start
```

### 3. Open Browser
- Frontend: http://localhost:3000
- API: http://localhost:5000

## Done! 🎉

You now have:
- ✅ Customer loan browsing
- ✅ Loan request submission
- ✅ Admin dashboard
- ✅ Meeting scheduling
- ✅ Authentication system
- ✅ Sample loans in database

## Test It Out

1. Go to http://localhost:3000
2. Register as customer
3. Browse available loans
4. Apply for a loan
5. (In another browser/incognito) Register as admin
6. Go to Admin Dashboard
7. Schedule a meeting with the customer
8. Check your requests as customer to see scheduled meeting

## Key Files

- Backend: `/backend/server.js` - Main server
- Frontend: `/frontend/src/App.js` - Main app
- Database: MongoDB (auto-created)
- API: `/backend/routes/` - All endpoints

## Commands Reference

```bash
# Backend
cd backend
npm run dev         # Start with auto-reload
npm run seed        # Populate sample loans
npm start           # Production start

# Frontend
cd frontend
npm start           # Development server
npm run build       # Production build
npm test            # Run tests

# Database
mongo               # Connect to local MongoDB
```

## Features at a Glance

### Customer
- 📋 Browse loans by city
- 📝 Apply for loans
- 📊 Track applications
- 📅 View scheduled meetings

### Admin
- 📊 Dashboard overview
- 👥 View applications
- 📅 Schedule meetings
- ✅ Approve/reject loans

## Troubleshooting

**Port 5000/3000 in use?**
```bash
# Kill the process
lsof -ti:5000,3000 | xargs kill -9
```

**MongoDB won't connect?**
```bash
# Start MongoDB
# macOS: brew services start mongodb-community
# Linux: sudo systemctl start mongod
# Windows: net start MongoDB
```

**npm install fails?**
```bash
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```

---

For detailed setup, see [SETUP_GUIDE.md](./SETUP_GUIDE.md)

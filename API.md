# FinPazar API Documentation

Complete API reference for the FinPazar loan marketplace platform.

## Base URL
- Development: `http://localhost:5000`
- Production: `https://api.finpazar.mk` (example)

## Authentication

Most endpoints require JWT authentication. Include the token in the Authorization header:

```
Authorization: Bearer <your_jwt_token>
```

## Response Format

All responses are in JSON format:

**Success Response:**
```json
{
  "message": "Operation successful",
  "data": { /* response data */ }
}
```

**Error Response:**
```json
{
  "error": "Error message describing what went wrong"
}
```

---

## Authentication Endpoints

### Register User

Create a new customer or admin account.

- **URL:** `/api/auth/register`
- **Method:** `POST`
- **Auth required:** No

**Request Body:**
```json
{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john.doe@example.com",
  "phone": "+38970666666",
  "password": "SecurePassword123",
  "role": "customer"  // or "admin"
}
```

**Success Response (201):**
```json
{
  "message": "User registered successfully",
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "firstName": "John",
    "lastName": "Doe",
    "email": "john.doe@example.com",
    "role": "customer"
  }
}
```

**Error Response (400):**
```json
{
  "error": "Email already exists"
}
```

---

### Login User

Authenticate and receive JWT token.

- **URL:** `/api/auth/login`
- **Method:** `POST`
- **Auth required:** No

**Request Body:**
```json
{
  "email": "john.doe@example.com",
  "password": "SecurePassword123"
}
```

**Success Response (200):**
```json
{
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "firstName": "John",
    "lastName": "Doe",
    "email": "john.doe@example.com",
    "role": "customer"
  }
}
```

**Error Response (401):**
```json
{
  "error": "Invalid email or password"
}
```

---

## Loans Endpoints

### Get All Loans

Retrieve all active loans with optional filtering.

- **URL:** `/api/loans`
- **Method:** `GET`
- **Auth required:** No

**Query Parameters:**
- `city` (optional): Filter by city (e.g., `?city=Skopje`)
- `region` (optional): Filter by region

**Success Response (200):**
```json
[
  {
    "_id": "507f1f77bcf86cd799439011",
    "loanName": "Personal Quick Loan",
    "description": "Fast approval personal loan",
    "minAmount": 1000,
    "maxAmount": 10000,
    "interestRate": 8.5,
    "minDuration": 6,
    "maxDuration": 36,
    "repaymentFrequency": "monthly",
    "city": "Skopje",
    "region": "Skopje",
    "isActive": true,
    "createdAt": "2024-01-15T10:30:00Z"
  },
  // ... more loans
]
```

---

### Get Single Loan

Get detailed information about a specific loan.

- **URL:** `/api/loans/:id`
- **Method:** `GET`
- **Auth required:** No

**URL Parameters:**
- `id` (required): Loan ID

**Success Response (200):**
```json
{
  "_id": "507f1f77bcf86cd799439011",
  "loanName": "Personal Quick Loan",
  "description": "Fast approval personal loan",
  "minAmount": 1000,
  "maxAmount": 10000,
  "interestRate": 8.5,
  "minDuration": 6,
  "maxDuration": 36,
  "repaymentFrequency": "monthly",
  "city": "Skopje",
  "region": "Skopje",
  "isActive": true,
  "createdAt": "2024-01-15T10:30:00Z"
}
```

**Error Response (404):**
```json
{
  "error": "Loan not found"
}
```

---

### Create Loan (Admin Only)

Add a new loan product.

- **URL:** `/api/loans`
- **Method:** `POST`
- **Auth required:** Yes (Admin only)

**Request Body:**
```json
{
  "loanName": "Home Improvement Loan",
  "description": "Loan for home renovation and repairs",
  "minAmount": 5000,
  "maxAmount": 50000,
  "interestRate": 5.5,
  "minDuration": 12,
  "maxDuration": 120,
  "repaymentFrequency": "monthly",
  "city": "Skopje",
  "region": "Skopje"
}
```

**Success Response (201):**
```json
{
  "_id": "507f1f77bcf86cd799439012",
  "loanName": "Home Improvement Loan",
  // ... rest of loan data
}
```

**Error Response (403):**
```json
{
  "error": "Admin access required"
}
```

---

### Update Loan (Admin Only)

Modify an existing loan.

- **URL:** `/api/loans/:id`
- **Method:** `PUT`
- **Auth required:** Yes (Admin only)

**URL Parameters:**
- `id` (required): Loan ID

**Request Body:** (Send only fields to update)
```json
{
  "interestRate": 5.2,
  "maxAmount": 60000
}
```

**Success Response (200):**
```json
{
  "_id": "507f1f77bcf86cd799439011",
  // ... updated loan data
}
```

---

### Delete Loan (Admin Only)

Remove a loan product.

- **URL:** `/api/loans/:id`
- **Method:** `DELETE`
- **Auth required:** Yes (Admin only)

**Success Response (200):**
```json
{
  "message": "Loan deleted successfully"
}
```

---

## Loan Requests Endpoints

### Submit Loan Request

Create a new loan request application.

- **URL:** `/api/requests`
- **Method:** `POST`
- **Auth required:** No

**Request Body:**
```json
{
  "loanId": "507f1f77bcf86cd799439011",
  "requestedAmount": 7500,
  "requestedDuration": 24,
  "firstName": "John",
  "lastName": "Doe",
  "email": "john@example.com",
  "phone": "+38970666666",
  "city": "Skopje",
  "address": "Main Street 123",
  "income": 1500
}
```

**Validation Rules:**
- `requestedAmount` must be between loan's min and max
- `requestedDuration` must be between loan's min and max duration
- All contact fields are required
- `income` is optional

**Success Response (201):**
```json
{
  "message": "Loan request submitted successfully",
  "request": {
    "_id": "507f1f77bcf86cd799439020",
    "loanId": "507f1f77bcf86cd799439011",
    "customerId": null,
    "requestedAmount": 7500,
    "requestedDuration": 24,
    "firstName": "John",
    "lastName": "Doe",
    "email": "john@example.com",
    "phone": "+38970666666",
    "city": "Skopje",
    "status": "pending",
    "createdAt": "2024-01-15T14:20:00Z"
  }
}
```

**Error Response (400):**
```json
{
  "error": "Amount must be between 1000 and 10000"
}
```

---

### Get All Requests (Admin Only)

Retrieve all loan requests.

- **URL:** `/api/requests`
- **Method:** `GET`
- **Auth required:** Yes (Admin only)

**Success Response (200):**
```json
[
  {
    "_id": "507f1f77bcf86cd799439020",
    "loanId": {
      "_id": "507f1f77bcf86cd799439011",
      "loanName": "Personal Quick Loan"
    },
    "customerId": {
      "_id": "507f1f77bcf86cd799439019",
      "firstName": "John",
      "lastName": "Doe",
      "email": "john@example.com"
    },
    "requestedAmount": 7500,
    "requestedDuration": 24,
    "firstName": "John",
    "lastName": "Doe",
    "email": "john@example.com",
    "phone": "+38970666666",
    "city": "Skopje",
    "status": "pending",
    "createdAt": "2024-01-15T14:20:00Z"
  }
  // ... more requests
]
```

---

### Get Request Details

View a specific loan request.

- **URL:** `/api/requests/:id`
- **Method:** `GET`
- **Auth required:** Yes

**URL Parameters:**
- `id` (required): Request ID

**Success Response (200):**
```json
{
  "_id": "507f1f77bcf86cd799439020",
  "loanId": { /* loan details */ },
  "customerId": { /* user details */ },
  "requestedAmount": 7500,
  "requestedDuration": 24,
  "firstName": "John",
  "lastName": "Doe",
  "email": "john@example.com",
  "phone": "+38970666666",
  "city": "Skopje",
  "status": "pending",
  "createdAt": "2024-01-15T14:20:00Z"
}
```

---

### Schedule Meeting (Admin Only)

Schedule a meeting with the customer.

- **URL:** `/api/requests/:id/schedule`
- **Method:** `PUT`
- **Auth required:** Yes (Admin only)

**URL Parameters:**
- `id` (required): Request ID

**Request Body:**
```json
{
  "scheduledDate": "2024-02-15",
  "scheduledTime": "14:30",
  "notes": "Meeting confirmed. Please bring ID and proof of income."
}
```

**Success Response (200):**
```json
{
  "message": "Meeting scheduled successfully",
  "request": {
    "_id": "507f1f77bcf86cd799439020",
    "status": "scheduled",
    "scheduledDate": "2024-02-15T00:00:00Z",
    "scheduledTime": "14:30",
    "notes": "Meeting confirmed. Please bring ID and proof of income.",
    "updatedAt": "2024-01-15T15:00:00Z"
  }
}
```

---

### Update Request Status (Admin Only)

Approve or reject a loan request.

- **URL:** `/api/requests/:id/status`
- **Method:** `PUT`
- **Auth required:** Yes (Admin only)

**URL Parameters:**
- `id` (required): Request ID

**Request Body:**
```json
{
  "status": "approved",
  "notes": "Application approved. You will receive loan details via email."
}
```

**Status Values:**
- `pending` - Initial status
- `scheduled` - Meeting scheduled
- `approved` - Application approved
- `rejected` - Application rejected

**Success Response (200):**
```json
{
  "message": "Request status updated",
  "request": {
    "_id": "507f1f77bcf86cd799439020",
    "status": "approved",
    "notes": "Application approved. You will receive loan details via email.",
    "updatedAt": "2024-01-15T15:05:00Z"
  }
}
```

---

## Error Codes

| Code | Meaning |
|------|---------|
| 200 | Success |
| 201 | Created |
| 400 | Bad Request |
| 401 | Unauthorized |
| 403 | Forbidden (insufficient permissions) |
| 404 | Not Found |
| 500 | Server Error |

---

## Rate Limiting

Currently no rate limiting is implemented. For production, consider:
- Implement rate limiting per IP
- Limit requests per authenticated user
- Use express-rate-limit middleware

---

## CORS Headers

The API includes CORS headers to allow requests from:
- http://localhost:3000 (development)
- Your production domain (configure in production)

---

## Example Usage

### Using cURL

```bash
# Register
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "John",
    "lastName": "Doe",
    "email": "john@example.com",
    "phone": "+38970666666",
    "password": "password123"
  }'

# Get loans
curl http://localhost:5000/api/loans

# Get loans in Skopje
curl "http://localhost:5000/api/loans?city=Skopje"

# Submit loan request
curl -X POST http://localhost:5000/api/requests \
  -H "Content-Type: application/json" \
  -d '{
    "loanId": "507f1f77bcf86cd799439011",
    "requestedAmount": 7500,
    "requestedDuration": 24,
    "firstName": "John",
    "lastName": "Doe",
    "email": "john@example.com",
    "phone": "+38970666666",
    "city": "Skopje"
  }'

# Schedule meeting (requires admin token)
curl -X PUT http://localhost:5000/api/requests/507f1f77bcf86cd799439020/schedule \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{
    "scheduledDate": "2024-02-15",
    "scheduledTime": "14:30",
    "notes": "Meeting confirmed"
  }'
```

### Using JavaScript/Axios

```javascript
import axios from 'axios';

// Create instance with base URL
const api = axios.create({
  baseURL: 'http://localhost:5000/api'
});

// Add token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Example requests
async function getLoans() {
  const response = await api.get('/loans');
  return response.data;
}

async function submitLoanRequest(data) {
  const response = await api.post('/requests', data);
  return response.data;
}

async function scheduleMessage(requestId, data) {
  const response = await api.put(`/requests/${requestId}/schedule`, data);
  return response.data;
}
```

---

## Changelog

### Version 1.0.0
- Initial release
- Authentication (register, login)
- Loan browsing and filtering
- Loan request submission
- Admin dashboard
- Meeting scheduling
- Status management

---

For more information, see the main [README.md](./README.md) and [SETUP_GUIDE.md](./SETUP_GUIDE.md).

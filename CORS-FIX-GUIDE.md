# CORS Fix Guide

## Problem
Your backend at `http://128.199.70.237` is working with curl but not from the browser. This is a **CORS (Cross-Origin Resource Sharing)** issue.

## Why This Happens
- **curl** doesn't enforce CORS policies
- **Browsers** enforce CORS for security - they block requests from one origin to another unless explicitly allowed
- Your frontend (e.g., `http://localhost:3000`) is trying to access `http://128.199.70.237`, which is a different origin

## How to Fix

### 1. Test if it's CORS
Open `test-cors.html` in your browser to see the exact CORS error.

### 2. Configure CORS on Your Backend

The backend needs to send these headers in responses:
```
Access-Control-Allow-Origin: http://localhost:3000  (or your frontend URL)
Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS
Access-Control-Allow-Headers: Content-Type, Authorization
Access-Control-Allow-Credentials: true
```

### For Express.js / Node.js Backend:

```javascript
const cors = require('cors');

app.use(cors({
  origin: [
    'http://localhost:3000',
    'http://localhost:3001',
    // Add your production frontend URL here
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
```

### For Flask (Python) Backend:

```python
from flask_cors import CORS

app = Flask(__name__)
CORS(app, resources={
    r"/api/*": {
        "origins": ["http://localhost:3000", "http://localhost:3001"],
        "methods": ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
        "allow_headers": ["Content-Type", "Authorization"],
        "supports_credentials": True
    }
})
```

### For Django Backend:

Install django-cors-headers:
```bash
pip install django-cors-headers
```

In `settings.py`:
```python
INSTALLED_APPS = [
    ...
    'corsheaders',
    ...
]

MIDDLEWARE = [
    ...
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.common.CommonMiddleware',
    ...
]

CORS_ALLOWED_ORIGINS = [
    "http://localhost:3000",
    "http://localhost:3001",
]

CORS_ALLOW_CREDENTIALS = True
CORS_ALLOW_METHODS = [
    'DELETE',
    'GET',
    'OPTIONS',
    'PATCH',
    'POST',
    'PUT',
]

CORS_ALLOW_HEADERS = [
    'accept',
    'accept-encoding',
    'authorization',
    'content-type',
    'dnt',
    'origin',
    'user-agent',
    'x-csrftoken',
    'x-requested-with',
]
```

### For Development (Quick Fix - Allow All Origins):

**⚠️ WARNING: Only use this for development!**

```javascript
// Express.js
app.use(cors({
  origin: '*',  // Allows all origins - NOT for production!
  credentials: true
}));
```

```python
# Flask
CORS(app, resources={r"/api/*": {"origins": "*"}})
```

### 3. Handle OPTIONS Preflight Requests

Make sure your backend handles OPTIONS requests (preflight):

```javascript
// Express.js
app.options('*', cors()); // Enable preflight for all routes
```

## Test the Fix

1. Update your backend CORS configuration
2. Restart your backend server
3. Open `test-cors.html` in your browser - it should show "Connection Successful"
4. Try logging in from your frontend

## Quick Diagnostic Commands

### Check if CORS headers are present:
```bash
curl -v -H "Origin: http://localhost:3000" \
  -H "Access-Control-Request-Method: POST" \
  -H "Access-Control-Request-Headers: Content-Type" \
  -X OPTIONS \
  http://128.199.70.237/api/auth/login
```

Look for `Access-Control-Allow-Origin` in the response headers.

### Test actual request:
```bash
curl -v -H "Origin: http://localhost:3000" \
  -H "Content-Type: application/json" \
  -X POST \
  -d '{"email":"admin@labkimia.ac.id","password":"admin123"}' \
  http://128.199.70.237/api/auth/login
```

## Common Issues

1. **Backend not handling OPTIONS requests**: Add OPTIONS handler
2. **Wildcard origin with credentials**: Can't use `origin: '*'` with `credentials: true`
3. **Missing headers**: Make sure all required headers are in `Access-Control-Allow-Headers`
4. **Case sensitivity**: Header names are case-insensitive, but values matter

## Still Not Working?

1. Check browser console (F12) for exact CORS error message
2. Verify backend is actually running and accessible
3. Check if there's a reverse proxy (nginx, etc.) that needs CORS configuration
4. Verify your frontend URL matches what you configured in CORS


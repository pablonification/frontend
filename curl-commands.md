# Curl Commands for Testing Remote Backend

**Base URL:** `http://128.199.70.237`

## Basic Connectivity Tests

### 1. Test Root Endpoint
```bash
curl -v http://128.199.70.237/
```

### 2. Test API Root
```bash
curl -v http://128.199.70.237/api
```

## Public Endpoints (No Auth Required)

### 3. Get All Announcements
```bash
curl -X GET "http://128.199.70.237/api/announcements" \
  -H "Content-Type: application/json"
```

### 4. Get Announcements with Pagination
```bash
curl -X GET "http://128.199.70.237/api/announcements?page=1&limit=10" \
  -H "Content-Type: application/json"
```

### 5. Get Single Announcement (replace :id with actual ID)
```bash
curl -X GET "http://128.199.70.237/api/announcements/1" \
  -H "Content-Type: application/json"
```

### 6. Get All Modules
```bash
curl -X GET "http://128.199.70.237/api/modules" \
  -H "Content-Type: application/json"
```

### 7. Get All Files
```bash
curl -X GET "http://128.199.70.237/api/files" \
  -H "Content-Type: application/json"
```

### 8. Get All Nilai Files
```bash
curl -X GET "http://128.199.70.237/api/nilai" \
  -H "Content-Type: application/json"
```

### 9. Global Search
```bash
curl -X GET "http://128.199.70.237/api/search?q=praktikum" \
  -H "Content-Type: application/json"
```

## Authentication

### 10. Login (Get JWT Token)
```bash
curl -X POST "http://128.199.70.237/api/auth/login" \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@labkimia.ac.id",
    "password": "admin123"
  }'
```

**Save the token from the response for authenticated requests below.**

### 11. Get Current User Info (Requires Token)
```bash
# Replace YOUR_TOKEN_HERE with the actual JWT token from login
curl -X GET "http://128.199.70.237/api/auth/me" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

## Authenticated Endpoints (Requires JWT Token)

### 12. Create Announcement
```bash
# Replace YOUR_TOKEN_HERE with the actual JWT token
curl -X POST "http://128.199.70.237/api/announcements" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -d '{
    "title": "Test Announcement",
    "content": "This is a test announcement",
    "is_important": false,
    "attachments": []
  }'
```

### 13. Update Announcement
```bash
# Replace YOUR_TOKEN_HERE and :id with actual values
curl -X PUT "http://128.199.70.237/api/announcements/1" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -d '{
    "title": "Updated Title",
    "content": "Updated content",
    "is_important": true,
    "attachments": []
  }'
```

### 14. Delete Announcement
```bash
# Replace YOUR_TOKEN_HERE and :id with actual values
curl -X DELETE "http://128.199.70.237/api/announcements/1" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

### 15. Create Module (File Upload)
```bash
# Replace YOUR_TOKEN_HERE and file path with actual values
curl -X POST "http://128.199.70.237/api/modules" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -F "file=@/path/to/your/file.pdf" \
  -F "title=Test Module" \
  -F "description=Test module description" \
  -F "visibility=public"
```

### 16. Create File (File Upload)
```bash
# Replace YOUR_TOKEN_HERE and file path with actual values
curl -X POST "http://128.199.70.237/api/files" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -F "file=@/path/to/your/file.pdf" \
  -F "name=Test File.pdf" \
  -F "description=Test file description" \
  -F "visibility=public"
```

## Quick Test Sequence

Run these commands in order to test the backend:

```bash
# 1. Test connectivity
curl -v http://128.199.70.237/

# 2. Test public endpoints
curl http://128.199.70.237/api/announcements

# 3. Login and save token
TOKEN=$(curl -s -X POST "http://128.199.70.237/api/auth/login" \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@labkimia.ac.id","password":"admin123"}' \
  | jq -r '.data.token')

# 4. Test authenticated endpoint
curl -X GET "http://128.199.70.237/api/auth/me" \
  -H "Authorization: Bearer $TOKEN"
```

## Notes

- If the API is not at `/api`, try testing with just `/` first
- Replace `YOUR_TOKEN_HERE` with the actual JWT token from the login response
- For file uploads, adjust the file path (`-F "file=@/path/to/file"`) to point to an actual file
- Some endpoints might require different base paths (e.g., `/api/v1` instead of `/api`)



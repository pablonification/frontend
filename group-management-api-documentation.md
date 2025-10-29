# Group Management API Documentation

## Overview
This document provides comprehensive API specifications for the group management system, which handles file uploads and management of student group assignments for practical laboratory sessions.

## Base URL
```
http://localhost:5001/api
```

## Authentication
All admin endpoints require authentication. Implement JWT-based authentication with the following flow:

### Authentication Endpoints

#### POST /api/auth/login
Login endpoint for admin users.

**Request Body:**
```json
{
  "email": "admin@labkimia.ac.id",
  "password": "admin123"
}
```

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "user": {
      "id": 1,
      "email": "admin@labkimia.ac.id",
      "full_name": "Admin User",
      "role": "admin"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  },
  "message": "Login successful"
}
```

**Response (401 Unauthorized):**
```json
{
  "success": false,
  "message": "Invalid credentials"
}
```

## Groups API

### GET /api/groups
Get all group files with pagination and search.

**Query Parameters:**
- `page` (optional): Page number, default: 1
- `limit` (optional): Items per page, default: 10
- `search` (optional): Search term for name/description
- `visibility` (optional): Filter by visibility (public/private)
- `cohort` (optional): Filter by cohort/year

**Response (200 OK):**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "name": "Kelompok A - Senin Pagi",
      "description": "Pembagian kelompok untuk praktikum hari Senin pagi",
      "storage_path": "/uploads/groups/kelompok_a.pdf",
      "cohort": "2023/2024",
      "visibility": "public",
      "has_password": false,
      "file_size": 2048576,
      "file_type": "application/pdf",
      "download_count": 150,
      "created_at": "2024-01-15T09:30:00Z",
      "updated_at": "2024-01-15T09:30:00Z"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 25,
    "totalPages": 3
  }
}
```

### GET /api/groups/:id
Get a specific group file by ID.

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "name": "Kelompok A - Senin Pagi",
    "description": "Pembagian kelompok untuk praktikum hari Senin pagi",
    "storage_path": "/uploads/groups/kelompok_a.pdf",
    "cohort": "2023/2024",
    "visibility": "public",
    "has_password": false,
    "file_size": 2048576,
    "file_type": "application/pdf",
    "download_count": 150,
    "created_at": "2024-01-15T09:30:00Z",
    "updated_at": "2024-01-15T09:30:00Z"
  }
}
```

### POST /api/groups
Create a new group file.

**Headers:**
```
Authorization: Bearer <jwt_token>
Content-Type: multipart/form-data
```

**Request Body (multipart/form-data):**
- `file`: Group file (required)
- `name`: Group name (required, max 100 chars)
- `description`: Group description (required, max 500 chars)
- `cohort`: Cohort/year (required, max 50 chars)
- `visibility`: Visibility setting ("public" or "private", default: "public")

**Response (201 Created):**
```json
{
  "success": true,
  "data": {
    "id": 2,
    "name": "Kelompok B - Selasa Sore",
    "description": "Pembagian kelompok untuk praktikum hari Selasa sore",
    "storage_path": "/uploads/groups/kelompok_b.pdf",
    "cohort": "2023/2024",
    "visibility": "public",
    "has_password": false,
    "file_size": 1024000,
    "file_type": "application/pdf",
    "download_count": 0,
    "created_at": "2024-01-16T10:00:00Z",
    "updated_at": "2024-01-16T10:00:00Z"
  },
  "message": "Group file created successfully"
}
```

### PUT /api/groups/:id
Update an existing group file.

**Headers:**
```
Authorization: Bearer <jwt_token>
Content-Type: multipart/form-data
```

**Request Body (multipart/form-data):**
- `file`: Group file (optional)
- `name`: Group name (required, max 100 chars)
- `description`: Group description (required, max 500 chars)
- `cohort`: Cohort/year (required, max 50 chars)
- `visibility`: Visibility setting ("public" or "private", default: "public")

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "name": "Updated Group Name",
    "description": "Updated group description",
    "storage_path": "/uploads/groups/kelompok_a.pdf",
    "cohort": "2024/2025",
    "visibility": "private",
    "has_password": false,
    "file_size": 2048576,
    "file_type": "application/pdf",
    "download_count": 150,
    "created_at": "2024-01-15T09:30:00Z",
    "updated_at": "2024-01-16T11:00:00Z"
  },
  "message": "Group file updated successfully"
}
```

### DELETE /api/groups/:id
Delete a group file.

**Headers:**
```
Authorization: Bearer <jwt_token>
```

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Group file deleted successfully"
}
```

### GET /api/groups/:id/download
Download group file (with valid token).

**Query Parameters:**
- `token`: Download token from password verification (required for protected files)

**Headers:**
```
Authorization: Bearer <jwt_token> (for admin access)
```

**Response:**
- File download with appropriate headers
- Content-Type: application/octet-stream or file-specific type
- Content-Disposition: attachment; filename="filename.pdf"

## Data Structures

### Group Interface
```typescript
interface Group {
  id: string | number
  name: string
  description: string
  storage_path: string
  cohort: string
  visibility: 'public' | 'private'
  has_password: boolean
  file_size?: number
  file_type?: string
  download_count?: number
  created_at: string
  updated_at: string
}
```

### GroupFormData Interface
```typescript
interface GroupFormData {
  name: string
  description: string
  cohort: string
  visibility: 'public' | 'private'
  file?: File
}
```

## Error Responses

All endpoints should return consistent error responses:

**400 Bad Request:**
```json
{
  "success": false,
  "message": "Validation error",
  "details": {
    "field": "name",
    "error": "Name is required and must be less than 100 characters"
  }
}
```

**401 Unauthorized:**
```json
{
  "success": false,
  "message": "Authentication required"
}
```

**403 Forbidden:**
```json
{
  "success": false,
  "message": "Insufficient permissions"
}
```

**404 Not Found:**
```json
{
  "success": false,
  "message": "Resource not found"
}
```

**413 Payload Too Large:**
```json
{
  "success": false,
  "message": "File size exceeds maximum limit of 10MB"
}
```

**415 Unsupported Media Type:**
```json
{
  "success": false,
  "message": "File type not supported"
}
```

**422 Unprocessable Entity:**
```json
{
  "success": false,
  "message": "Invalid data provided",
  "details": {
    "field": "cohort",
    "error": "Invalid cohort format"
  }
}
```

**500 Internal Server Error:**
```json
{
  "success": false,
  "message": "Internal server error"
}
```

## File Upload Requirements

### Allowed File Types
- **Documents**: `.pdf`, `.doc`, `.docx`, `.xls`, `.xlsx`
- **Images**: `.jpg`, `.jpeg`, `.png`, `.gif`, `.webp`
- **Archives**: `.zip`, `.rar`

### File Size Limits
- Maximum file size: 10MB per file
- Multiple file uploads: Maximum 5 files per request

### Storage Structure
```
uploads/
├── groups/         # Group assignment files
├── modules/        # Module files
├── files/          # General files
├── announcements/  # Announcement attachments
└── temp/          # Temporary uploads
```

## Database Schema Recommendations

### Groups Table
```sql
CREATE TABLE groups (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(100) NOT NULL,
  description TEXT NOT NULL,
  storage_path VARCHAR(500) NOT NULL,
  cohort VARCHAR(50) NOT NULL,
  visibility ENUM('public', 'private') DEFAULT 'public',
  has_password BOOLEAN DEFAULT FALSE,
  password_hash VARCHAR(255),
  file_size BIGINT,
  file_type VARCHAR(100),
  download_count INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

## Security Considerations

1. **Authentication**: Use JWT tokens with reasonable expiration (e.g., 24 hours)
2. **Password Security**: Hash passwords using bcrypt or similar
3. **File Upload Security**: 
   - Validate file types and sizes
   - Scan uploaded files for malware
   - Store files outside web root when possible
   - Use secure file naming conventions
4. **Rate Limiting**: Implement rate limiting on sensitive endpoints
5. **CORS**: Configure appropriate CORS headers
6. **Input Validation**: Validate all input data on server side
7. **SQL Injection**: Use parameterized queries or ORM

## Performance Considerations

1. **Database Indexing**: Add indexes on frequently queried columns
2. **File Storage**: Consider using cloud storage for large files
3. **Caching**: Implement caching for frequently accessed data
4. **Pagination**: Always paginate large result sets
5. **Compression**: Enable gzip compression for responses

## Frontend Implementation Guidelines

### API Client Usage
```typescript
import { api, endpoints, Group } from '../../lib/api'

// Fetch all groups
const response = await api.get<Group[]>(endpoints.groups.list)
setGroups(response.data || [])

// Create new group
const formData = new FormData()
formData.append('file', file)
formData.append('name', 'Group Name')
formData.append('description', 'Description')
formData.append('cohort', '2023/2024')
formData.append('visibility', 'public')

const createResponse = await api.uploadFile(endpoints.groups.create, file, {
  name: 'Group Name',
  description: 'Description',
  cohort: '2023/2024',
  visibility: 'public'
})

// Download group file
await api.downloadFile(endpoints.groups.download(groupId), 'group_file.pdf')
```

### Error Handling Pattern
```typescript
try {
  const response = await api.get<Group[]>(endpoints.groups.list)
  setGroups(response.data || [])
} catch (error: any) {
  console.error('Error fetching groups:', error)
  addNotification({
    type: 'error',
    title: 'Error',
    message: 'Failed to load groups'
  })
}
```

### Form Validation Pattern
```typescript
const validateForm = (): boolean => {
  const newErrors: Partial<GroupFormData> = {}

  if (!formData.name.trim()) {
    newErrors.name = 'Nama kelompok wajib diisi'
  } else if (formData.name.length > 100) {
    newErrors.name = 'Nama kelompok maksimal 100 karakter'
  }
  
  // Add other validations...
  
  setErrors(newErrors)
  return Object.keys(newErrors).length === 0
}
```

This documentation provides a comprehensive guide for implementing the group management system backend API and frontend integration following the established patterns in the codebase.
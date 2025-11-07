# Backend API Documentation for Admin Panel

## Overview
This document provides comprehensive API specifications for the backend implementation to support the admin panel CRUD operations for announcements, files, modules, and nilai.

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

#### POST /api/auth/logout
Logout endpoint (optional, can be client-side only).

**Headers:**
```
Authorization: Bearer <jwt_token>
```

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Logout successful"
}
```

#### GET /api/auth/me
Get current authenticated user info.

**Headers:**
```
Authorization: Bearer <jwt_token>
```

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "email": "admin@labkimia.ac.id",
    "full_name": "Admin User",
    "role": "admin"
  }
}
```

## Announcements API

### GET /api/announcements
Get all announcements with pagination and search.

**Query Parameters:**
- `page` (optional): Page number, default: 1
- `limit` (optional): Items per page, default: 10
- `search` (optional): Search term for title/content
- `is_important` (optional): Filter by importance flag

**Response (200 OK):**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "title": "Jadwal Praktikum Semester Ganjil",
      "content": "Berikut adalah jadwal praktikum untuk semester ganjil...",
      "attachments": ["jadwal.pdf", "petunjuk.pdf"],
      "is_important": true,
      "published_at": "2024-01-15T10:00:00Z",
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

### GET /api/announcements/:id
Get a specific announcement by ID.

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "title": "Jadwal Praktikum Semester Ganjil",
    "content": "Berikut adalah jadwal praktikum untuk semester ganjil...",
    "attachments": ["jadwal.pdf", "petunjuk.pdf"],
    "is_important": true,
    "published_at": "2024-01-15T10:00:00Z",
    "created_at": "2024-01-15T09:30:00Z",
    "updated_at": "2024-01-15T09:30:00Z"
  }
}
```

### POST /api/announcements
Create a new announcement.

**Headers:**
```
Authorization: Bearer <jwt_token>
Content-Type: application/json
```

**Request Body:**
```json
{
  "title": "Pengumuman Baru",
  "content": "Isi pengumuman lengkap...",
  "is_important": false,
  "attachments": ["file1.pdf", "file2.docx"]
}
```

**Response (201 Created):**
```json
{
  "success": true,
  "data": {
    "id": 2,
    "title": "Pengumuman Baru",
    "content": "Isi pengumuman lengkap...",
    "is_important": false,
    "attachments": ["file1.pdf", "file2.docx"],
    "published_at": "2024-01-16T10:00:00Z",
    "created_at": "2024-01-16T09:30:00Z",
    "updated_at": "2024-01-16T09:30:00Z"
  },
  "message": "Announcement created successfully"
}
```

### PUT /api/announcements/:id
Update an existing announcement.

**Headers:**
```
Authorization: Bearer <jwt_token>
Content-Type: application/json
```

**Request Body:**
```json
{
  "title": "Updated Title",
  "content": "Updated content...",
  "is_important": true,
  "attachments": ["updated.pdf"]
}
```

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "title": "Updated Title",
    "content": "Updated content...",
    "is_important": true,
    "attachments": ["updated.pdf"],
    "published_at": "2024-01-15T10:00:00Z",
    "created_at": "2024-01-15T09:30:00Z",
    "updated_at": "2024-01-16T10:30:00Z"
  },
  "message": "Announcement updated successfully"
}
```

### DELETE /api/announcements/:id
Delete an announcement.

**Headers:**
```
Authorization: Bearer <jwt_token>
```

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Announcement deleted successfully"
}
```

## Files API

### GET /api/files
Get all files with pagination and search.

**Query Parameters:**
- `page` (optional): Page number, default: 1
- `limit` (optional): Items per page, default: 10
- `search` (optional): Search term for name/description
- `visibility` (optional): Filter by visibility (public/private)

**Response (200 OK):**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "name": "Modul Praktikum 1.pdf",
      "storage_path": "/uploads/files/modul1.pdf",
      "description": "Modul praktikum dasar kimia",
      "visibility": "public",
      "has_password": false,
      "file_size": 2048576,
      "file_type": "application/pdf",
      "download_count": 150,
      "created_by": 1,
      "created_at": "2024-01-15T09:30:00Z",
      "updated_at": "2024-01-15T09:30:00Z"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 50,
    "totalPages": 5
  }
}
```

### GET /api/files/:id
Get a specific file by ID.

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "name": "Modul Praktikum 1.pdf",
    "storage_path": "/uploads/files/modul1.pdf",
    "description": "Modul praktikum dasar kimia",
    "visibility": "public",
    "has_password": false,
    "file_size": 2048576,
    "file_type": "application/pdf",
    "download_count": 150,
    "created_by": 1,
    "created_at": "2024-01-15T09:30:00Z",
    "updated_at": "2024-01-15T09:30:00Z"
  }
}
```

### POST /api/files
Upload a new file.

**Headers:**
```
Authorization: Bearer <jwt_token>
Content-Type: multipart/form-data
```

**Request Body (multipart/form-data):**
- `file`: File to upload (required)
- `name`: File name (required, max 100 chars)
- `description`: File description (optional, max 500 chars)
- `visibility`: Visibility setting ("public" or "private", default: "public")
- `password`: Password for protection (optional)

**Response (201 Created):**
```json
{
  "success": true,
  "data": {
    "id": 2,
    "name": "New Document.pdf",
    "storage_path": "/uploads/files/new_document.pdf",
    "description": "Document description",
    "visibility": "public",
    "has_password": false,
    "file_size": 1024000,
    "file_type": "application/pdf",
    "download_count": 0,
    "created_by": 1,
    "created_at": "2024-01-16T10:00:00Z",
    "updated_at": "2024-01-16T10:00:00Z"
  },
  "message": "File uploaded successfully"
}
```

### PUT /api/files/:id
Update file metadata.

**Headers:**
```
Authorization: Bearer <jwt_token>
Content-Type: application/json
```

**Request Body:**
```json
{
  "name": "Updated File Name.pdf",
  "description": "Updated description",
  "visibility": "private",
  "password": "newpassword123"
}
```

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "name": "Updated File Name.pdf",
    "storage_path": "/uploads/files/modul1.pdf",
    "description": "Updated description",
    "visibility": "private",
    "has_password": true,
    "file_size": 2048576,
    "file_type": "application/pdf",
    "download_count": 150,
    "created_by": 1,
    "created_at": "2024-01-15T09:30:00Z",
    "updated_at": "2024-01-16T11:00:00Z"
  },
  "message": "File updated successfully"
}
```

### DELETE /api/files/:id
Delete a file.

**Headers:**
```
Authorization: Bearer <jwt_token>
```

**Response (200 OK):**
```json
{
  "success": true,
  "message": "File deleted successfully"
}
```

### POST /api/files/:id/verify-password
Verify password for protected file.

**Request Body:**
```json
{
  "password": "userpassword123"
}
```

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "download_url": "/api/files/1/download?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "expires_at": "2024-01-16T11:05:00Z"
  },
  "message": "Password verified successfully"
}
```

**Response (401 Unauthorized):**
```json
{
  "success": false,
  "message": "Invalid password"
}
```

### GET /api/files/:id/download
Download file (with valid token).

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

## Modules API

### GET /api/modules
Get all modules with pagination and search.

**Query Parameters:**
- `page` (optional): Page number, default: 1
- `limit` (optional): Items per page, default: 10
- `search` (optional): Search term for title/description
- `visibility` (optional): Filter by visibility (public/private)

**Response (200 OK):**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "title": "Modul Praktikum Dasar Kimia",
      "file_path": "/uploads/modules/modul1.pdf",
      "description": "Modul praktikum untuk materi dasar kimia",
      "visibility": "public",
      "file_size": 3072000,
      "file_type": "application/pdf",
      "download_count": 200,
      "created_at": "2024-01-15T09:30:00Z",
      "updated_at": "2024-01-15T09:30:00Z"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 15,
    "totalPages": 2
  }
}
```

### GET /api/modules/:id
Get a specific module by ID.

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "title": "Modul Praktikum Dasar Kimia",
    "file_path": "/uploads/modules/modul1.pdf",
    "description": "Modul praktikum untuk materi dasar kimia",
    "visibility": "public",
    "file_size": 3072000,
    "file_type": "application/pdf",
    "download_count": 200,
    "created_at": "2024-01-15T09:30:00Z",
    "updated_at": "2024-01-15T09:30:00Z"
  }
}
```

### POST /api/modules
Create a new module.

**Headers:**
```
Authorization: Bearer <jwt_token>
Content-Type: multipart/form-data
```

**Request Body (multipart/form-data):**
- `file`: Module file (required)
- `title`: Module title (required, max 200 chars)
- `description`: Module description (required, max 1000 chars)
- `visibility`: Visibility setting ("public" or "private", default: "public")

**Response (201 Created):**
```json
{
  "success": true,
  "data": {
    "id": 2,
    "title": "Modul Praktikum Lanjutan",
    "file_path": "/uploads/modules/modul2.pdf",
    "description": "Modul praktikum untuk materi lanjutan",
    "visibility": "public",
    "file_size": 2500000,
    "file_type": "application/pdf",
    "download_count": 0,
    "created_at": "2024-01-16T10:00:00Z",
    "updated_at": "2024-01-16T10:00:00Z"
  },
  "message": "Module created successfully"
}
```

### PUT /api/modules/:id
Update an existing module.

**Headers:**
```
Authorization: Bearer <jwt_token>
Content-Type: application/json
```

**Request Body:**
```json
{
  "title": "Updated Module Title",
  "description": "Updated module description",
  "visibility": "private"
}
```

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "title": "Updated Module Title",
    "file_path": "/uploads/modules/modul1.pdf",
    "description": "Updated module description",
    "visibility": "private",
    "file_size": 3072000,
    "file_type": "application/pdf",
    "download_count": 200,
    "created_at": "2024-01-15T09:30:00Z",
    "updated_at": "2024-01-16T11:00:00Z"
  },
  "message": "Module updated successfully"
}
```

### DELETE /api/modules/:id
Delete a module.

**Headers:**
```
Authorization: Bearer <jwt_token>
```

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Module deleted successfully"
}
```

## Nilai API

### GET /api/nilai
Get all nilai files with pagination and search.

**Query Parameters:**
- `page` (optional): Page number, default: 1
- `limit` (optional): Items per page, default: 10
- `search` (optional): Search term for class/cohort
- `cohort` (optional): Filter by cohort

**Response (200 OK):**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "class": "Kelas A",
      "cohort": "2023/2024",
      "storage_path": "/uploads/nilai/kelas_a_2023_2024.pdf",
      "has_password": true,
      "file_size": 1024000,
      "file_type": "application/pdf",
      "download_count": 50,
      "created_at": "2024-01-15T09:30:00Z",
      "updated_at": "2024-01-15T09:30:00Z"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 20,
    "totalPages": 2
  }
}
```

### GET /api/nilai/:id
Get a specific nilai file by ID.

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "class": "Kelas A",
    "cohort": "2023/2024",
    "storage_path": "/uploads/nilai/kelas_a_2023_2024.pdf",
    "has_password": true,
    "file_size": 1024000,
    "file_type": "application/pdf",
    "download_count": 50,
    "created_at": "2024-01-15T09:30:00Z",
    "updated_at": "2024-01-15T09:30:00Z"
  }
}
```

### POST /api/nilai
Create a new nilai file.

**Headers:**
```
Authorization: Bearer <jwt_token>
Content-Type: multipart/form-data
```

**Request Body (multipart/form-data):**
- `file`: Nilai file (required)
- `class`: Class name (required, max 50 chars)
- `cohort`: Cohort/year (required, max 50 chars)
- `password`: Password for protection (optional)

**Response (201 Created):**
```json
{
  "success": true,
  "data": {
    "id": 2,
    "class": "Kelas B",
    "cohort": "2023/2024",
    "storage_path": "/uploads/nilai/kelas_b_2023_2024.pdf",
    "has_password": false,
    "file_size": 800000,
    "file_type": "application/pdf",
    "download_count": 0,
    "created_at": "2024-01-16T10:00:00Z",
    "updated_at": "2024-01-16T10:00:00Z"
  },
  "message": "Nilai file created successfully"
}
```

### PUT /api/nilai/:id
Update an existing nilai file.

**Headers:**
```
Authorization: Bearer <jwt_token>
Content-Type: application/json
```

**Request Body:**
```json
{
  "class": "Updated Class Name",
  "cohort": "2024/2025",
  "password": "newpassword123"
}
```

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "class": "Updated Class Name",
    "cohort": "2024/2025",
    "storage_path": "/uploads/nilai/kelas_a_2023_2024.pdf",
    "has_password": true,
    "file_size": 1024000,
    "file_type": "application/pdf",
    "download_count": 50,
    "created_at": "2024-01-15T09:30:00Z",
    "updated_at": "2024-01-16T11:00:00Z"
  },
  "message": "Nilai file updated successfully"
}
```

### DELETE /api/nilai/:id
Delete a nilai file.

**Headers:**
```
Authorization: Bearer <jwt_token>
```

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Nilai file deleted successfully"
}
```

### POST /api/nilai/:id/verify-password
Verify password for protected nilai file.

**Request Body:**
```json
{
  "password": "userpassword123"
}
```

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "download_url": "/api/nilai/1/download?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "expires_at": "2024-01-16T11:05:00Z"
  },
  "message": "Password verified successfully"
}
```

**Response (401 Unauthorized):**
```json
{
  "success": false,
  "message": "Invalid password"
}
```

### GET /api/nilai/:id/download
Download nilai file (with valid token).

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

## Search API

### GET /api/search
Global search across all content types.

**Query Parameters:**
- `q`: Search query (required)
- `type` (optional): Filter by content type ("announcement", "module", "file", "nilai")
- `page` (optional): Page number, default: 1
- `limit` (optional): Items per page, default: 10

**Response (200 OK):**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "type": "announcement",
      "title": "Jadwal Praktikum Semester Ganjil",
      "excerpt": "Berikut adalah jadwal praktikum untuk semester ganjil...",
      "url": "/pengumuman/1",
      "created_at": "2024-01-15T09:30:00Z"
    },
    {
      "id": 1,
      "type": "module",
      "title": "Modul Praktikum Dasar Kimia",
      "excerpt": "Modul praktikum untuk materi dasar kimia...",
      "url": "/praktikum#modul1",
      "created_at": "2024-01-15T09:30:00Z"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 15,
    "totalPages": 2
  }
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
    "field": "title",
    "error": "Title is required and must be less than 200 characters"
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
    "field": "email",
    "error": "Invalid email format"
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
- **Documents**: `.pdf`, `.doc`, `.docx`, `.xls`, `.xlsx`, `.ppt`, `.pptx`
- **Images**: `.jpg`, `.jpeg`, `.png`, `.gif`, `.webp`
- **Archives**: `.zip`, `.rar`

### File Size Limits
- Maximum file size: 10MB per file
- Multiple file uploads: Maximum 5 files per request

### Storage Structure
```
uploads/
├── files/          # General files
├── modules/        # Module files
├── nilai/          # Nilai/grade files
├── announcements/  # Announcement attachments
└── temp/          # Temporary uploads
```

## Database Schema Recommendations

### Users Table
```sql
CREATE TABLE users (
  id INT PRIMARY KEY AUTO_INCREMENT,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  full_name VARCHAR(255) NOT NULL,
  role ENUM('admin', 'user') DEFAULT 'user',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

### Announcements Table
```sql
CREATE TABLE announcements (
  id INT PRIMARY KEY AUTO_INCREMENT,
  title VARCHAR(200) NOT NULL,
  content TEXT NOT NULL,
  attachments JSON,
  is_important BOOLEAN DEFAULT FALSE,
  published_at TIMESTAMP NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

### Files Table
```sql
CREATE TABLE files (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(100) NOT NULL,
  storage_path VARCHAR(500) NOT NULL,
  description TEXT,
  visibility ENUM('public', 'private') DEFAULT 'public',
  has_password BOOLEAN DEFAULT FALSE,
  password_hash VARCHAR(255),
  file_size BIGINT,
  file_type VARCHAR(100),
  download_count INT DEFAULT 0,
  created_by INT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (created_by) REFERENCES users(id)
);
```

### Modules Table
```sql
CREATE TABLE modules (
  id INT PRIMARY KEY AUTO_INCREMENT,
  title VARCHAR(200) NOT NULL,
  file_path VARCHAR(500) NOT NULL,
  description TEXT NOT NULL,
  visibility ENUM('public', 'private') DEFAULT 'public',
  file_size BIGINT,
  file_type VARCHAR(100),
  download_count INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

### Nilai Files Table
```sql
CREATE TABLE nilai_files (
  id INT PRIMARY KEY AUTO_INCREMENT,
  class VARCHAR(50) NOT NULL,
  cohort VARCHAR(50) NOT NULL,
  storage_path VARCHAR(500) NOT NULL,
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

This documentation provides a comprehensive guide for implementing the backend API to support the admin panel functionality.
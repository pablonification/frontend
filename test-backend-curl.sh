#!/bin/bash

# Remote Backend Testing Script
# Base URL: http://128.199.70.237

BASE_URL="http://128.199.70.237"

echo "=========================================="
echo "Testing Remote Backend: $BASE_URL"
echo "=========================================="
echo ""

# 1. Test basic connectivity (root endpoint)
echo "1. Testing root endpoint:"
curl -v "$BASE_URL/" 2>&1 | head -20
echo ""
echo "---"
echo ""

# 2. Test API root endpoint
echo "2. Testing API root endpoint:"
curl -v "$BASE_URL/api" 2>&1 | head -20
echo ""
echo "---"
echo ""

# 3. Test GET /api/announcements (public endpoint)
echo "3. Testing GET /api/announcements:"
curl -X GET "$BASE_URL/api/announcements" \
  -H "Content-Type: application/json" \
  -w "\nHTTP Status: %{http_code}\n" \
  -s | jq '.' 2>/dev/null || cat
echo ""
echo "---"
echo ""

# 4. Test GET /api/modules (public endpoint)
echo "4. Testing GET /api/modules:"
curl -X GET "$BASE_URL/api/modules" \
  -H "Content-Type: application/json" \
  -w "\nHTTP Status: %{http_code}\n" \
  -s | jq '.' 2>/dev/null || cat
echo ""
echo "---"
echo ""

# 5. Test GET /api/files (public endpoint)
echo "5. Testing GET /api/files:"
curl -X GET "$BASE_URL/api/files" \
  -H "Content-Type: application/json" \
  -w "\nHTTP Status: %{http_code}\n" \
  -s | jq '.' 2>/dev/null || cat
echo ""
echo "---"
echo ""

# 6. Test GET /api/nilai (public endpoint)
echo "6. Testing GET /api/nilai:"
curl -X GET "$BASE_URL/api/nilai" \
  -H "Content-Type: application/json" \
  -w "\nHTTP Status: %{http_code}\n" \
  -s | jq '.' 2>/dev/null || cat
echo ""
echo "---"
echo ""

# 7. Test POST /api/auth/login
echo "7. Testing POST /api/auth/login:"
curl -X POST "$BASE_URL/api/auth/login" \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@labkimia.ac.id",
    "password": "admin123"
  }' \
  -w "\nHTTP Status: %{http_code}\n" \
  -s | jq '.' 2>/dev/null || cat
echo ""
echo "---"
echo ""

echo "=========================================="
echo "Test completed!"
echo ""
echo "If login was successful, save the token and use it in subsequent requests:"
echo "  curl -X GET '$BASE_URL/api/auth/me' -H 'Authorization: Bearer YOUR_TOKEN_HERE'"
echo "=========================================="



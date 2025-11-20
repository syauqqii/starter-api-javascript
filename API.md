# API Documentation

## Base URL
```
http://localhost:3002
```

---

## Health Check

### GET /health
Check API service health status.

**Request:**
```
GET /health
```

**Response (200 OK):**
```json
{
  "status": true,
  "code": 200,
  "message": "Service is healthy",
  "data": {
    "status": "healthy",
    "timestamp": "2024-01-15T10:30:00.000Z",
    "uptime": 3600.123,
    "memory": {
      "used": "50 MB",
      "total": "100 MB"
    }
  }
}
```

---

## Authentication

### POST /auth/register
Register a new user account.

**Request:**
```json
{
  "username": "string (required, min 3 chars)",
  "email": "string (required, valid email)",
  "password": "string (required, min 8 chars)"
}
```

**Response (201 Created):**
```json
{
  "status": true,
  "code": 201,
  "message": "User registered successfully",
  "data": {
    "id": "uuid",
    "username": "johndoe",
    "email": "john@example.com"
  }
}
```

### POST /auth/login
Authenticate user and get tokens.

**Request:**
```json
{
  "email": "string (required)",
  "password": "string (required)"
}
```

**Response (200 OK):**
```json
{
  "status": true,
  "code": 200,
  "message": "Login successful",
  "data": {
    "access_token": "jwt_token",
    "refresh_token": "refresh_token",
    "expires_in": 3600
  }
}
```

### POST /auth/refresh
Refresh access token.

**Request:**
```json
{
  "refresh_token": "string (required)"
}
```

**Response (200 OK):**
```json
{
  "status": true,
  "code": 200,
  "message": "Token refreshed",
  "data": {
    "access_token": "new_jwt_token",
    "expires_in": 3600
  }
}
```

### POST /auth/logout
Logout and revoke refresh token.

**Headers:**
```
Authorization: Bearer <access_token>
```

**Response (200 OK):**
```json
{
  "status": true,
  "code": 200,
  "message": "Logged out successfully"
}
```

---

## Users

### GET /users
Get all users (requires permission: `user,read`).

**Headers:**
```
Authorization: Bearer <access_token>
```

**Response (200 OK):**
```json
{
  "status": true,
  "code": 200,
  "message": "Users retrieved successfully",
  "data": [
    {
      "id": "uuid",
      "username": "johndoe",
      "email": "john@example.com",
      "is_active": true,
      "created_at": "2024-01-15T10:30:00.000Z"
    }
  ]
}
```

### GET /users/:id
Get user by ID (requires permission: `user,read`).

**Headers:**
```
Authorization: Bearer <access_token>
```

**Response (200 OK):**
```json
{
  "status": true,
  "code": 200,
  "message": "User retrieved successfully",
  "data": {
    "id": "uuid",
    "username": "johndoe",
    "email": "john@example.com",
    "is_active": true,
    "roles": [
      {
        "id": "uuid",
        "name": "admin"
      }
    ]
  }
}
```

### PUT /users/:id
Update user (requires permission: `user,update`).

**Headers:**
```
Authorization: Bearer <access_token>
```

**Request:**
```json
{
  "username": "string (optional)",
  "email": "string (optional)",
  "is_active": "boolean (optional)"
}
```

**Response (200 OK):**
```json
{
  "status": true,
  "code": 200,
  "message": "User updated successfully",
  "data": {
    "id": "uuid",
    "username": "johndoe_updated",
    "email": "john@example.com"
  }
}
```

### DELETE /users/:id
Delete user (requires permission: `user,delete`).

**Headers:**
```
Authorization: Bearer <access_token>
```

**Response (200 OK):**
```json
{
  "status": true,
  "code": 200,
  "message": "User deleted successfully"
}
```

---

## Roles

### GET /roles
Get all roles (requires permission: `role,read`).

**Headers:**
```
Authorization: Bearer <access_token>
```

**Response (200 OK):**
```json
{
  "status": true,
  "code": 200,
  "message": "Roles retrieved successfully",
  "data": [
    {
      "id": "uuid",
      "name": "admin",
      "description": "Administrator role",
      "is_active": true
    }
  ]
}
```

### POST /roles
Create new role (requires permission: `role,create`).

**Headers:**
```
Authorization: Bearer <access_token>
```

**Request:**
```json
{
  "name": "string (required)",
  "description": "string (optional)"
}
```

**Response (201 Created):**
```json
{
  "status": true,
  "code": 201,
  "message": "Role created successfully",
  "data": {
    "id": "uuid",
    "name": "editor",
    "description": "Editor role"
  }
}
```

### PUT /roles/:id
Update role (requires permission: `role,update`).

**Headers:**
```
Authorization: Bearer <access_token>
```

**Request:**
```json
{
  "name": "string (optional)",
  "description": "string (optional)",
  "is_active": "boolean (optional)"
}
```

**Response (200 OK):**
```json
{
  "status": true,
  "code": 200,
  "message": "Role updated successfully",
  "data": {
    "id": "uuid",
    "name": "editor_updated"
  }
}
```

### DELETE /roles/:id
Delete role (requires permission: `role,delete`).

**Headers:**
```
Authorization: Bearer <access_token>
```

**Response (200 OK):**
```json
{
  "status": true,
  "code": 200,
  "message": "Role deleted successfully"
}
```

---

## Permissions

### GET /permissions
Get all permissions (requires permission: `permission,read`).

**Headers:**
```
Authorization: Bearer <access_token>
```

**Response (200 OK):**
```json
{
  "status": true,
  "code": 200,
  "message": "Permissions retrieved successfully",
  "data": [
    {
      "id": "uuid",
      "resource": "user",
      "action": "create",
      "description": "Create new users",
      "attributes": {}
    }
  ]
}
```

### POST /permissions
Create new permission (requires permission: `permission,create`).

**Headers:**
```
Authorization: Bearer <access_token>
```

**Request:**
```json
{
  "resource": "string (required)",
  "action": "string (required)",
  "description": "string (optional)",
  "attributes": "object (optional, for ABAC)"
}
```

**Response (201 Created):**
```json
{
  "status": true,
  "code": 201,
  "message": "Permission created successfully",
  "data": {
    "id": "uuid",
    "resource": "product",
    "action": "create"
  }
}
```

---

## User Roles (Assignment)

### POST /users/:id/roles
Assign role to user (requires permission: `user_role,create`).

**Headers:**
```
Authorization: Bearer <access_token>
```

**Request:**
```json
{
  "role_id": "uuid (required)"
}
```

**Response (200 OK):**
```json
{
  "status": true,
  "code": 200,
  "message": "Role assigned successfully"
}
```

### DELETE /users/:id/roles/:roleId
Remove role from user (requires permission: `user_role,delete`).

**Headers:**
```
Authorization: Bearer <access_token>
```

**Response (200 OK):**
```json
{
  "status": true,
  "code": 200,
  "message": "Role removed successfully"
}
```

---

## Role Permissions (Assignment)

### POST /roles/:id/permissions
Assign permission to role (requires permission: `role_permission,create`).

**Headers:**
```
Authorization: Bearer <access_token>
```

**Request:**
```json
{
  "permission_id": "uuid (required)",
  "conditions": "object (optional, ABAC conditions)"
}
```

**Response (200 OK):**
```json
{
  "status": true,
  "code": 200,
  "message": "Permission assigned successfully"
}
```

### DELETE /roles/:id/permissions/:permissionId
Remove permission from role (requires permission: `role_permission,delete`).

**Headers:**
```
Authorization: Bearer <access_token>
```

**Response (200 OK):**
```json
{
  "status": true,
  "code": 200,
  "message": "Permission removed successfully"
}
```

---

## Error Responses

### 400 Bad Request
```json
{
  "status": false,
  "code": 400,
  "message": "Validation error",
  "errors": [
    {
      "field": "email",
      "message": "Invalid email format"
    }
  ]
}
```

### 401 Unauthorized
```json
{
  "status": false,
  "code": 401,
  "message": "Authentication required"
}
```

### 403 Forbidden
```json
{
  "status": false,
  "code": 403,
  "message": "Permission denied"
}
```

### 404 Not Found
```json
{
  "status": false,
  "code": 404,
  "message": "Resource not found"
}
```

### 500 Internal Server Error
```json
{
  "status": false,
  "code": 500,
  "message": "Internal server error"
}
```

---

## ABAC (Attribute-Based Access Control)

### Permission Format
Permissions use `resource,action` format for route protection:

```javascript
// Route example with ABAC middleware
router.get('/users', authorize('user,read'), UserController.getAll);
router.post('/users', authorize('user,create'), UserController.create);
router.delete('/users/:id', authorize('user,delete'), UserController.delete);
```

### Custom Attributes
Permissions can have custom attributes for fine-grained control:

```json
{
  "resource": "document",
  "action": "read",
  "attributes": {
    "department": "engineering",
    "level": "confidential"
  }
}
```

### Conditions
Role-permission assignments can have conditions:

```json
{
  "conditions": {
    "time_restriction": {
      "start": "09:00",
      "end": "17:00"
    },
    "ip_whitelist": ["192.168.1.0/24"]
  }
}
```

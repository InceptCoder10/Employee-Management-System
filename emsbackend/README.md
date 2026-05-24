# Employee API

A simple REST API for managing employee data with the following structure:
- `id`: Employee ID (number)
- `employee_name`: Employee name (string)
- `employee_age`: Employee age (string)
- `employee_salary`: Employee salary (string)
- `profile_image`: Profile image URL (string, can be empty)
- `status`: Employee status (string) - e.g., "Active", "On Leave"

## Installation

```bash
npm install
```

## Running the API

```bash
# Start the server
npm start

# Or with auto-reload during development
npm run dev
```

The API will run on `http://localhost:3000`

## API Endpoints

### 1. Get All Employees
```
GET /api/employees
```

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "employee_name": "Tiger Nixon",
      "employee_age": "61",
      "employee_salary": "320800",
      "profile_image": "",
      "status": "On Leave"
    }
  ],
  "count": 5
}
```

### 2. Get Employee by ID
```
GET /api/employees/:id
```

**Example:**
```
GET /api/employees/1
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "employee_name": "Tiger Nixon",
    "employee_age": "61",
    "employee_salary": "320800",
    "profile_image": "",
    "status": "On Leave"
  }
}
```

### 3. Create New Employee
```
POST /api/employees
Content-Type: application/json
```

**Request Body:**
```json
{
  "employee_name": "John Doe",
  "employee_age": "30",
  "employee_salary": "50000",
  "profile_image": "https://example.com/image.jpg",
  "status": "Active"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Employee created successfully",
  "data": {
    "id": 6,
    "employee_name": "John Doe",
    "employee_age": "30",
    "employee_salary": "50000",
    "profile_image": "https://example.com/image.jpg",
    "status": "Active"
  }
}
```

### 4. Update Employee
```
PUT /api/employees/:id
Content-Type: application/json
```

**Example:**
```
PUT /api/employees/1
```

**Request Body (update any or all fields):**
```json
{
  "employee_name": "Tiger Nixon Updated",
  "status": "Active",
  "employee_salary": "350000"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Employee updated successfully",
  "data": {
    "id": 1,
    "employee_name": "Tiger Nixon Updated",
    "employee_age": "61",
    "employee_salary": "350000",
    "profile_image": "",
    "status": "Active"
  }
}
```

### 5. Delete Employee
```
DELETE /api/employees/:id
```

**Example:**
```
DELETE /api/employees/1
```

**Response:**
```json
{
  "success": true,
  "message": "Employee deleted successfully",
  "data": {
    "id": 1,
    "employee_name": "Tiger Nixon",
    "employee_age": "61",
    "employee_salary": "320800",
    "profile_image": "",
    "status": "On Leave"
  }
}
```

### 6. Health Check
```
GET /health
```

**Response:**
```json
{
  "status": "API is running"
}
```

## cURL Examples

```bash
# Get all employees
curl http://localhost:3000/api/employees

# Get specific employee
curl http://localhost:3000/api/employees/1

# Create new employee
curl -X POST http://localhost:3000/api/employees \
  -H "Content-Type: application/json" \
  -d '{"employee_name":"Jane Doe","employee_age":"28","employee_salary":"60000","status":"Active"}'

# Update employee
curl -X PUT http://localhost:3000/api/employees/1 \
  -H "Content-Type: application/json" \
  -d '{"status":"Active"}'

# Delete employee
curl -X DELETE http://localhost:3000/api/employees/1
```

## Notes

- All numeric values (age, salary) are stored as strings in the data structure as per your requirement
- Default status is "Active" if not provided
- IDs are auto-generated (max existing ID + 1)
- All requests/responses are in JSON format

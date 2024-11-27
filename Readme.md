# ##### Role-Based Access Control (RBAC) Dashboard

###### This project is a Role-Based Access Control (RBAC) dashboard for managing users, roles, and permissions. The application is built using React for the frontend and integrates with a backend API to handle authentication, user,role & permission management.This project is a Role-Based Access Control (RBAC) dashboard for managing users, roles, and permissions. The application is built using React for the frontend and integrates with a backend API to handle authentication, user,role & permission management.
==========================================================
Features
🌟 User Management: Add, edit, delete, and view users.
🛡️ Role-Based Permissions: Restrict actions based on user roles and permissions.
🌓 Dark/Light Theme: Toggle between dark and light modes for better accessibility.
📊 Responsive Design: Fully responsive layout optimized for all devices.
🔐 Authentication: Secure login and logout with session management.
📦API Integration: Axios-based API integration with centralized error handling using react query & axios interceptors.

=======================================================
#### ####**# ********Validations**

Admin can add,delete,modify,read  (all users,role,permission)
Manager can add,modify,read (all users, can't manage roles and permissions)
Support read only  (all users,role,permission)

=======================================================
#### Tech Stack****
**Frontend**:
React.js: Frontend framework.
React Context API: State management.
React Toastify: Notifications for success, error, and info messages.
FontAwesome: Icons for user interface.
Tailwind CSS: for styling.
**Backend**:
Node.js and Express.js: Backend server and APIs.
MySQL: Database for storing users, roles, and permissions.

=========================================================
**Version Control**
Github

========================================================
**Project Setup
#### **
**Installation**
**Prerequisites**:
Node.js (>= 14.x)
MySQL (or any compatible relational database)
**Steps**:
1) Clone the Repository:
git clone https://github.com/Veena55/vrv.git
2) cd Backend
3) npm install
4) Setup env file for --
    DB_HOST=
    DB_USERNAME=
    DB_PASSWORD=
    DB_NAME=
    SERVER_PORT=
    SECRET_KEY=
4) nodemon server.js

5)** Setup Frontend**
    Steps:
    1) navigate to root folder then cd Frontend
    2) npm install (vite project)
	npm run dev
========================================================
**API Documentation#### **
Base URL:
http://localhost:8080 (as per my code)

Endpoints:
POST /auth/login: Authenticate user.
GET /users: Fetch all users.
POST /users: Add a new user.
PUT /users/:id: Update user details.
DELETE /users/:id: Remove a user.

======================================================
#### Contact:
Author: Veena Rao
Email: veenasrao5@gmail.com
LinkedIn: https://www.linkedin.com/in/veena-rao-a36374175/

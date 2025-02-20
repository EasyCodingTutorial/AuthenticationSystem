# Authentication System Using NextAuth 

## Overview  
This **Authentication System** is built using **Next.js 15** and **TypeScript**, leveraging **NextAuth.js** for secure user authentication with **credentials-based login**. This system provides a robust authentication solution, including hashed password storage, session management, and protected routes.  

This project is perfect for developers looking to learn or implement **role-based authentication, password security**, and **protected API routes** in their Next.js applications.  

## Technologies Used  
- **Next.js 14**: A React framework for building server-rendered applications with enhanced performance and SEO.  
- **TypeScript**: A statically typed superset of JavaScript for better code maintainability.  
- **bcrypt**: A password-hashing library ensuring user passwords are securely stored.  
- **MongoDB**: A NoSQL database for storing user data.  
- **JWT (JSON Web Tokens)**: Secure session management for user authentication.  

## Features  
✅ **Secure Login System**: Users authenticate using email and password.  
✅ **Hashed Passwords**: Passwords are securely stored using **bcrypt**.  
✅ **Session Management**: Authentication handled with **NextAuth.js** and **JWT-based sessions**.  
✅ **Role-Based Access**: Admin and user roles with protected pages.  
✅ **API Route Protection**: API endpoints are secured to prevent unauthorized access.  
✅ **Client & Server Authentication**: Secure both frontend and backend routes.   

## 🔒 Protected Routes  
Certain routes are protected based on authentication status and user roles.  
- **Public Routes**: Anyone can access.  
- **Protected Routes**: Require user login.  
- **Admin Routes**: Only accessible by admin users.  

## Installation  
Follow these steps to set up the project on your local machine:  


## Installation  
To run this project locally, follow the steps below:  

1. Clone this repository to your local machine:  
   ```bash  
   git clone https://github.com/EasyCodingTutorial/AuthenticationSystem.git
2. Navigate to the project directory:
   ```bash  
   cd hulu-clone
   
3. Install dependencies:
   ```bash  
   npm install

4. Create a .env file in the root directory and add the following configuration:
    ```bash
    # NextAuth Configuration  
     NEXTAUTH_URL=http://localhost:3000  
     NEXTAUTH_SECRET=your-nextauth-secret-key  

    # MongoDB Connection  
    MONGODB_URI=your-mongo-db-uri  

   
5. Start the development server:
   ```bash  
    npm run dev  
   
6. Open your browser and visit:
   ```bash  
    http://localhost:3000
   ```


## How It Works
   - **User Registration**: Users sign up with an email and password.
   - **Password Hashing**: User passwords are hashed using bcrypt before storing in the database.
   - **Login with Credentials**: Users enter their email and password to log in.
   - **Session Management**: After logging in, NextAuth manages sessions using JWT tokens.
   - **Protected Routes**: Users can only access certain pages after authentication.
   - **Role-Based Access**: Admin users can access admin-only routes.

## Known Issues
   - ❌ **Forgot Password Feature**: Currently not implemented.
   - ❌ **User Profile Management**: No option for users to update their details.

## Missing Features
   - Adding a "Forgot Password" feature using email-based password resets.
   - Building a user profile management system.

     If you find more issues or want to contribute, email me at **ecoding45@gmail.com**. Let’s collaborate to make this project better! 🚀

## Contributions
   Contributions are welcome! If you'd like to add new features or fix issues:

   - Fork the repository.
   - Create a new branch with your changes.
   - Submit a pull request.

     

## Learn By Watching Video ▶️
[![Watch Demo Video](https://img.youtube.com/vi/tyErSg83AWc/maxresdefault.jpg)](https://www.youtube.com/watch?v=tyErSg83AWc)



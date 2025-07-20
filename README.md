# 💻 Bank App – Frontend

This is the frontend for a simple banking application built with Angular. It allows users to log in, retrieve their profile data, and interact securely with a backend via JWT authentication. 🔐

The backend is built with Spring Boot ☕

➡️ Backend repository: https://github.com/patryk-krych/bank-app

🚧 The application is not finished

✅ Currently implemented functions:
- 🔑 **User login** with JWT authentication
- 📝 **User registration** with form validation and backend integration 
- 💾 **Storing token** in local storage  
- 📬 **Fetching user profile** from backend after login  
- 🧾 **Displaying user data** (ID, first name, last name) in the header
- 🔐 **Route protection** – only authenticated users can access restricted routes (e.g. /home)


## 🚀 How to run the app locally

1. Clone this repository and navigate to its root directory.

2. Install dependencies and run:
    npm install
    npm start

3. Visit http://localhost:4200/

4. To login, use the following credentials:

   Id: 1
   Hasło: test123
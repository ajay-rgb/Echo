# Echo Echo - Your Personal Productivity Companion

<img width="1919" height="926" alt="image" src="https://github.com/user-attachments/assets/c3a5a747-8c2a-46b3-b539-b6515fa76c69" />

<img width="1917" height="934" alt="image" src="https://github.com/user-attachments/assets/f396368a-cb0d-446f-b1d8-4d1eacff063a" />

**Echo** is a modern, full-stack productivity application designed to help you track your time, organize your thoughts, and gain insights into your daily habits. Built with the MERN stack (MongoDB, Express, React, Node.js), Echo provides a seamless and persistent experience for managing your tasks and notes.

---

## ✨ Core Features

* **Task-Based Timer**: A fully functional stopwatch to track time spent on specific tasks.
* **Timestamp Logging**: Save work sessions as timestamps, which are associated with the task you were working on.
* **Full-Stack Notes**: A complete CRUD (Create, Read, Update, Delete) feature for jotting down ideas. Notes are saved securely and permanently in the database.
* **User Authentication**: Secure user registration and login system with password hashing (`bcryptjs`) and session management using **JSON Web Tokens (JWT)**.
* **Protected Routes**: User-specific data (like notes and timestamps) is protected and only accessible after logging in.
* **Data Persistence**: All user data is stored in a **MongoDB Atlas** cloud database, ensuring it's available across sessions and devices.
* **Light/Dark Theme**: A dynamic theme switcher, managed globally with the **React Context API**, allows users to toggle between light and dark modes.
* **Responsive Layout**: A modern, multi-column layout built with **Tailwind CSS** that is fully responsive and provides a great user experience on any device.

---

## 🛠️ Tech Stack

### Frontend
* **React.js**: A JavaScript library for building user interfaces.
* **React Router**: For client-side routing and navigation.
* **Tailwind CSS**: A utility-first CSS framework for rapid UI development.
* **React Icons**: For including popular icons in the project.
* **Vite**: A next-generation frontend tooling for a faster and leaner development experience.

### Backend
* **Node.js**: A JavaScript runtime environment.
* **Express.js**: A minimal and flexible Node.js web application framework.
* **MongoDB**: A NoSQL database for storing application data.
* **Mongoose**: An Object Data Modeling (ODM) library for MongoDB and Node.js.
* **JSON Web Token (JWT)**: For creating secure access tokens.
* **Bcrypt.js**: For hashing user passwords.
* **Dotenv**: For managing environment variables.

---

## 🚀 Getting Started

Follow these instructions to get a local copy of the project up and running.

### Prerequisites

* Node.js and npm installed on your machine.
* A free MongoDB Atlas account and a connection string.

### Installation

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/your-username/echo.git](https://github.com/your-username/echo.git)
    cd echo
    ```

2.  **Install backend dependencies:**
    ```bash
    cd server
    npm install
    ```

3.  **Install frontend dependencies:**
    ```bash
    cd ../client # or your frontend folder name
    npm install
    ```

4.  **Set up environment variables:**
    * In the `server` directory, create a `.env` file and add the following:
        ```
        MONGO_URI="your_mongodb_connection_string"
        JWT_SECRET="your_super_secret_jwt_key"
        ```
    * In the `client` (frontend) directory, create a `.env` file and add the URL of your running backend server:
        ```
        VITE_API_URL="http://localhost:3000" 
        ```
        *(Note: If you are using Codespaces, replace with your forwarded port URL)*

### Running the Application

1.  **Start the backend server:**
    ```bash
    cd server
    npm run dev 
    ```

2.  **Start the frontend development server (in a new terminal):**
    ```bash
    cd client # or your frontend folder name
    npm run dev
    ```

Your application should now be running, with the frontend on `http://localhost:5173` (or your Vite port) and the backend on `http://localhost:3000`.

---

## 🌟 Future Features

* **Productivity Dashboard**: Visualize time spent per task with charts and graphs.
* **Gamification**: Introduce daily goals and streaks to motivate users.
* **Calendar Integration**: Allow users to save notes and timestamps to specific dates on the calendar.

---

Thank You!


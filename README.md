# Echo

<img width="1919" height="926" alt="image" src="https://github.com/user-attachments/assets/c3a5a747-8c2a-46b3-b539-b6515fa76c69" />

<img width="1917" height="934" alt="image" src="https://github.com/user-attachments/assets/f396368a-cb0d-446f-b1d8-4d1eacff063a" />

### Your Personal Productivity Dashboard


**Echo** is a full-stack MERN productivity application designed to help you track, understand, and optimize how you spend your time. By associating your work sessions with specific tasks, Echo transforms raw time data into powerful visualizations, giving you clear insights into your daily habits and overall productivity.

---

## ✨ Core Features

* **Task-Based Time Tracking**: A fully functional stopwatch to track time spent on specific tasks. If no task is specified, it's saved as "General Work".
* **Productivity Dashboard**:
    * **Bar Chart**: Visualizes the total time (in minutes) dedicated to each task.
    * **Heatmap Calendar**: A GitHub-style heatmap that displays your work consistency and intensity over the past year, with a monthly navigation view.
* **Full-Stack Notes**: A complete CRUD (Create, Read, Delete) feature for jotting down ideas. Notes are saved securely and are unique to each user.
* **User Authentication**: Secure user registration and login system with password hashing (`bcryptjs`) and session management using **JSON Web Tokens (JWT)**.
* **Protected Routes**: All user data (notes, work sessions) is protected. Users must be logged in to access their personal dashboard and data.
* **Persistent Cloud Storage**: All user data is stored in a **MongoDB Atlas** cloud database, ensuring it's available across sessions and devices.
* **Dynamic Theming**: A theme switcher, managed globally with the **React Context API**, allows users to toggle between light and dark modes.
* **Interactive UI**: Features like a flippable calendar card provide a modern and engaging user experience.

---

## 🛠️ Tech Stack

### Frontend
* **React.js**: A JavaScript library for building user interfaces.
* **React Router**: For client-side routing and navigation.
* **Tailwind CSS**: A utility-first CSS framework for rapid UI development.
* **Recharts**: A composable charting library for data visualization.
* **React Calendar Heatmap**: For the GitHub-style productivity graph.
* **Vite**: A next-generation frontend tooling for a faster development experience.

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

* **Calendar Integration**: Allow users to save notes and view work sessions on specific dates on the main calendar.
* **Gamification**: Introduce daily goals, streaks, and achievements to motivate users.
* **Advanced Filtering**: Allow users to filter their dashboard data by custom date ranges.


Thank You!


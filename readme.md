# StackSwipe Backend

This repository contains the backend services for the StackSwipe application.

## Features

- **User Authentication**: Manages user registration, login, and authentication.
  ![alt text](<Screenshot from 2025-01-21 15-02-55.png>)
- **Data Management**: Handles data storage and retrieval for user profiles and preferences.
- **API Endpoints**: Provides RESTful API endpoints for client interactions.

## Technologies Used

- **Node.js**: JavaScript runtime environment.
- **Express.js**: Web framework for building APIs.
- **MongoDB**: NoSQL database for data storage.

## Getting Started

### Prerequisites

- **Node.js**: Ensure Node.js is installed on your system.
- **MongoDB**: Set up a MongoDB database.

### Installation

1. **Clone the Repository**:

   ```bash
   git clone https://github.com/raulsync/stackSwipe-backend.git
   cd stackSwipe-backend
   ```

2. **Install dependencies for both frontend and backend:**

   ```bash
   npm install

   ```

3. **Set up environment variables:**

   ```bash
   # In the root directory, create a .env file
   touch .env

   # Add the following variables
   PORT=7777
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   ```

4. **Start the development servers:**

   ```bash
   # Start the development server
   npm run dev
   ```

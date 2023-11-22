# Forum

## About the Project

The Forum is a full-stack web application that provides a platform for users to discuss various topics. This project is built using a modern tech stack including SASS for styling, React for the frontend with Redux Toolkit for state management, and Express in conjunction with Node.js for the backend. The data is stored in MongoDB, and session-based authentication is used for managing user logins. The application can be easily set up and run in a local development environment or deployed using Docker containers.

## Features

- User Authentication
- Discussion Threads
- Comments and Replies
- User Profiles
- Real-time Updates
- Responsive Design

## Tech Stack

- **Frontend:** React, Redux Toolkit, SASS, JavaScript
- **Backend:** Node.js, Express
- **Database:** MongoDB
- **Others:** NPM, Docker

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/)
- [MongoDB](https://www.mongodb.com/)
- [Docker](https://www.docker.com/) (optional)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/DmytroBaturin/Forum.git
   ```
2. Navigate to the project directory:
   ```bash
   cd Forum
   ```

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Install NPM packages:
   ```bash
   npm install
   ```
3. Start the backend server:
   ```bash
   npm start
   ```

### Frontend Setup

1. Open a new terminal window and navigate to the frontend directory from the project root:
   ```bash
   cd frontend
   ```
2. Install NPM packages:
   ```bash
   npm install
   ```
3. Start the frontend development server:
   ```bash
   npm start
   ```

Now, your forum should be accessible at `http://localhost:3000` in your web browser.

### Using Docker (Optional)

If you have Docker installed, you can run the entire application using Docker Compose.

1. From the project root, run:
   ```bash
   docker-compose up --build
   ```

This will set up both the frontend and backend services in Docker containers.

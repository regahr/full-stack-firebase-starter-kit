# Full-Stack Firebase Starter Kit

This project is a full-stack application built using Firebase, Turborepo, Express, Next.js and MUI. It features Firebase Authentication, Firestore database, and a monorepo structure for managing frontend and backend code efficiently.

## Table of Contents

1. [Pre-requirements](#pre-requirements)
2. [Installation](#installation)
3. [Firebase Functions Emulator Setup](#firebase-functions-emulator-setup)
4. [Running the Project](#running-the-project)
5. [Firebase Integration](#firebase-integration)
   - [Backend Functions](#backend-functions)
   - [Firestore Database](#firestore-database)
   - [Frontend Integration](#frontend-integration)
6. [Key Pages](#key-pages)
7. [Tech Stack Overview](#tech-stack-overview)
8. [Further Information](#further-information)
---

## Pre-requirements

Ensure that you have the following tools installed before proceeding:

- **Firebase CLI**  
  If Firebase CLI is not installed, you can install it using the following command:
  ```bash
  npm install -g firebase-tools
  ```
- **Node.js** and **npm** must be installed

## Installation

1. Clone the repository to your local machine:
   ```bash
   git clone git@github.com:regahr/full-stack-firebase-starter-kit.git
   ```
2. Navigate to the root directory of the project:
   ```bash
   cd full-stack-firebase-starter-kit
   ```   
3. Install dependencies
   ```bash
   npm install
   ``` 

## Firebase Functions Emulator Setup
To emulate Firebase services locally:
1. Initialize the emulator:
   ```bash
   firebase init emulators
   ```
2. Choose Functions Emulator
3. Start the emulator:
   ```bash
   firebase emulators:start --only functions
   ```

## Running the Project
To start the project, you can choose one of the following methods:

### Method 1: Using a Single Command
```bash
npm run serve
```

### Method 2: Running Backend and Frontend Separately
```bash
cd packages/backend
npm run build
firebase emulators:start --only functions
```

## Firebase Integration
This project integrates Firebase for authentication, deployment, and data storage using Firestore.

### Backend Functions
Firebase Cloud Functions handle server-side logic such as:
- Token validation
- User data management
- API interactions
- Firestore operations


### Firestore Database
Backend: Uses Firestore to store and retrieve user information, ensuring data consistency and integrity.

### Frontend Integration
Firebase Authentication: Handles user login, registration, and session management. The authentication state is stored persistently using Redux for seamless user experience across sessions.

## Key Pages
- `/` (Login Page):
   - Integrated with Firebase Auth, the database, and Redux for persistent authentication. 
   - Handles user login and ensures the session state is available throughout the application.
- `/home` Page:
   - Displays authentication and Firestore data using Redux and Firebase Auth.
   - Fetches and displays user information from Firestore.
- `/update-user` Page:
   - Updates user data via backend API calls to persists changes in Firestore.
   - Uses Redux to update the browser cache.
- `/sign-up` Page:
   - Handles user registration using Firebase Auth.
   - Manages tokens and user data persistently with Redux.

## Tech Stack Overview
- Frontend: Next.js 14 with MUI (Material-UI) for UI components.
- Backend: Express.js running on Firebase Functions.
- Database: Firebase Firestore for data storage.
- Monorepo Management: Turborepo for efficient multi-package handling.
- State Management: Redux for state persistence and management.
- Authentication: Firebase Auth integrated across the app.

## Further Information
- Firebase Integration: Full backend and frontend support with Firebase for authentication, data management, and serverless functions.
- TurboRepo: Efficiently manages monorepo dependencies and builds.
- Express.js: Serves as the backend API handler within Firebase Functions.

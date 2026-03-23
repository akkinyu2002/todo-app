# Todo App (Vite + React + Firebase)

Simple realtime Todo app built with React, Vite, Tailwind CSS, and Firebase Firestore.

## Prerequisites

- Node.js 18+
- npm 9+
- Firebase project with Firestore enabled

## Environment Setup

Create a `.env.local` file in the project root (`todo-app`) and add:

```env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

You can copy from `.env.example` and replace values as needed.

## Install and Run

```bash
npm install
npm run dev
```

Vite will print the local URL (usually `http://localhost:5173`).

## Build for Production

```bash
npm run build
npm run preview
```



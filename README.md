# QuickDesk - Help Desk Ticketing System

QuickDesk is a role-based help desk ticketing system built using **React**, **Firebase**, and **Tailwind CSS**. It supports three user roles — **User**, **Agent**, and **Admin** — with dynamic dashboards and secure role-based routing.

---

## 🚀 Features

- 🔐 Firebase Authentication (Email/Password)
- 🧠 Role-based Login: User, Agent, Admin
- 🎫 Ticket Creation (User)
- 🧾 Ticket Management Panel (Agent)
- 📊 Admin Dashboard
- 🔄 Real-time Firestore sync
- 💅 Responsive UI with Tailwind CSS
- 🔔 Toast notifications with react-hot-toast
-     Icons with lucide-react

---

## 🧩 Technologies Used

- **React** (with React Router)
- **Firebase** (Auth + Firestore)
- **Tailwind CSS**
- **React Hot Toast**
- **lucide-react**
- **Framer Motion** (for animations)

---

## 🛠️ Project Structure

```
src/
│
├── components/
│   ├── Auth/               → Login & Register pages
│   ├── Common/             → Navbar, Profile, Logout
│   ├── Dashboard/          → User/Agent/Admin views
│   ├── Landing/            → Landing pages based on roles
│   └── Tickets/            → Ticket creation & interaction
│
├── context/                → AuthContext for global auth/role state
├── Authentication/         → Firebase config
├── App.jsx                 → Routing logic
└── main.jsx                → React entry point
```

---

## 🔧 Setup Instructions

1. **Clone the repository**
```bash
git clone https://github.com/Avanishdubey1707/Odooxcgchackathon.git
cd Odooxcgchackathon
```

2. **Install dependencies**
```bash
npm install
```

3. **Firebase Configuration**
- Create a Firebase project
- Enable **Authentication (Email/Password)**
- Create a **Cloud Firestore** DB
- Add a `firebase.js` in `/src/Authentication/`:

```js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_BUCKET",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
```

4. **Start the development server**
```bash
npm run dev
```

---

## 👥 Roles & Access

| Role   | Access Rights                        |
|--------|--------------------------------------|
| User   | Create and view their own tickets    |
| Agent  | View all tickets, reply, and resolve |
| Admin  | Manage all users & tickets           |

---

## 📂 Firestore Rules
```js
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {

    match /users/{userId} {
      allow read, write: if request.auth.uid == userId;
    }

    match /tickets/{ticketId} {
      allow create: if request.auth != null;
      allow read, update, delete: if request.auth != null &&
        (resource.data.createdBy == request.auth.uid ||
         get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role in ['admin', 'agent']);
    }
  }
}
```

---

## 🧪 Sample Test Users
- **User:** bob@example.com / 1234567
- **Agent:** charlie@example.com / 123456
- **Admin:** alice@example.com / 87654321

*(Make sure these exist in your Firebase Auth and Firestore)*

---

## 📜 License
This project is built for educational/hackathon purposes. Use freely and modify as needed!

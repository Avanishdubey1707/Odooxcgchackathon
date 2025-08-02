import { Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";

import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";

import { Toaster } from "react-hot-toast";

import TicketForm from "./components/Dashboard/TicketForm";
import TicketList from "./components/Dashboard/TicketList";
import AgentTicketPanel from "./components/Agent/AgentTicketPanel";

import Navbar from "./components/Common/Navbar";
import LandingPage from "./components/LandingPage";
import UserLanding from "./components/Landing/UserLanding";
import AgentLanding from "./components/Landing/AgentLanding";
import AdminLanding from "./components/Landing/AdminLanding";
import Profile from "./components/Common/Profile"; 

const ProtectedRoute = ({ element, roles }) => {
  const { currentUser, userRole } = useAuth();

  if (!currentUser) return <Navigate to="/login" replace />;
  if (roles && !roles.includes(userRole)) return <Navigate to="/" replace />;

  return element;
};

const DynamicLanding = () => {
  const { currentUser, userRole } = useAuth();

  if (!currentUser) return <LandingPage />;
  if (userRole === "user") return <UserLanding />;
  if (userRole === "agent") return <AgentLanding />;
  if (userRole === "admin") return <AdminLanding />;

  return <LandingPage />;
};

function App() {
  return (
    <AuthProvider>
      <Navbar />

      <Routes>
        {/* Public */}
        <Route path="/" element={<DynamicLanding />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route
          path="/create"
          element={<ProtectedRoute element={<TicketForm />} roles={["user"]} />}
        />
        <Route
          path="/dashboard"
          element={<ProtectedRoute element={<TicketList />} roles={["user", "agent", "admin"]} />}
        />
        <Route
          path="/agent-panel"
          element={<ProtectedRoute element={<AgentTicketPanel />} roles={["agent"]} />}
        />
        <Route
          path="/profile"
          element={<ProtectedRoute element={<Profile />} roles={["user", "agent", "admin"]} />}
        />
      </Routes>
    </AuthProvider>
  );
}

export default App;
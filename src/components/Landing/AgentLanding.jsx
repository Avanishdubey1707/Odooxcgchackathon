import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import UserProfileGreeting from "../Common/UserProfileGreeting";
import { ClipboardList, TicketCheck, UserCog } from "lucide-react";

const AgentLanding = () => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6 }}
    className="min-h-screen bg-gradient-to-b from-green-50 to-white px-6 py-12 text-center"
  >
    <h1 className="text-4xl font-bold text-green-700 mb-4">Welcome, Agent 💼</h1>
    <UserProfileGreeting />
    <p className="text-gray-600 text-lg mb-6 max-w-2xl mx-auto">
      You're empowered to assist users by resolving tickets, providing timely responses, and managing the support queue efficiently.
    </p>

    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-5xl mx-auto mt-10">
      <div className="bg-white shadow-lg rounded-2xl p-6 text-left border border-green-100 hover:shadow-xl">
        <TicketCheck className="h-10 w-10 text-green-600 mb-3" />
        <h3 className="text-xl font-semibold text-green-700 mb-2">Manage Tickets</h3>
        <p className="text-sm text-gray-600 mb-4">Access and respond to support tickets. Change statuses and guide users effectively.</p>
        <Link
          to="/agent-panel"
          className="inline-block bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Go to Panel
        </Link>
      </div>

      <div className="bg-white shadow-lg rounded-2xl p-6 text-left border border-green-100 hover:shadow-xl">
        <ClipboardList className="h-10 w-10 text-green-600 mb-3" />
        <h3 className="text-xl font-semibold text-green-700 mb-2">Ticket Dashboard</h3>
        <p className="text-sm text-gray-600 mb-4">View all tickets across the platform to prioritize and assign tasks more efficiently.</p>
        <Link
          to="/dashboard"
          className="inline-block bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          View Tickets
        </Link>
      </div>

      <div className="bg-white shadow-lg rounded-2xl p-6 text-left border border-green-100 hover:shadow-xl">
        <UserCog className="h-10 w-10 text-green-600 mb-3" />
        <h3 className="text-xl font-semibold text-green-700 mb-2">My Profile</h3>
        <p className="text-sm text-gray-600 mb-4">Update your details or review your profile information and role-based access.</p>
        <Link
          to="/profile"
          className="inline-block bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          View Profile
        </Link>
      </div>
    </div>
  </motion.div>
);

export default AgentLanding;

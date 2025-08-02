import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import UserProfileGreeting from "../Common/UserProfileGreeting";

const UserLanding = () => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6 }}
    className="min-h-screen bg-gradient-to-br from-blue-50 to-white px-6 py-12 text-center"
  >
    <h1 className="text-4xl font-bold text-blue-700 mb-4">Welcome, End User 👤</h1>
    <UserProfileGreeting />
    <p className="text-gray-600 text-lg mb-6 max-w-xl mx-auto">
      You can raise new support tickets, attach files, and check updates or responses from agents on your issues.
    </p>
    <div className="flex justify-center gap-6 mt-6 flex-wrap">
      <Link
        to="/create"
        className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 shadow"
      >
        Create New Ticket
      </Link>
      <Link
        to="/dashboard"
        className="border border-blue-600 text-blue-700 px-6 py-3 rounded-lg hover:bg-blue-50 shadow"
      >
        View My Tickets
      </Link>
    </div>
  </motion.div>
);

export default UserLanding;

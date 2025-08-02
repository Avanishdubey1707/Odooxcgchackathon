import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import UserProfileGreeting from "../Common/UserProfileGreeting";

const AdminLanding = () => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6 }}
    className="min-h-screen bg-gradient-to-br from-purple-50 to-white px-6 py-12 text-center"
  >
    <h1 className="text-4xl font-bold text-purple-700 mb-4">Welcome, Admin 🛠️</h1>
    <UserProfileGreeting />
    <p className="text-gray-600 text-lg mb-6 max-w-xl mx-auto">
      You have full control over the help desk system. Manage categories, users, and monitor ticket flow efficiently.
    </p>
    <div className="flex justify-center gap-6 mt-6 flex-wrap">
      <Link
        to="/dashboard"
        className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 shadow"
      >
        View All Tickets
      </Link>
      <Link
        to="/manage-users"
        className="border border-purple-600 text-purple-700 px-6 py-3 rounded-lg hover:bg-purple-50 shadow"
      >
        Manage Users
      </Link>
      <Link
        to="/manage-categories"
        className="border border-purple-600 text-purple-700 px-6 py-3 rounded-lg hover:bg-purple-50 shadow"
      >
        Manage Categories
      </Link>
    </div>
  </motion.div>
);

export default AdminLanding;

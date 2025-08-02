import { useAuth } from "../../context/AuthContext";
import { motion } from "framer-motion";

const Profile = () => {
  const { currentUser, userRole } = useAuth();

  const roleDescription = {
    user: "You are a user with the ability to raise support tickets and view their progress.",
    agent: "You are an agent with the ability to manage, reply to, and resolve user tickets.",
    admin: "You are an admin with full access to oversee tickets, agents, and system-level settings."
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gradient-to-b from-slate-50 to-white flex items-center justify-center px-4"
    >
      <div className="bg-white shadow-xl rounded-2xl p-8 max-w-lg w-full text-center border border-gray-200">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">{userRole?.toUpperCase()} Profile</h2>
        <p className="text-gray-600 mb-6">{roleDescription[userRole]}</p>

        <div className="space-y-3 text-left text-gray-700">
          <p><span className="font-semibold">Email:</span> {currentUser?.email}</p>
          <p><span className="font-semibold">User ID:</span> {currentUser?.uid}</p>
          <p><span className="font-semibold">Role:</span> {userRole}</p>
        </div>

        <div className="mt-6">
          <button className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition duration-200">
            Update Profile (Coming Soon)
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default Profile;

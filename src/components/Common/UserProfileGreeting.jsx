import { useAuth } from "../../context/AuthContext";
import { motion } from "framer-motion";

const UserProfileGreeting = () => {
  const { currentUser, userRole } = useAuth();
  const firstName = currentUser?.displayName || currentUser?.email?.split("@")[0];

  return (
    <motion.div
      className="text-center py-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <h2 className="text-2xl font-semibold text-gray-700">
        Hello, <span className="text-blue-600">{firstName}</span> 👋
      </h2>
      <p className="text-sm text-gray-500">Role: {userRole}</p>
    </motion.div>
  );
};

export default UserProfileGreeting;

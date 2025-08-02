import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import UserProfileGreeting from "../Common/UserProfileGreeting";

const AgentLanding = () => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="min-h-screen bg-gradient-to-br from-green-50 to-white px-6 py-12 text-center"
    >
        <h1 className="text-4xl font-bold text-green-700 mb-4">Welcome, Support Agent 🎧</h1>
        <UserProfileGreeting />
        <p className="text-gray-600 text-lg mb-6 max-w-xl mx-auto">
            You can view, manage, and respond to support tickets. Keep the resolution process smooth and efficient.
        </p>
        <div className="flex justify-center gap-6 mt-6 flex-wrap">
            <Link
                to="/dashboard"
                className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 shadow"
            >
                View Tickets
            </Link>
            <Link to="/agent-panel" className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 shadow">
                Manage Tickets
            </Link>

        </div>
    </motion.div>
);

export default AgentLanding;
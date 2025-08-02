import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import LogoutButton from "./LogoutButton";

const Navbar = () => {
  const { currentUser, userRole } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const NavLinks = () => (
    <>
      <Link to="/" className="hover:text-blue-600">Home</Link>

      {currentUser && userRole === "user" && (
        <>
          <Link to="/create" className="hover:text-blue-600">Create Ticket</Link>
          <Link to="/dashboard" className="hover:text-blue-600">My Tickets</Link>
        </>
      )}

      {currentUser && userRole === "agent" && (
        <>
          <Link to="/dashboard" className="hover:text-green-600">All Tickets</Link>
          <Link to="/agent-panel" className="hover:text-green-600">Manage Tickets</Link>
        </>
      )}

      {currentUser && userRole === "admin" && (
        <>
          <Link to="/dashboard" className="hover:text-purple-600">Ticket Dashboard</Link>
          <Link to="/admin-panel" className="hover:text-purple-600">Admin Panel</Link>
        </>
      )}

      {currentUser && (
        <Link to="/profile" className="hover:text-blue-500">Profile</Link>
      )}

      {!currentUser ? (
        <>
          <Link
            to="/login"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Login
          </Link>
          <Link
            to="/register"
            className="border border-blue-600 text-blue-600 px-4 py-2 rounded hover:bg-blue-50"
          >
            Register
          </Link>
        </>
      ) : (
        <LogoutButton />
      )}
    </>
  );

  return (
    <motion.nav
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="bg-white shadow-md py-4 px-6 sticky top-0 z-50"
    >
      <div className="flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-blue-700">
          QuickDesk
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex gap-4 items-center text-sm font-medium">
          <NavLinks />
        </div>

        {/* Mobile menu toggle */}
        <div className="md:hidden">
          <button onClick={toggleMenu}>
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile dropdown menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden mt-4 flex flex-col gap-3 text-sm font-medium"
          >
            <NavLinks />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;

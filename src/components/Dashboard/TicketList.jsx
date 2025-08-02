import { useEffect, useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../Authentication/firebase";
import { useAuth } from "../../context/AuthContext";
import TicketCard from "./TicketCard";
import { motion } from "framer-motion";

const TicketList = () => {
  const { currentUser, userRole } = useAuth();
  const [tickets, setTickets] = useState([]);
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        let q = collection(db, "tickets");
        if (userRole === "user") {
          q = query(q, where("createdBy", "==", currentUser.uid));
        }

        const querySnapshot = await getDocs(q);
        const list = [];
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          if (filter === "All" || data.status === filter) {
            list.push({ id: doc.id, ...data });
          }
        });

        setTickets(list);
      } catch (err) {
        console.error(err);
      }
    };

    if (currentUser) fetchTickets();
  }, [filter, currentUser, userRole]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gradient-to-b from-blue-50 to-white p-6"
    >
      <div className="flex flex-col md:flex-row justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-blue-700">Tickets Overview</h2>
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="mt-4 md:mt-0 border border-blue-300 rounded px-4 py-2 text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          <option value="All">All</option>
          <option value="Open">Open</option>
          <option value="In Progress">In Progress</option>
          <option value="Resolved">Resolved</option>
          <option value="Closed">Closed</option>
        </select>
      </div>

      {tickets.length === 0 ? (
        <p className="text-gray-600">No tickets found for the selected filter.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tickets.map((ticket) => (
            <TicketCard key={ticket.id} ticket={ticket} />
          ))}
        </div>
      )}
    </motion.div>
  );
};

export default TicketList;

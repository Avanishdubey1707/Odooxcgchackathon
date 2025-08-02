import { useEffect, useState } from "react";
import { collection, getDocs, updateDoc, doc } from "firebase/firestore";
import { db } from "../../Authentication/firebase";
import { useAuth } from "../../context/AuthContext";
import { motion } from "framer-motion";
import toast from "react-hot-toast";

const AgentTicketPanel = () => {
  const { userRole } = useAuth();
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [replies, setReplies] = useState({});

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "tickets"));
        const data = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setTickets(data);
      } catch (err) {
        toast.error("Failed to load tickets");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (userRole === "agent") fetchTickets();
  }, [userRole]);

  const handleUpdateStatus = async (ticketId, status, reply) => {
    try {
      const ticketRef = doc(db, "tickets", ticketId);
      await updateDoc(ticketRef, { status, agentReply: reply });
      toast.success(`Ticket marked as ${status}`);
    } catch (err) {
      toast.error("Failed to update ticket status");
      console.error(err);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="p-6 min-h-screen bg-gradient-to-br from-green-50 to-white"
    >
      <h2 className="text-3xl font-bold text-green-700 mb-6">Agent Ticket Panel</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="space-y-6">
          {tickets.map((ticket) => (
            <div key={ticket.id} className="border rounded-lg shadow p-4 bg-white">
              <h3 className="text-lg font-semibold text-green-800">{ticket.subject}</h3>
              <p className="text-sm text-gray-600">{ticket.description}</p>
              <p className="text-sm mt-2">Status: <span className="font-medium">{ticket.status}</span></p>
              <p className="text-sm mt-1">Category: {ticket.category}</p>
              <textarea
                placeholder="Write your reply here..."
                className="w-full mt-4 border rounded p-2"
                rows={3}
                value={replies[ticket.id] || ""}
                onChange={(e) =>
                  setReplies((prev) => ({ ...prev, [ticket.id]: e.target.value }))
                }
              ></textarea>
              <div className="mt-3 flex gap-4">
                <button
                  onClick={() => handleUpdateStatus(ticket.id, "In Progress", replies[ticket.id] || "")}
                  className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                >
                  Mark In Progress
                </button>
                <button
                  onClick={() => handleUpdateStatus(ticket.id, "Resolved", replies[ticket.id] || "")}
                  className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                >
                  Mark Resolved
                </button>
              </div>
              {ticket.agentReply && (
                <p className="mt-2 text-sm text-blue-700">Agent Reply: {ticket.agentReply}</p>
              )}
            </div>
          ))}
        </div>
      )}
    </motion.div>
  );
};

export default AgentTicketPanel;
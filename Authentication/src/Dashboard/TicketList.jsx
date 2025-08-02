import { useEffect, useState } from "react";
import { collection, getDocs, query, where, orderBy } from "firebase/firestore";
import { db } from "../../Authentication/firebase";
import { useAuth } from "../../context/AuthContext";
import TicketCard from "./TicketCard";

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
    <div className="p-6">
      <div className="flex justify-between mb-4 items-center">
        <h2 className="text-2xl font-bold">Tickets</h2>
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="border px-2 py-1 rounded"
        >
          <option value="All">All</option>
          <option value="Open">Open</option>
          <option value="In Progress">In Progress</option>
          <option value="Resolved">Resolved</option>
          <option value="Closed">Closed</option>
        </select>
      </div>

      {tickets.length === 0 ? (
        <p>No tickets found.</p>
      ) : (
        <div className="grid gap-4">
          {tickets.map((ticket) => (
            <TicketCard key={ticket.id} ticket={ticket} />
          ))}
        </div>
      )}
    </div>
  );
};

export default TicketList;
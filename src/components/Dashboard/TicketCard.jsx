import { motion } from "framer-motion";

const TicketCard = ({ ticket }) => {
  const statusColors = {
    Open: "bg-yellow-100 text-yellow-800",
    "In Progress": "bg-blue-100 text-blue-800",
    Resolved: "bg-green-100 text-green-800",
    Closed: "bg-gray-200 text-gray-700",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="p-5 border rounded-lg shadow bg-white hover:shadow-md transition duration-300"
    >
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-xl font-semibold text-blue-800">{ticket.subject}</h3>
        <span className={`text-xs font-semibold px-3 py-1 rounded-full ${statusColors[ticket.status]}`}>
          {ticket.status}
        </span>
      </div>
      <p className="text-sm text-gray-700 mb-3 line-clamp-3">{ticket.description}</p>
      <p className="text-sm text-gray-500 mb-2">Category: <span className="font-medium">{ticket.category}</span></p>
      {ticket.attachmentUrl && (
        <a
          href={ticket.attachmentUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 text-sm underline"
        >
          View Attachment
        </a>
      )}
      <div className="mt-4">
        <div className="flex items-center justify-between text-sm text-gray-600">
          <p>Status Flow:</p>
          <div className="flex space-x-2">
            {["Open", "In Progress", "Resolved", "Closed"].map((step) => (
              <div
                key={step}
                className={`w-3 h-3 rounded-full ${
                  step === ticket.status
                    ? "bg-blue-600 scale-125"
                    : step === "Open"
                    ? "bg-yellow-400"
                    : step === "In Progress"
                    ? "bg-blue-300"
                    : step === "Resolved"
                    ? "bg-green-400"
                    : "bg-gray-400"
                }`}
              ></div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default TicketCard;

const TicketCard = ({ ticket }) => {
  return (
    <div className="border rounded-lg p-4 bg-white shadow-sm">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-xl font-semibold">{ticket.subject}</h3>
        <span
          className={`text-sm px-2 py-1 rounded-full ${
            ticket.status === "Open"
              ? "bg-yellow-100 text-yellow-800"
              : ticket.status === "In Progress"
              ? "bg-blue-100 text-blue-800"
              : ticket.status === "Resolved"
              ? "bg-green-100 text-green-800"
              : "bg-gray-200 text-gray-700"
          }`}
        >
          {ticket.status}
        </span>
      </div>

      <p className="text-gray-700 mb-2">{ticket.description}</p>

      <p className="text-sm text-gray-500 mb-2">
        Category: <span className="font-medium">{ticket.category}</span>
      </p>

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
    </div>
  );
};

export default TicketCard;
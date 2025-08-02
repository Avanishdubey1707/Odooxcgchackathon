import { useState } from "react";
import { db, storage } from "../../Authentication/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { v4 as uuid } from "uuid";

const TicketForm = () => {
  const { currentUser } = useAuth();
  const [ticket, setTicket] = useState({
    subject: "",
    description: "",
    category: "General",
    attachment: null,
  });

  const navigate = useNavigate();
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setTicket((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      let attachmentUrl = null;
      if (ticket.attachment) {
        const fileRef = ref(storage, attachments/${uuid()}-${ticket.attachment.name});
        await uploadBytes(fileRef, ticket.attachment);
        attachmentUrl = await getDownloadURL(fileRef);
      }

      await addDoc(collection(db, "tickets"), {
        subject: ticket.subject,
        description: ticket.description,
        category: ticket.category,
        attachmentUrl,
        createdBy: currentUser.uid,
        createdAt: serverTimestamp(),
        status: "Open",
      });

      navigate("/");
    } catch (err) {
      console.error(err);
      setError("Failed to submit ticket. Try again.");
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-10 bg-white shadow-md rounded p-6">
      <h2 className="text-2xl font-bold mb-4">Create Support Ticket</h2>
      {error && <p className="text-red-500">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="subject"
          type="text"
          placeholder="Subject"
          required
          className="w-full px-4 py-2 border rounded"
          onChange={handleChange}
        />

        <textarea
          name="description"
          placeholder="Describe the issue..."
          required
          className="w-full px-4 py-2 border rounded"
          rows={4}
          onChange={handleChange}
        />

        <select
          name="category"
          className="w-full px-4 py-2 border rounded"
          onChange={handleChange}
        >
          <option value="General">General</option>
          <option value="Login Issue">Login Issue</option>
          <option value="Payment">Payment</option>
          <option value="Technical">Technical</option>
        </select>

        <input
          type="file"
          name="attachment"
          accept="image/*,application/pdf"
          className="w-full"
          onChange={handleChange}
        />

        <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          Submit Ticket
        </button>
      </form>
    </div>
  );
};

export default TicketForm;
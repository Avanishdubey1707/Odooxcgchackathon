import { useState } from "react";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { db, storage } from "../../Authentication/firebase";
import { useAuth } from "../../context/AuthContext";
import { motion } from "framer-motion";
import toast from "react-hot-toast";

const TicketForm = () => {
  const { currentUser } = useAuth();
  const [subject, setSubject] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("General");
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      let attachmentUrl = "";

      if (file) {
        const fileRef = ref(storage, `attachments/${Date.now()}-${file.name}`);
        await uploadBytes(fileRef, file);
        attachmentUrl = await getDownloadURL(fileRef);
      }

      await addDoc(collection(db, "tickets"), {
        subject,
        description,
        category,
        attachmentUrl,
        status: "Open",
        createdBy: currentUser.uid,
        createdAt: serverTimestamp(),
      });

      setSubject("");
      setDescription("");
      setCategory("General");
      setFile(null);
      toast.success("Ticket submitted successfully!");
    } catch (err) {
      console.error(err);
      toast.error("Failed to submit ticket.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gradient-to-br from-blue-50 to-white p-6 flex items-center justify-center"
    >
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-xl bg-white shadow-md rounded-xl p-8 space-y-6"
      >
        <h2 className="text-3xl font-bold text-blue-700 text-center">Create a Support Ticket</h2>

        <div>
          <label className="block mb-1 font-semibold text-blue-900">Subject</label>
          <input
            type="text"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            required
            className="w-full px-4 py-2 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="E.g. Unable to login"
          />
        </div>

        <div>
          <label className="block mb-1 font-semibold text-blue-900">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            rows={4}
            className="w-full px-4 py-2 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Explain the issue you're facing in detail..."
          ></textarea>
        </div>

        <div>
          <label className="block mb-1 font-semibold text-blue-900">Category</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full px-4 py-2 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option>General</option>
            <option>Technical</option>
            <option>Billing</option>
            <option>Login Issue</option>
            <option>Other</option>
          </select>
        </div>

        <div>
          <label className="block mb-1 font-semibold text-blue-900">Attachment (optional)</label>
          <input
            type="file"
            onChange={(e) => setFile(e.target.files[0])}
            className="w-full text-sm text-gray-500"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition duration-200 disabled:opacity-50"
        >
          {loading ? "Submitting..." : "Submit Ticket"}
        </button>
      </form>
    </motion.div>
  );
};

export default TicketForm;
import { Link } from "react-router-dom";

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white text-center">
      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center py-20 px-6">
        <h1 className="text-5xl font-extrabold text-blue-700 mb-4">Welcome to QuickDesk</h1>
        <p className="text-gray-700 text-lg max-w-2xl mb-6">
          A powerful and easy-to-use help desk solution designed to streamline ticket management and improve support efficiency.
        </p>
        <div className="flex gap-4 mb-10">
          <Link to="/register" className="bg-blue-600 text-white px-6 py-3 rounded-lg text-lg hover:bg-blue-700">
            Get Started
          </Link>
          <Link to="/login" className="border border-blue-600 text-blue-600 px-6 py-3 rounded-lg text-lg hover:bg-blue-50">
            Login
          </Link>
        </div>
        <img src="https://illustrations.popsy.co/gray/work-from-home.svg" alt="Help desk" className="w-96" />
      </section>

      {/* Features Section */}
      <section className="py-20 px-8 bg-white">
        <h2 className="text-4xl font-bold text-blue-800 mb-12">Why Choose QuickDesk?</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 max-w-6xl mx-auto">
          {[
            {
              title: "Easy Ticket Creation",
              desc: "Create tickets with attachments and track their progress in real-time.",
              icon: "📨",
            },
            {
              title: "Role-Based Access",
              desc: "End users, agents, and admins each get tailored permissions and views.",
              icon: "🛡️",
            },
            {
              title: "Live Updates",
              desc: "Get notified with real-time ticket status and communication threads.",
              icon: "🔔",
            },
            {
              title: "Fast and Responsive UI",
              desc: "Clean design with mobile-friendly responsiveness built using Tailwind CSS.",
              icon: "⚡",
            },
            {
              title: "Secure and Scalable",
              desc: "Backed by Firebase's security and designed to grow with your needs.",
              icon: "🔒",
            },
            {
              title: "Smart Dashboard",
              desc: "Easily filter, sort, and manage tickets with just a few clicks.",
              icon: "📊",
            },
          ].map((feature, idx) => (
            <div key={idx} className="bg-blue-50 rounded-xl p-6 text-left shadow hover:shadow-md transition duration-300">
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-bold text-blue-700 mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 px-6 bg-gradient-to-r from-blue-600 to-blue-500 text-white text-center">
        <h2 className="text-4xl font-bold mb-4">Ready to Simplify Your Support?</h2>
        <p className="text-lg mb-8 max-w-2xl mx-auto">
          Join teams already improving their customer and internal support with QuickDesk.
        </p>
        <Link to="/register" className="bg-white text-blue-700 px-8 py-3 rounded-lg text-lg font-semibold hover:bg-blue-100">
          Create Your Free Account
        </Link>
      </section>

      {/* Footer */}
      <footer className="py-6 text-center text-gray-500 text-sm bg-white">
        © {new Date().getFullYear()} QuickDesk. All rights reserved.
      </footer>
    </div>
  );
};

export default LandingPage;

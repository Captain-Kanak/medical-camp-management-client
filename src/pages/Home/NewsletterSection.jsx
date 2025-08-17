import React, { useState } from "react";
import Swal from "sweetalert2";

const NewsletterSection = () => {
  const [email, setEmail] = useState("");

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email) {
      Swal.fire("Error", "Please enter your email.", "error");
      return;
    }
    Swal.fire("Subscribed!", "You have successfully subscribed.", "success");
    setEmail("");
  };

  return (
    <section className="my-16 bg-gradient-to-r from-blue-500 to-indigo-500 py-16 px-4 rounded-xl shadow-xl max-w-7xl mx-auto transition-all hover:shadow-2xl">
      <div className="text-center text-white max-w-2xl mx-auto">
        <h2 className="text-3xl lg:text-4xl font-extrabold mb-4">
          Subscribe to Our Newsletter
        </h2>
        <p className="mb-8 text-lg">
          Get the latest updates about upcoming medical camps, health tips, and
          more.
        </p>

        <form
          onSubmit={handleSubscribe}
          className="flex flex-col sm:flex-row items-center justify-center gap-2"
        >
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full sm:w-auto flex-1 px-4 py-3 rounded-lg text-gray-900 border-2 border-white focus:border-white focus:outline-none transition"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button
            type="submit"
            className="px-6 py-3 rounded-lg bg-white text-indigo-500 font-semibold hover:bg-gray-100 transition-all duration-300 cursor-pointer"
          >
            Subscribe
          </button>
        </form>
      </div>
    </section>
  );
};

export default NewsletterSection;

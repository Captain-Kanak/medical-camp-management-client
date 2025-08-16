import React from "react";
import toast from "react-hot-toast";
import useAxiosPublic from "../../hooks/useAxiosPublic";

const Contact = () => {
  const axiosPublic = useAxiosPublic();

  const handleMessageSubmit = async (e) => {
    e.preventDefault();

    const form = e.target;
    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const message = form.message.value.trim();

    const messageInfo = { name, email, message };

    try {
      const res = await axiosPublic.post("/messages", messageInfo);
      if (res.data.insertedId) {
        toast.success("Message sent successfully!");
        form.reset();
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to send message. Try again later.");
    }
  };

  return (
    <div className="pt-8 lg:pt-16 pb-16 lg:pb-24 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      {/* Page Header */}
      <section className="max-w-7xl mx-auto px-4 lg:px-0 text-center mb-16">
        <h1 className="text-3xl lg:text-4xl font-extrabold mb-4">Contact Us</h1>
        <p className="text-lg lg:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
          Have questions or need assistance? Reach out to us and we’ll get back
          to you promptly.
        </p>
      </section>

      {/* Contact Info */}
      <section className="max-w-7xl mx-auto px-4 lg:px-0 mb-16 grid md:grid-cols-3 gap-8 text-center">
        <div className="p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-md hover:shadow-xl transition-transform transform hover:-translate-y-1">
          <h4 className="font-bold text-xl text-blue-500 mb-2">Address</h4>
          <p className="text-gray-700 dark:text-gray-300">
            123 Health Street, MediCity, Country
          </p>
        </div>
        <div className="p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-md hover:shadow-xl transition-transform transform hover:-translate-y-1">
          <h4 className="font-bold text-xl text-indigo-600 mb-2">Phone</h4>
          <p className="text-gray-700 dark:text-gray-300">+123 456 7890</p>
        </div>
        <div className="p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-md hover:shadow-xl transition-transform transform hover:-translate-y-1">
          <h4 className="font-bold text-xl text-blue-500 mb-2">Email</h4>
          <p className="text-gray-700 dark:text-gray-300">info@medicamp.com</p>
        </div>
      </section>

      {/* Contact Form */}
      <section className="max-w-3xl mx-auto px-4 lg:px-0">
        <form
          onSubmit={handleMessageSubmit}
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-8 space-y-6"
        >
          <div>
            <label className="block mb-2 font-medium">Name</label>
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-indigo-600"
              required
            />
          </div>
          <div>
            <label className="block mb-2 font-medium">Email</label>
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-indigo-600"
              required
            />
          </div>
          <div>
            <label className="block mb-2 font-medium">Message</label>
            <textarea
              rows={5}
              name="message"
              placeholder="Your Message"
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-indigo-600"
              required
            ></textarea>
          </div>
          <button
            type="submit"
            className="px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold rounded-lg shadow-md hover:scale-105 transition-transform duration-300 cursor-pointer"
          >
            Send Message
          </button>
        </form>
      </section>
    </div>
  );
};

export default Contact;

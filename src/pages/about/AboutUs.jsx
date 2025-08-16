import React from "react";
import {
  FaHeartbeat,
  FaStethoscope,
  FaHandsHelping,
  FaHospital,
} from "react-icons/fa";
import { Link } from "react-router";

const AboutUs = () => {
  const features = [
    {
      icon: <FaHeartbeat className="text-blue-500 text-3xl" />,
      title: "Comprehensive Health Checkups",
      desc: "We provide complete health screenings for all age groups, ensuring early detection and prevention.",
    },
    {
      icon: <FaStethoscope className="text-indigo-600 text-3xl" />,
      title: "Expert Doctors & Staff",
      desc: "Our team of certified healthcare professionals delivers top-quality medical care during every camp.",
    },
    {
      icon: <FaHandsHelping className="text-blue-500 text-3xl" />,
      title: "Community Support",
      desc: "We collaborate with local organizations to bring healthcare to underserved communities effectively.",
    },
    {
      icon: <FaHospital className="text-indigo-600 text-3xl" />,
      title: "Modern Facilities",
      desc: "Our camps are equipped with the latest medical equipment to provide accurate diagnosis and treatment.",
    },
  ];

  return (
    <div className="pt-8 lg:pt-16 pb-16 lg:pb-24 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      {/* Page Header */}
      <section className="max-w-7xl mx-auto px-4 lg:px-0 text-center mb-16">
        <h1 className="text-3xl lg:text-4xl font-extrabold mb-4">
          About MediCamp
        </h1>
        <p className="text-lg lg:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
          MediCamp is dedicated to providing accessible, high-quality healthcare
          to communities across the country. Through efficient medical camp
          management, we ensure that patients receive the care they deserve,
          wherever they are.
        </p>
      </section>

      {/* Features / Why Choose Us */}
      <section className="max-w-7xl mx-auto px-4 lg:px-0 mb-20">
        <h2 className="text-2xl lg:text-3xl font-bold text-center mb-12">
          Why Choose MediCamp?
        </h2>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, i) => (
            <div
              key={i}
              className="relative rounded-2xl p-[2px] bg-gradient-to-r from-blue-500 to-indigo-600 shadow-lg hover:shadow-2xl transition-transform transform hover:-translate-y-1"
            >
              <div className="bg-white dark:bg-gray-800 rounded-2xl h-full p-6 text-center">
                <div className="w-16 h-16 mx-auto flex items-center justify-center bg-blue-50 dark:bg-indigo-900 rounded-full mb-4 shadow-md">
                  {feature.icon}
                </div>
                <h4 className="font-bold text-xl text-indigo-600 dark:text-blue-400 mb-2">
                  {feature.title}
                </h4>
                <p className="text-gray-600 dark:text-gray-300">
                  {feature.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="max-w-5xl mx-auto px-4 lg:px-0 text-center mb-20">
        <h2 className="text-2xl lg:text-3xl font-bold mb-8">
          Our Mission & Vision
        </h2>
        <div className="space-y-6 text-lg lg:text-xl text-gray-700 dark:text-gray-300">
          <p>
            <span className="font-semibold text-blue-500">Mission:</span> To
            organize efficient, accessible medical camps that provide
            high-quality healthcare to communities in need, empowering
            individuals and families to lead healthier lives.
          </p>
          <p>
            <span className="font-semibold text-indigo-600">Vision:</span> A
            world where every community has access to essential healthcare
            services, fostering well-being, prevention, and long-term health
            outcomes for all.
          </p>
        </div>
      </section>

      {/* Call-to-Action */}
      <section className="max-w-7xl mx-auto px-4 lg:px-0 text-center">
        <h2 className="text-2xl lg:text-3xl font-bold mb-6">
          Join Our Mission
        </h2>
        <p className="mb-8 text-gray-600 dark:text-gray-300">
          Become a part of MediCamp today — whether as a volunteer, healthcare
          professional, or supporter, your contribution makes a difference.
        </p>
        <Link
          to="/signin"
          className="inline-block px-8 py-3 font-semibold text-white bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg shadow-lg hover:scale-105 transition-transform duration-300"
        >
          Join Us
        </Link>
      </section>
    </div>
  );
};

export default AboutUs;

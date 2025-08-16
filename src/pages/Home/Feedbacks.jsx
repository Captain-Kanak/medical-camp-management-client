import React from "react";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import Spinner from "../../components/Spinner";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { FaQuoteLeft } from "react-icons/fa";

const Feedbacks = () => {
  const axiosPublic = useAxiosPublic();

  const { data: feedbacks = [], isLoading } = useQuery({
    queryKey: ["feedbacks"],
    queryFn: async () => {
      const res = await axiosPublic.get("/feedbacks");
      return res.data;
    },
  });

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <section className="pt-8 lg:pt-16 pb-16 lg:pb-24 max-w-7xl mx-auto px-4 lg:px-0">
      {/* Section Heading */}
      <div className="text-center mb-12">
        <h2 className="text-3xl lg:text-4xl font-extrabold">Feedbacks</h2>
        <p className="mt-3 text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Hear directly from our participants! Their experiences and
          testimonials highlight the impact of our medical camps and the quality
          of care provided by our trusted healthcare professionals.
        </p>
      </div>

      {/* Feedback Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {feedbacks.map((s, i) => (
          <motion.div
            key={i}
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 200 }}
            className="relative rounded-xl p-[2px] bg-gradient-to-r from-blue-500 to-indigo-600 shadow-lg"
          >
            <div className="bg-white rounded-xl h-full p-6 flex flex-col justify-between">
              {/* Quote Icon */}
              <FaQuoteLeft className="text-blue-500 text-2xl opacity-70 mb-3" />

              {/* Feedback Text */}
              <p className="italic text-gray-700 mb-4">“{s.feedback}”</p>

              {/* Author */}
              <p className="text-right text-sm font-semibold text-indigo-600">
                — {s.name}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Feedbacks;

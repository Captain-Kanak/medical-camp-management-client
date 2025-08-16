import React from "react";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import Spinner from "../../components/Spinner";

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
    <section className="pt-8 lg:pt-16 max-w-7xl mx-auto px-4 lg:px-0">
      {/* Section Heading */}
      <div className="text-center mb-10">
        <h2 className="text-3xl lg:text-4xl font-extrabold">Feedbacks</h2>
        <p className="mt-3 text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Hear directly from our participants! Their experiences and
          testimonials highlight the impact of our medical camps and the quality
          of care provided by our trusted healthcare professionals.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {feedbacks.map((s, i) => (
          <div
            key={i}
            data-aos-anchor-placement="top-center"
            className="bg-white rounded-xl shadow p-6 border-l-4 border-green-500"
          >
            <p className="italic text-gray-700 mb-4">“{s.feedback}”</p>
            <p className="text-right text-sm font-semibold text-green-700">
              — {s.name}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Feedbacks;

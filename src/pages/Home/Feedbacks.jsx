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
    <section className="max-w-6xl mx-auto px-4 py-10">
      <h2 className="text-2xl font-bold mb-8 text-center text-primary">
        Feedbacks
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {feedbacks.map((s, i) => (
          <div
            key={i}
            data-aos="fade-left"
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

import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useParams } from "react-router";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import Spinner from "../../components/Spinner";

const CampDetails = () => {
  const { campId } = useParams();
  const axiosPublic = useAxiosPublic();

  const {
    data: camp = {},
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["camp", campId],
    enabled: !!campId,
    queryFn: async () => {
      const res = await axiosPublic.get(`/camp-details/${campId}`);
      return res.data;
    },
  });

  if (isLoading) return <Spinner />;
  if (isError)
    return (
      <p className="text-center text-red-500 py-10">
        Failed to load camp details.
      </p>
    );

  return (
    <div className="px-4 py-10 max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-center">{camp.campName}</h2>

      <div className="flex flex-col lg:flex-row gap-6 bg-base-200 p-6 rounded-lg shadow-md">
        {/* Image */}
        <div className="w-full lg:w-1/2">
          <img
            src={camp.image}
            alt={camp.campName}
            className="w-full h-64 object-cover rounded"
          />
        </div>

        {/* Info Section */}
        <div className="w-full lg:w-1/2 flex flex-col justify-between">
          <div className="space-y-2">
            <p>
              <strong>Location:</strong> {camp.location}
            </p>
            <p>
              <strong>Fees:</strong> ${camp.fees}
            </p>
            <p>
              <strong>Participants:</strong> {camp.participantCount}
            </p>
            <p>
              <strong>Date:</strong>{" "}
              {new Date(camp.datetime).toLocaleString("en-US", {
                dateStyle: "medium",
                timeStyle: "short",
              })}
            </p>
            <p>
              <strong>Healthcare Professional:</strong>{" "}
              {camp.healthcareProfessional}
            </p>
          </div>

          {/* Join Button */}
          <div className="mt-6">
            <button className="btn btn-primary w-full">Join Camp</button>
          </div>
        </div>
      </div>

      {/* Description */}
      <div className="mt-8 bg-base-200 p-6 rounded-lg">
        <h3 className="text-xl font-semibold mb-2">Camp Description</h3>
        <p className="leading-relaxed">{camp.description}</p>
      </div>
    </div>
  );
};

export default CampDetails;

import React from "react";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";

const ManageCamp = () => {
  const axiosPublic = useAxiosPublic();

  const { data: camps = [], refetch } = useQuery({
    queryKey: ["camps"],
    queryFn: async () => {
      const res = await axiosPublic.get("/camps");
      return res.data;
    },
  });

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won’t be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        const res = await axiosPublic.delete(`/delete-camp/${id}`);
        if (res.data.deletedCount > 0) {
          Swal.fire("Deleted!", "Camp has been deleted.", "success");
          refetch();
        }
      } catch (error) {
        Swal.fire("Error!", error.message, "error");
      }
    }
  };

  return (
    <div className="p-5">
      <h2 className="text-2xl font-bold mb-4">Manage Medical Camps</h2>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-base-200 border border-gray-200 shadow-md rounded-md">
          <thead>
            <tr className="text-left text-sm uppercase">
              <th className="px-4 py-2 border-b">#</th>
              <th className="px-4 py-2 border-b">Name</th>
              <th className="px-4 py-2 border-b">Date & Time</th>
              <th className="px-4 py-2 border-b">Location</th>
              <th className="px-4 py-2 border-b">Healthcare Professional</th>
              <th className="px-4 py-2 border-b text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {camps.map((camp, index) => (
              <tr key={camp._id} className="text-sm">
                <td className="px-4 py-2 border-b">{index + 1}</td>
                <td className="px-4 py-2 border-b">{camp.campName}</td>
                <td className="px-4 py-2 border-b">
                  {new Date(camp.datetime).toLocaleString("en-US", {
                    dateStyle: "medium",
                    timeStyle: "short",
                  })}
                </td>
                <td className="px-4 py-2 border-b">{camp.location}</td>
                <td className="px-4 py-2 border-b">
                  {camp.healthcareProfessional}
                </td>
                <td className="px-4 py-2 border-b text-center space-x-2 space-y-2">
                  <button
                    className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 cursor-pointer"
                    // onClick={() => handleEdit(camp._id)} // Implement edit handler later
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(camp._id)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 cursor-pointer"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {camps.length === 0 && (
              <tr>
                <td colSpan="6" className="text-center py-4 text-gray-500">
                  No camps found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageCamp;

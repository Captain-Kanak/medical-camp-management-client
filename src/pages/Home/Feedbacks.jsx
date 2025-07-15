import React from "react";

const stories = [
  {
    name: "Rahim Uddin",
    story:
      "Thanks to the free diabetes camp, I found out my sugar level was dangerously high. Now I’m under proper treatment.",
  },
  {
    name: "Fatema Khatun",
    story:
      "My son got his eye check-up for free. The camp helped us get affordable glasses too.",
  },
];

const Feedbacks = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <h2 className="text-2xl font-bold mb-6 text-center">Success Stories</h2>
      {stories.map((s, i) => (
        <div
          key={i}
          className="bg-white rounded-lg shadow p-5 mb-4 border-l-4 border-green-500"
        >
          <p className="italic text-gray-700">“{s.story}”</p>
          <p className="text-right text-sm mt-2 font-semibold text-green-700">
            — {s.name}
          </p>
        </div>
      ))}
    </div>
  );
};

export default Feedbacks;

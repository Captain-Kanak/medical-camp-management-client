import React from "react";

const UpcomingCamps = () => {
  const camps = [
    {
      _id: "1",
      campName: "Cardiac Health Awareness Camp",
      fees: "250",
      location: "Dhaka Medical College, Dhaka",
      healthcareProfessional: "Dr. Ayesha Rahman",
      description:
        "A community health camp focusing on heart disease prevention, early detection, and lifestyle management.",
      datetime: "2026-10-20T10:00:00",
      image: "https://i.ibb.co.com/9HP1Zxt2/cardiac-health.jpg",
    },
    {
      _id: "2",
      campName: "Free Eye Checkup Camp",
      fees: "0",
      location: "Chattogram Eye Hospital, Chattogram",
      healthcareProfessional: "Dr. Kamrul Hasan",
      description:
        "Get free eye checkups and consultations. Awareness sessions on eye care and common vision issues.",
      datetime: "2026-11-05T09:30:00",
      image: "https://i.ibb.co.com/fzMWW7Tj/unnamed.jpg",
    },
    {
      _id: "3",
      campName: "Diabetes Screening & Diet Camp",
      fees: "150",
      location: "Sylhet Diabetic Center, Sylhet",
      healthcareProfessional: "Dr. Nafisa Karim",
      description:
        "A special camp for diabetes screening, diet planning, and awareness about healthy lifestyle.",
      datetime: "2026-10-15T11:00:00",
      image:
        "https://i.ibb.co.com/Y7q3sSyr/promed-free-diabetes-camp-1-scaled.jpg",
    },
  ];

  return (
    <section className="pt-8 lg:pt-16">
      <div className="max-w-7xl mx-auto px-4 lg:px-0">
        {/* Section Title */}
        <div className="text-center mb-10">
          <h2 className="text-3xl lg:text-4xl font-extrabold mb-4">
            Upcoming Medical Camps
          </h2>
          <p className="mt-3 text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Stay updated with our upcoming medical camps across different
            cities. Register early to secure your spot and take advantage of
            free or affordable healthcare services.
          </p>
        </div>

        {/* Camp Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {camps.map((camp) => (
            <div
              key={camp._id}
              className="bg-white rounded-2xl shadow-md overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-indigo-200"
            >
              <img
                src={camp.image}
                alt={camp.campName}
                className="w-full h-52 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {camp.campName}
                </h3>
                <p className="text-sm text-gray-500 mb-3">📍 {camp.location}</p>
                <p className="text-gray-700 mb-3 line-clamp-2">
                  {camp.description}
                </p>

                <div className="flex items-center justify-between mb-3 text-sm">
                  <span className="text-indigo-600 font-semibold">
                    Fees: {camp.fees === "0" ? "Free" : `$${camp.fees}`}
                  </span>
                  <span className="text-gray-600">
                    {new Date(camp.datetime).toLocaleDateString()}{" "}
                    {new Date(camp.datetime).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                </div>

                <p className="text-sm text-gray-600 mb-4">
                  👨‍⚕️ {camp.healthcareProfessional}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default UpcomingCamps;

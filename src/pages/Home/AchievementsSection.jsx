import React from "react";

const AchievementsSection = () => {
  const achievements = [
    {
      _id: "1",
      title: "500+ Camps Organized",
      description:
        "Successfully organized over 500 medical camps across the country.",
      icon: "🏥",
    },
    {
      _id: "2",
      title: "10,000+ Patients Served",
      description:
        "Provided free or affordable healthcare to more than 10,000 patients.",
      icon: "👨‍⚕️",
    },
    {
      _id: "3",
      title: "200+ Volunteers",
      description: "Dedicated team of 200+ volunteers supporting our mission.",
      icon: "🤝",
    },
    {
      _id: "4",
      title: "100+ Health Workshops",
      description:
        "Conducted 100+ workshops on health awareness and preventive care.",
      icon: "📚",
    },
  ];

  return (
    <section className="pt-8 lg:pt-16 px-4 lg:px-0">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-3xl lg:text-4xl font-extrabold mb-4">
          Our Achievements
        </h2>
        <p className="mt-3 text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-8 lg:mb-12">
          We are proud of our journey and the impact we’ve created in the
          community.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {achievements.map((item) => (
            <div
              key={item._id}
              className="bg-blue-500 text-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition cursor-default"
            >
              <div className="text-4xl mb-4">{item.icon}</div>
              <h3 className="text-xl font-bold mb-2">{item.title}</h3>
              <p className="text-sm">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AchievementsSection;

import React from "react";

const OurHealthcareProfessionals = () => {
  const professionals = [
    {
      _id: "1",
      name: "Dr. Ayesha Rahman",
      role: "Cardiologist",
      image: "https://i.ibb.co.com/zWz08zbn/woman-2141808-1280.jpg",
      bio: "Expert in cardiovascular health with 10+ years of experience in patient care and preventive cardiology.",
    },
    {
      _id: "2",
      name: "Dr. Kamrul Hasan",
      role: "Ophthalmologist",
      image: "https://i.ibb.co.com/ks3WPL2R/doctor-1-20241202115005.webp",
      bio: "Specializes in eye care, cataract surgery, and vision improvement. Passionate about community health awareness.",
    },
    {
      _id: "3",
      name: "Dr. Nafisa Karim",
      role: "Endocrinologist",
      image:
        "https://i.ibb.co.com/VYWJ5S4G/2a0e8cb609405d9ca87bc81154b9c443.jpg",
      bio: "Focused on diabetes management and lifestyle counseling, helping patients achieve better metabolic health.",
    },
    {
      _id: "4",
      name: "Dr. Juan Williams",
      role: "General Physician",
      image:
        "https://i.ibb.co.com/YBhc8gVk/ai-generative-portrait-of-confident-male-doctor-in.jpg",
      bio: "Provides general health checkups and preventive care for patients of all ages.",
    },
  ];

  return (
    <section className="pt-8 lg:pt-16 ">
      <div className="max-w-7xl mx-auto px-4 lg:px-0">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-extrabold mb-4">
            Our Healthcare Professionals
          </h2>
          <p className="mt-3 text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Meet our experienced team of healthcare professionals dedicated to
            providing high-quality care and health education across all our
            medical camps.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {professionals.map((prof) => (
            <div
              key={prof._id}
              className="bg-white rounded-2xl shadow-md overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-indigo-200"
            >
              <img
                src={prof.image}
                alt={prof.name}
                className="w-full h-56 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-1">
                  {prof.name}
                </h3>
                <p className="text-indigo-600 font-medium mb-2">{prof.role}</p>
                <p className="text-gray-600 text-sm line-clamp-3">{prof.bio}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OurHealthcareProfessionals;

import React from "react";

export default function VirtualTourInfo({ tourRef }) {
  const sections = [
    {
      title: "Greenhouse",
      icon: "🌱",
      description:
        "Contains plants to provide oxygen and food. Users can monitor growth and maintain the ecosystem of the habitat.",
    },
    {
      title: "Solar Panels",
      icon: "☀️",
      description:
        "Generates energy for the habitat using sunlight. You can track energy production and storage levels.",
    },
    {
      title: "Gym",
      icon: "💪",
      description:
        "Fitness and exercise area to maintain astronaut health. Includes equipment for strength, cardio, and flexibility.",
    },
    {
      title: "Lab",
      icon: "🧪",
      description:
        "Research and experiments hub. Users can explore biology, chemistry, and space technology experiments.",
    },
    {
      title: "Living Quarters",
      icon: "🏠",
      description:
        "Comfortable living area for astronauts. Includes sleeping pods, personal storage, and recreation space.",
    },
    {
      title: "Control Room",
      icon: "🛰️",
      description:
        "Central command for monitoring all habitat systems, energy levels, and safety protocols.",
    },
  ];

  return (
    <section ref={tourRef} className="p-8 bg-[#0A1223] text-white min-h-screen scroll-mt-24">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold text-yellow-400 mb-6 text-center">
          Virtual Habitat Tour
        </h2>
        <p className="text-gray-300 text-center max-w-3xl mx-auto mb-10 text-lg">
          Explore your space habitat! See how each module—from the Greenhouse and Solar Panels to the Gym and Lab—supports life, work, and sustainability in space.
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {sections.map((section, idx) => (
            <div
              key={idx}
              className="bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-2xl shadow-xl hover:scale-105 hover:shadow-yellow-400/50 transition-transform duration-300 cursor-pointer"
            >
              <div className="text-5xl mb-4 text-center animate-bounce">{section.icon}</div>
              <h3 className="text-2xl font-semibold mb-2 text-center">{section.title}</h3>
              <p className="text-gray-300 text-center">{section.description}</p>
            </div>
          ))}
        </div>

        <p className="mt-10 text-gray-400 text-center text-lg max-w-2xl mx-auto">
          This page serves as an overview of the habitat. Users can understand what each module does before exploring it in the interactive tour.
        </p>
      </div>
    </section>
  );
}

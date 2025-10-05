import React from "react";
import { useNavigate } from "react-router-dom";

export default function EducationalHub({ hubRef }) {
  const navigate = useNavigate();

  const topics = [
    { title: "Astronomy 101", icon: "🌍", path: "/astronomy" },
    { title: "Life in Space", icon: "🚀", path: "/life-in-space" },
    { title: "Space Technology", icon: "⚛️", path: "/space-technology" },
    { title: "Quizzes & Facts", icon: "📚", path: "/quizzes" },
  ];

  return (
    <section
      ref={hubRef}
      className="p-8 bg-gradient-to-b from-[#0A1223] to-[#071020] text-white scroll-mt-24"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-12 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-3 tracking-wide text-yellow-400">
            Educational Hub
          </h2>
          <p className="text-gray-300 max-w-2xl mx-auto text-lg">
            Explore the wonders of space! Learn about the solar system, life in space, space technology, and challenge yourself with quizzes.
          </p>
        </div>

        {/* Topic Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {topics.map((topic, idx) => (
            <div
              key={idx}
              className="relative bg-gradient-to-br from-blue-900 to-indigo-900 p-6 rounded-2xl shadow-2xl transform hover:scale-105 hover:shadow-yellow-500/50 transition-transform duration-300 cursor-pointer group overflow-hidden"
              onClick={() => navigate(topic.path)}
            >
              {/* Floating icon */}
              <div className="absolute -top-5 -right-5 text-5xl opacity-20 animate-bounce">
                {topic.icon}
              </div>

              <div className="flex items-center mb-4 z-10 relative">
                <div className="mr-3 text-4xl">{topic.icon}</div>
                <h4 className="text-2xl font-semibold">{topic.title}</h4>
              </div>

              <p className="text-gray-200 text-sm mb-6 relative z-10">
                {topic.title === "Astronomy 101" &&
                  "Explore the solar system, planets, stars, and galaxy scales."}
                {topic.title === "Life in Space" &&
                  "Learn about microgravity effects, nutrition, and astronaut health."}
                {topic.title === "Space Technology" &&
                  "Discover spacecraft, habitats, power systems, and communication technologies."}
                {topic.title === "Quizzes & Facts" &&
                  "Test your knowledge with fun quizzes about planets, stars, and habitats."}
              </p>

              {/* Explore Button with glow effect */}
              <button className="relative z-10 bg-yellow-400 text-black px-5 py-2 rounded-full font-semibold uppercase tracking-wider shadow-lg shadow-yellow-500/50 hover:scale-105 hover:shadow-yellow-600/70 transition-all duration-300">
                Explore
              </button>

              {/* Background glow circle */}
              <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-yellow-500 rounded-full opacity-10 blur-2xl animate-pulse"></div>
            </div>
          ))}
        </div>

        {/* Optional fun fact */}
        <div className="mt-16 text-center text-gray-400 text-lg">
          🚀 Did you know? Saturn’s rings are made mostly of ice particles, and Jupiter’s moon Ganymede is larger than Mercury!
        </div>
      </div>
    </section>
  );
}

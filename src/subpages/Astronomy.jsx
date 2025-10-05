import React from "react";

export default function Astronomy() {
  return (
    <div className="p-8 max-w-5xl mx-auto text-white bg-[#071020] min-h-screen">
      <h1 className="text-4xl font-bold mb-4">Astronomy 101 🌍</h1>
      <p className="text-gray-300 mb-4">
        Explore the solar system, planets, stars, and galaxy scales.
        Learn planetary motion, orbits, and celestial phenomena.
      </p>
      <ul className="list-disc ml-5 text-gray-200 space-y-2">
        <li>Structure of the Solar System</li>
        <li>Different types of stars and their lifecycles</li>
        <li>Galaxy scales and distances</li>
        <li>Planetary orbits and rotation</li>
      </ul>
    </div>
  );
}

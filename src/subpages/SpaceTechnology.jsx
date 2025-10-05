import React from "react";

export default function SpaceTechnology() {
  return (
    <div className="p-8 max-w-5xl mx-auto text-white bg-[#071020] min-h-screen">
      <h1 className="text-4xl font-bold mb-4">Space Technology ⚛️</h1>
      <p className="text-gray-300 mb-4">
        Discover the technology behind space exploration.
      </p>
      <ul className="list-disc ml-5 text-gray-200 space-y-2">
        <li>Spacecraft design and modules</li>
        <li>Power systems and energy management</li>
        <li>Communication technologies for habitats</li>
        <li>Advanced tools for research and experiments</li>
      </ul>
    </div>
  );
}

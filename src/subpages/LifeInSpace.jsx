import React from "react";

export default function LifeInSpace() {
  return (
    <div className="p-8 max-w-5xl mx-auto text-white bg-[#071020] min-h-screen">
      <h1 className="text-4xl font-bold mb-4">Life in Space 🚀</h1>
      <p className="text-gray-300 mb-4">
        Learn how humans survive and adapt in space environments.
      </p>
      <ul className="list-disc ml-5 text-gray-200 space-y-2">
        <li>Microgravity effects on muscles and bones</li>
        <li>Nutrition & meal protocols in space</li>
        <li>Sleep and circadian rhythm adaptation</li>
        <li>Exercise and physical training for astronauts</li>
      </ul>
    </div>
  );
}

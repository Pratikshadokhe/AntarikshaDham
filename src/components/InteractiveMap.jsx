import React, { useState } from "react";

const GRAVITIES = {
  Earth: 9.807,
  Moon: 1.62,
  Mars: 3.711,
  ISS: 0.0,
};

const DISTANCES = {
  Earth: 0,
  Moon: 384400,
  Mars: 225000000,
  ISS: 408,
};

// Default map centers (x = distance from Sun)
const BASE_CENTERS = {
  Earth: { x: 300, y: 200 },
  Moon: { x: 360, y: 200 },
  Mars: { x: 500, y: 200 },
  ISS: { x: 310, y: 180 },
};

export default function InteractiveMap() {
  const [selectedBody, setSelectedBody] = useState("Earth");
  const [distanceScale, setDistanceScale] = useState(1);

  const mapCenters = {};
  Object.keys(BASE_CENTERS).forEach((k) => {
    const c = BASE_CENTERS[k];
    mapCenters[k] = {
      x: 100 + (c.x - 100) * distanceScale,
      y: c.y,
    };
  });

  // Generate random stars
  const stars = Array.from({ length: 70 }).map(() => ({
    x: Math.random() * 800,
    y: Math.random() * 400,
  }));

  return (
    <section className="py-20 bg-gradient-to-b from-[#050b17] via-[#0a1223] to-[#050b17] text-white relative overflow-hidden">
      {/* Decorative stars in background */}
      <div className="absolute inset-0">
        <svg viewBox="0 0 800 400" className="w-full h-full">
          {stars.map((s, i) => (
            <circle
              key={`star-${i}`}
              cx={s.x}
              cy={s.y}
              r="0.8"
              fill="white"
              opacity={Math.random() * 0.6 + 0.2}
            />
          ))}
        </svg>
      </div>

      <div className="relative max-w-6xl mx-auto px-4">
        <h2 className="text-4xl font-bold text-center text-yellow-400 mb-6">
          Interactive Space Map
        </h2>
        <p className="text-center text-gray-300 mb-10 max-w-2xl mx-auto text-lg">
          Explore our solar neighborhood interactively — click a celestial body to learn about its environment, gravity, and distance from Earth.
        </p>

        <div className="relative bg-[#0b1626]/70 backdrop-blur-md border border-gray-700 rounded-2xl p-8 shadow-2xl">
          <svg viewBox="0 0 800 400" className="w-full h-80">
            {/* Sun */}
            <circle cx="100" cy="200" r="40" fill="url(#sunGradient)" />
            <defs>
              <radialGradient id="sunGradient">
                <stop offset="0%" stopColor="#FFD700" />
                <stop offset="100%" stopColor="#FF8C00" />
              </radialGradient>
            </defs>

            {/* Orbits */}
            {Object.keys(mapCenters).map((k) => {
              if (k !== "Earth" && k !== "Sun") {
                const c = mapCenters[k];
                const r = Math.abs(c.x - 100);
                return (
                  <circle
                    key={`${k}-orbit`}
                    cx="100"
                    cy="200"
                    r={r}
                    fill="none"
                    stroke="rgba(255,255,255,0.15)"
                    strokeWidth="0.8"
                    strokeDasharray="3 3"
                  />
                );
              }
              return null;
            })}

            {/* Planets */}
            {Object.keys(mapCenters).map((k) => {
              const c = mapCenters[k];
              const r =
                k === "Earth" ? 22 : k === "Moon" ? 10 : k === "Mars" ? 14 : 7;
              const color =
                k === "Earth"
                  ? "#00A3FF"
                  : k === "Moon"
                  ? "#CFCFCF"
                  : k === "Mars"
                  ? "#C1440E"
                  : "#9EE493";
              return (
                <g key={k} onClick={() => setSelectedBody(k)} className="cursor-pointer">
                  <circle
                    cx={c.x}
                    cy={c.y}
                    r={r}
                    fill={color}
                    stroke={selectedBody === k ? "#00FFD0" : "none"}
                    strokeWidth={selectedBody === k ? 3 : 0}
                  />
                  <text
                    x={c.x}
                    y={c.y + r + 14}
                    textAnchor="middle"
                    fill="white"
                    fontSize="10"
                  >
                    {k}
                  </text>
                </g>
              );
            })}
          </svg>

          {/* Info Panel */}
          <div className="mt-8 text-center">
            <h3 className="text-2xl font-semibold text-yellow-400 mb-2">
              {selectedBody}
            </h3>
            <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-300">
              <p>
                <span className="font-semibold text-white">Gravity:</span>{" "}
                {GRAVITIES[selectedBody]} m/s²
              </p>
              <p>
                <span className="font-semibold text-white">Atmosphere:</span>{" "}
                {selectedBody === "Earth"
                  ? "N₂/O₂ (78/21%)"
                  : selectedBody === "Moon"
                  ? "None"
                  : selectedBody === "Mars"
                  ? "Thin CO₂"
                  : "Microgravity"}
              </p>
              <p>
                <span className="font-semibold text-white">Distance:</span>{" "}
                {DISTANCES[selectedBody].toLocaleString()} km
              </p>
              <p>
                <span className="font-semibold text-white">Temperature:</span>{" "}
                {selectedBody === "Earth"
                  ? "−50°C to 50°C"
                  : selectedBody === "Moon"
                  ? "−173°C to 127°C"
                  : selectedBody === "Mars"
                  ? "−125°C to 20°C"
                  : "Varies"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

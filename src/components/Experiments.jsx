import React, { useState, useEffect } from "react";

const GRAVITY_VALUES = { Earth: 9.8, Moon: 1.62, Mars: 3.7, ISS: 0 };

export default function SpaceExperiments({ expRef }) {
  // Gravity simulator state
  const [mass, setMass] = useState(1);
  const [simGravityBody, setSimGravityBody] = useState("Earth");
  const [weight, setWeight] = useState(0);

  // Space plant growth state
  const [plantState, setPlantState] = useState({
    days: 0,
    biomass: 0,
    health: 80,
  });

  // Update weight dynamically
  useEffect(() => {
    const g = GRAVITY_VALUES[simGravityBody] || 9.8;
    setWeight((mass * g).toFixed(2));
  }, [mass, simGravityBody]);

  // Plant growth simulation
  const runPlantStep = () => {
    setPlantState((prev) => ({
      days: prev.days + 1,
      biomass: prev.biomass + Math.round(Math.random() * 10 + 5),
      health: Math.min(prev.health + Math.round(Math.random() * 5), 100),
    }));
  };

  return (
    <section
      ref={expRef}
      className="py-20 bg-[#030314] min-h-screen flex flex-col justify-center items-center"
    >
      <div className="max-w-7xl mx-auto px-6 text-center">
        <h2 className="text-4xl font-bold text-white mb-12">
          AntarikshDham: Interactive Labs
        </h2>

        <div className="grid md:grid-cols-2 gap-10">
          {/* Gravity Lab */}
          <div className="bg-gradient-to-b from-[#1e1e90] to-[#0d0d40] p-8 rounded-3xl shadow-lg border border-[#2c2c99] hover:scale-105 transition-transform duration-300 relative overflow-hidden">
            <div className="absolute top-4 right-4 text-4xl opacity-80">🧑‍🚀</div>
            <h3 className="text-2xl font-bold text-white mb-4">Gravity Lab</h3>
            <p className="text-gray-300 mb-6">
              Simulate how weight changes on Earth, Moon, Mars, and in orbit.
            </p>

            <input
              type="number"
              value={mass}
              onChange={(e) => setMass(Number(e.target.value))}
              className="w-full p-3 mb-4 rounded-lg bg-[#0a0a2a] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter mass (kg)"
            />

            <select
              value={simGravityBody}
              onChange={(e) => setSimGravityBody(e.target.value)}
              className="w-full p-3 mb-4 rounded-lg bg-[#0a0a2a] text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {Object.keys(GRAVITY_VALUES).map((body) => (
                <option key={body} value={body}>
                  {body}
                </option>
              ))}
            </select>

            <div className="text-white text-lg font-semibold mb-6">
              Weight:{" "}
              <span className="text-yellow-400 text-xl">{weight} N</span>
            </div>

            <button className="mt-2 bg-yellow-400 text-black font-bold py-3 px-6 rounded-full hover:bg-yellow-500 transition shadow-md">
              EXPLORE
            </button>
          </div>

          {/* Hydroponics Lab */}
          <div className="bg-gradient-to-b from-[#1e1e90] to-[#0d0d40] p-8 rounded-3xl shadow-lg border border-[#2c2c99] hover:scale-105 transition-transform duration-300 relative overflow-hidden">
            <div className="absolute top-4 right-4 text-4xl opacity-80">🌱</div>
            <h3 className="text-2xl font-bold text-white mb-4">
              Hydroponics Lab
            </h3>
            <p className="text-gray-300 mb-6">
              Simulate plant growth and health in space-like environments.
            </p>

            <p className="text-gray-300 mb-6">
              Days: <span className="font-medium">{plantState.days}</span> •
              Biomass: <span className="font-medium">{plantState.biomass}</span> •
              Health: <span className="font-medium">{plantState.health}%</span>
            </p>

            {/* Health / growth bar */}
            <div className="w-full bg-gray-700 rounded-full h-3 mb-6 overflow-hidden">
              <div
                className="h-3 bg-green-400 transition-all duration-500"
                style={{ width: `${plantState.health}%` }}
              ></div>
            </div>

            <div className="flex gap-4">
              <button
                onClick={runPlantStep}
                className="flex-1 py-3 bg-green-500 hover:bg-green-600 rounded-full text-white font-semibold transition"
              >
                Run Day
              </button>
              <button
                onClick={() =>
                  setPlantState({ days: 0, biomass: 0, health: 80 })
                }
                className="flex-1 py-3 bg-red-500 hover:bg-red-600 rounded-full text-white font-semibold transition"
              >
                Reset
              </button>
            </div>

            <button className="mt-6 bg-yellow-400 text-black font-bold py-3 px-6 rounded-full hover:bg-yellow-500 transition shadow-md">
              EXPLORE
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

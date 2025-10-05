import React, { useState, useEffect } from "react";
import Apollo11 from "../assets/Apollo11.png";
import SpaceShuttle from "../assets/SpaceShuttle.png";
import SpaceStation from "../assets/spacestation.png";
import ArtemisMission from "../assets/artimismission.png";

const missions = [
  {
    title: "Apollo 11",
    year: "1969",
    image: Apollo11,
    description: "First Moon landing by humans, a historic giant leap for mankind.",
  },
  {
    title: "Space Shuttle Era",
    year: "1981–2011",
    image: SpaceShuttle,
    description: "Reusable spacecraft enabling orbital missions and ISS construction.",
  },
  {
    title: "International Space Station",
    year: "2000–present",
    image: SpaceStation,
    description: "Continuous human presence in space for research and technology.",
  },
  {
    title: "Artemis & Mars Missions",
    year: "2020–future",
    image: ArtemisMission,
    description: "Next-gen missions to the Moon and Mars, advancing space exploration.",
  },
];

export default function Gallery({ galleryRef }) {
  const [timelineIndex, setTimelineIndex] = useState(0);

  // Automatically change image every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setTimelineIndex(prev => (prev + 1) % missions.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const mission = missions[timelineIndex];

  return (
    <section ref={galleryRef} className="py-16 bg-gradient-to-b from-[#0A1223] to-[#071020] text-white">
      <div className="max-w-6xl mx-auto px-4 text-center">
        <h2 className="text-4xl font-bold text-yellow-400 mb-4">Space Exploration Timeline</h2>
        <p className="text-gray-300 mb-12 max-w-2xl mx-auto">
          Explore key milestones in human space exploration—from the Moon landing to future Artemis missions.
        </p>

        <div className="relative w-full md:w-3/4 mx-auto">
          {/* Mission Image */}
          <div className="rounded-2xl overflow-hidden shadow-2xl mb-6">
            <img
              src={mission.image}
              alt={mission.title}
              className="w-full h-80 md:h-96 object-cover transition-transform duration-1000 ease-in-out hover:scale-105"
            />
          </div>

          {/* Mission Info Overlay */}
          <div className="bg-gradient-to-t from-black/80 to-transparent p-6 rounded-xl text-left absolute bottom-0 left-1/2 transform -translate-x-1/2 w-11/12 md:w-full md:max-w-xl shadow-lg">
            <h3 className="text-2xl font-semibold text-yellow-400">{mission.title}</h3>
            <p className="text-gray-400 font-medium">{mission.year}</p>
            <p className="text-gray-300 mt-2">{mission.description}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

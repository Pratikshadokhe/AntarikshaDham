import React from "react";

export default function SpaceNewsDemo({ newsRef }) {
  const NEWS = [
    {
      id: 1,
      title: "New Space Habitat Module Launched",
      description:
        "A new habitat module has been deployed to expand long-duration living experiments in low-Earth orbit. The design supports modular, AI-assisted systems for crew comfort and research.",
      date: "2025-10-05",
      video: "https://www.youtube.com/embed/Ngys5NOZqaU?si=LO4VS5R9mLVpQ8XO",
    },
    {
      id: 2,
      title: "Space Greenhouses Show Promising Results",
      description:
        "Astronauts have successfully cultivated lettuce and radish crops in microgravity conditions. The hydroponic systems are showing remarkable resilience and productivity.",
      date: "2025-10-04",
      video: "https://www.youtube.com/embed/s2Rl-GA16uo?si=CVLKtZ489GhDgvjS",
    },
    {
      id: 3,
      title: "Astronaut Exercise Protocol Updated",
      description:
        "NASA’s new exercise system integrates smart resistance technology to counter muscle loss in zero-gravity, ensuring astronaut health during extended missions.",
      date: "2025-10-03",
      video: "https://www.youtube.com/embed/82DfHYRKt50?si=u9XDpQb9dfLD2-F9",
    },
  ];

  return (
    <section
      ref={newsRef}
      className="py-20 bg-gradient-to-b from-black via-gray-900 to-gray-950 relative overflow-hidden"
    >
      {/* Faint background stars */}
      <div className="absolute inset-0 bg-[radial-gradient(white_1px,transparent_1px)] bg-[size:20px_20px] opacity-10"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header Section */}
        <div className="text-center mb-14">
          <div className="inline-block px-4 py-1 mb-3 rounded-full bg-cyan-500/10 text-cyan-400 text-sm tracking-wider uppercase font-semibold">
            Space Habitat News
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Latest Updates from Orbit
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Stay informed with the most recent research and innovations shaping
            human life beyond Earth.
          </p>
        </div>

        {/* News Cards */}
        <div className="grid md:grid-cols-3 gap-10">
          {NEWS.map((n) => (
            <article
              key={n.id}
              className="group bg-gray-900/80 border border-gray-700 rounded-3xl overflow-hidden shadow-xl hover:shadow-cyan-500/20 hover:scale-[1.03] transition-all duration-300 flex flex-col backdrop-blur-sm"
            >
              {/* Embedded Video */}
              <div className="aspect-video bg-black">
                <iframe
                  src={n.video}
                  title={n.title}
                  className="w-full h-full"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                ></iframe>
              </div>

              {/* Text Content */}
              <div className="p-6 flex flex-col flex-1 text-left">
                <h3 className="text-xl font-semibold text-cyan-400 mb-2 group-hover:text-cyan-300 transition">
                  {n.title}
                </h3>
                <p className="text-gray-400 text-sm mb-3">
                  {new Date(n.date).toLocaleDateString(undefined, {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </p>
                <p className="text-gray-300 flex-1 mb-4 leading-relaxed">
                  {n.description}
                </p>

                <button className="mt-auto inline-block px-4 py-2 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white font-medium transition">
                  Learn More
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

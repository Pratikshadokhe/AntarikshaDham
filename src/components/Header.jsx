import React, { useState } from "react";
import { FiMenu, FiX } from "react-icons/fi"; // For hamburger icon

export default function Header({ scrollToRef, refs, activeSection }) {
  const {
    heroRef,
    mapRef,
    hubRef,
    tourRef,
    galleryRef,
    expRef,
    dashRef,
    newsRef,
    contactRef,
  } = refs;

  const [mobileOpen, setMobileOpen] = useState(false);

  const menuItems = [
    { name: "Home", ref: heroRef, id: "home" },
    { name: "Features", ref: mapRef, id: "features" },
    { name: "Educational Hub", ref: hubRef, id: "hub" },
    { name: "Gallery", ref: galleryRef, id: "gallery" },
    { name: "Experiments", ref: expRef, id: "experiments" },
    { name: "Space Tips", ref: dashRef, id: "dashboard" },
    { name: "About", ref: tourRef, id: "about" },
    { name: "News", ref: newsRef, id: "news" },
    { name: "Contact", ref: contactRef, id: "contact" },
  ];

  const handleClick = (id, ref) => {
    scrollToRef(id, ref);
    setMobileOpen(false); 
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black bg-opacity-50 backdrop-blur p-4 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <div className="w-52 h-12 bg-gradient-to-br from-[#00FFD0] to-[#FFAA00] rounded-full flex items-center justify-center font-bold text-2xl text-black ml-20">
          AntarikshDham
        </div>
      </div>

      <nav className="hidden md:flex gap-4 items-center">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => handleClick(item.id, item.ref)}
            className={`px-3 py-2 rounded-lg transition ${
              activeSection === item.id
                ? "bg-cyan-500 text-black font-semibold"
                : "text-white hover:bg-gray-700"
            }`}
          >
            {item.name}
          </button>
        ))}
      </nav>

      <div className="md:hidden">
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="text-white text-2xl"
        >
          {mobileOpen ? <FiX /> : <FiMenu />}
        </button>
      </div>

      {mobileOpen && (
        <div className="absolute top-full left-0 w-full bg-black bg-opacity-90 backdrop-blur-md flex flex-col items-center py-4 gap-2 md:hidden">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleClick(item.id, item.ref)}
              className={`w-full text-center px-4 py-2 rounded-lg transition ${
                activeSection === item.id
                  ? "bg-cyan-500 text-black font-semibold"
                  : "text-white hover:bg-gray-700"
              }`}
            >
              {item.name}
            </button>
          ))}
        </div>
      )}
    </header>
  );
}

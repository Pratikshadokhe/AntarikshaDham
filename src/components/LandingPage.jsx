import React, {useState} from 'react'
import {useNavigate} from 'react-router-dom'
import {
  MapPin, Play, Pause, Download, Flower2, AlertCircle, TrendingUp, Filter, X, Menu, Info, Award, Upload,
  Globe, MessageCircle, Sun, Moon, Zap, ChevronRight, Calendar, Cloud, Droplets, ThermometerSun, BarChart3,
  Camera, CheckCircle, Search, Users, BookOpen, Satellite, Activity, LucideSatellite, Battery, Thermometer, Wind
} from 'lucide-react';

const LandingPage = () => {
    const navigate = useNavigate();
    const StarIcon = ({ darkMode }) => <div style={{ width: 6, height: 6 }} className={`${darkMode ? 'bg-white' : 'bg-yellow-400'} rounded-full`} />;
    const [darkMode, setDarkMode] = useState(true);
    const bgClass = darkMode ? 'bg-black text-white' : 'bg-gray-50 text-gray-900';
  const cardClass = darkMode ? 'bg-gray-900' : 'bg-white';
  const borderClass = darkMode ? 'border-gray-800' : 'border-gray-200';

  const Feature = ({ title, icon, desc }) => (
    <div className="p-4 rounded-xl bg-white/5">
      <div className="flex items-center gap-3">
        <div className="p-2 rounded bg-white/10">{icon}</div>
        <div>
          <div className="font-semibold">{title}</div>
          <div className="text-xs opacity-80">{desc}</div>
        </div>
      </div>
    </div>
  );

  const TutorialModal = ({ onClose }) => (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
      <div className={`max-w-2xl w-full p-6 rounded-2xl ${cardClass} border ${borderClass}`}>
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold">How to use "Your Home in Space"</h3>
          <button onClick={onClose}><X /></button>
        </div>

        <ul className="list-disc ml-5 space-y-2 text-sm opacity-85">
          <li>Use the map/globe to click habitat modules and inspect telemetry.</li>
          <li>Enable time-lapse to review environmental trends across orbits.</li>
          <li>Upload crew reports or sensor captures via the Upload panel.</li>
          <li>Switch 3D view to preview orbital orientation and solar exposure.</li>
        </ul>

        <div className="mt-4">
          <button onClick={onClose} className="w-full py-2 rounded-lg bg-gradient-to-r from-cyan-500 to-violet-500">Got it</button>
        </div>
      </div>
    </div>
  );

    return (
    <div className={`min-h-screen ${darkMode ? 'bg-gradient-to-br from-black via-sky-950 to-gray-900' : 'bg-gradient-to-br from-blue-50 via-green-50 to-purple-50'} relative overflow-hidden`}>

      <button onClick={() => navigate("/")} className="px-5 py-3 rounded-lg bg-gradient-to-r from-green-900 to-blue-900 font-semibold m-6">
        Go To Home
      </button>

      <button className="px-5 py-3 rounded-lg bg-gradient-to-r from-green-900 to-blue-900 font-semibold">
        Education Hub
      </button>

      <button onClick={() => navigate("/HabitatDesigner")} className="px-5 py-3 rounded-lg bg-gradient-to-r from-green-900 to-blue-900 font-semibold m-6">
        Play Habitat Designer!
      </button>

      <div className="inline-flex items-center gap-2 bg-sky-700 text-white text-4xl font-bold align-middle px-7 py-3 rounded-full mx-50 ">
        <Satellite size={40} /> AntarikshDham
      </div>

      {/* background stars */}
      <div className="absolute inset-0 z-0 opacity-20">
        {[...Array(40)].map((_, i) => {
            const size = 0.5 + Math.random() * 1.5;
            const duration = 1 + Math.random() * 2; 
            const delay = Math.random() * 2; 
            return (
            <div
                key={i}
                className="absolute twinkle"
                style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                transform: `scale(${size})`,
                animationDuration: `${duration}s`,
                animationDelay: `${delay}s`
                }}
            >
                <StarIcon darkMode={darkMode} />
            </div>
            );
        })}
        </div>


      <button
        onClick={() => setDarkMode(!darkMode)}
        className="fixed top-4 right-4 z-50 p-3 rounded-full bg-white/10 backdrop-blur-md hover:bg-white/20 transition-all"
      >
        {darkMode ? <Sun size={20} className="text-yellow-300" /> : <Moon size={20} className="text-purple-600" />}
      </button>

      <div className="relative z-8 flex flex-col items-center justify-center min-h-screen p-8">
        <div className="text-center max-w-4xl space-y-6">
          
          <h1 className="text-6xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-violet-400">
            Your Home in Space
          </h1>

          <p className="text-lg opacity-80">
            A live habitat dashboard for orbital living — monitor life support, crew status, power, and environmental telemetry.
          </p>

          <div className="grid md:grid-cols-3 gap-6 mt-8">
            <Feature title="Life Support" icon={<Droplets size={28} />} desc="Oxygen, CO₂, humidity and thermal control." darkMode={darkMode} />
            <Feature title="Power & Thermal" icon={<ThermometerSun size={28} />} desc="Solar arrays, battery state and heat rejection." darkMode={darkMode} />
            <Feature title="Crew Ops" icon={<Users size={28} />} desc="Crew health, tasks, and messages." darkMode={darkMode} />
          </div>

          <div className={`${cardClass} mt-8 p-6 rounded-2xl border ${borderClass} flex flex-col gap-4`}>
            <label className="font-semibold">Select view</label>
            <div className="flex gap-3">
              <select value={selectedRegion} onChange={(e) => setSelectedRegion(e.target.value)} className="flex-1 p-3 rounded-lg bg-white/5">
                <option>Orbital Habitat</option>
                <option>Lunar Gateway (sim)</option>
                <option>Mars Transit Habitat (sim)</option>
              </select>

              <button onClick={() => setCurrentPage('dashboard')} className="px-5 py-3 rounded-lg bg-gradient-to-r from-green-500 to-blue-500 font-semibold">
                Enter Dashboard
              </button>
             
            </div>

            <div className="flex gap-3 justify-center mt-4">
              <button onClick={() => setShowTutorial(true)} className="text-sm underline">Quick Tutorial</button>
              <button onClick={() => setCurrentPage('learn')} className="text-sm underline">Learn the Tech</button>
            </div>
          </div>

        </div>
      </div>

      {showTutorial && <TutorialModal onClose={() => setShowTutorial(false)} />}

    </div>
  )};

  export default LandingPage;
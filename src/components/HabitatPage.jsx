// HabitatPage.jsx
import React, { useState, useEffect } from 'react';
import {useNavigate} from 'react-router-dom'
import '../index.css'
import HabitatDesigner from '../components/HabitatDesigner'
import '../index.css'
import { Link } from 'react-router-dom';

import {
  MapPin, Play, Pause, Download, Flower2, AlertCircle, TrendingUp, Filter, X, Menu, Info, Award, Upload,
  Globe, MessageCircle, Sun, Moon, Zap, ChevronRight, Calendar, Cloud, Droplets, ThermometerSun, BarChart3,
  Camera, CheckCircle, Search, Users, BookOpen, Satellite, Activity, LucideSatellite, Battery, Thermometer, Wind
} from 'lucide-react';

const generateSpaceTelemetry = () => {
  const modules = [
    { name: 'Habitat Core', lat: 0, lng: 0 },
    { name: 'Greenhouse Module', lat: 0.001, lng: 0.002 },
    { name: 'Solar Array', lat: -0.002, lng: 0.003 },
    { name: 'Lab Module', lat: -0.0015, lng: -0.002 },
    { name: 'Hab Dock', lat: 0.003, lng: -0.001 }
  ];

  const crew = ['Commander Lee', 'Dr. Patel', 'Engineer Gomez', 'Specialist Amina'];

  const data = [];
  const now = new Date();
  for (let i = 0; i < modules.length; i++) {
    const m = modules[i];
    data.push({
      id: `mod-${i}`,
      module: m.name,
      lat: m.lat + (Math.random() - 0.5) * 0.0005,
      lng: m.lng + (Math.random() - 0.5) * 0.0005,
      temperature: (18 + Math.random() * 6).toFixed(1), // °C
      oxygenPercent: (19 + Math.random() * 2).toFixed(2),
      co2ppm: Math.floor(350 + Math.random() * 800),
      radiationuSv: (0.05 + Math.random() * 0.3).toFixed(3),
      solarPowerKW: (Math.random() * 10).toFixed(2),
      batteryPercent: Math.floor(50 + Math.random() * 50),
      lastPing: new Date(now.getTime() - Math.floor(Math.random() * 5) * 60 * 1000).toISOString(),
      crewOnboard: Math.random() > 0.5 ? [crew[Math.floor(Math.random() * crew.length)]] : []
    });
  }
  return data;
};

const SpaceView = ({ telemetry, region, view3D, onModuleClick, darkMode }) => {
  return (
    <div className={`flex-1 p-6 ${darkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'} border ${darkMode ? 'border-gray-700' : 'border-gray-200'} rounded-lg`}>
      <h2 className="text-xl font-bold mb-2">{view3D ? 'Orbital 3D View' : 'Module Map'} — {region}</h2>
      <p className="text-sm opacity-80 mb-4">Displaying {telemetry.length} modules | Live telemetry snapshot</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {telemetry.map(t => (
          <div key={t.id} className={`p-3 rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-gray-50'} border ${darkMode ? 'border-gray-700' : 'border-gray-200'} cursor-pointer`} onClick={() => onModuleClick(t)}>
            <div className="flex justify-between items-start">
              <div>
                <div className="text-sm font-semibold">{t.module}</div>
                <div className="text-xs opacity-70">Last ping: {new Date(t.lastPing).toLocaleTimeString()}</div>
              </div>
              <div className="text-right">
                <div className="text-lg font-bold">{t.temperature}°C</div>
                <div className="text-xs opacity-70">O₂ {t.oxygenPercent}%</div>
              </div>
            </div>

            <div className="mt-3 grid grid-cols-2 gap-2 text-xs">
              <div className="p-2 rounded bg-white/5">
                CO₂ {t.co2ppm} ppm
              </div>
              <div className="p-2 rounded bg-white/5">
                Rad {t.radiationuSv} µSv
              </div>
              <div className="p-2 rounded bg-white/5">
                Solar {t.solarPowerKW} kW
              </div>
              <div className="p-2 rounded bg-white/5">
                Battery {t.batteryPercent}%
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const HabitatPage = () => {
    const navigate = useNavigate();

    const goToHabitatDesigner = () => {
        navigate("/HabitatDesigner");
    };
    
    const goToHome = () => {
        navigate("/");
    }
    const runDiagnostics = () => {
      alert("Diagnostics running… All systems nominal!");
    };

    const syncTelemetry = () => {
      alert("Telemetry synced successfully.");
    };

    const raiseAlert = () => {
      alert("⚠️ Alert raised! Check systems immediately.");
    };
  // App state
  const [currentPage, setCurrentPage] = useState('landing'); // landing, dashboard, logs, learn
  const [darkMode, setDarkMode] = useState(true);
  const [telemetry] = useState(generateSpaceTelemetry());
  const [selectedRegion, setSelectedRegion] = useState('Orbital Habitat');
  const [view3D, setView3D] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [showTutorial, setShowTutorial] = useState(false);
  const [selectedModule, setSelectedModule] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [citizenReports, setCitizenReports] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState({ oxygen: true, temperature: true, radiation: true, power: true });
  const [timeIndex, setTimeIndex] = useState(0); // for time-lapse months or orbits

  // autoplay time-lapse
  useEffect(() => {
    if (isPlaying) {
      const id = setInterval(() => setTimeIndex(i => (i + 1) % 24), 1200);
      return () => clearInterval(id);
    }
  }, [isPlaying]);

  const bgClass = darkMode ? 'bg-black text-white' : 'bg-gray-50 text-gray-900';
  const cardClass = darkMode ? 'bg-gray-900' : 'bg-white';
  const borderClass = darkMode ? 'border-gray-800' : 'border-gray-200';

  // handle report upload (citizen scientist style)
  const handleReportUpload = (report) => {
    setCitizenReports(prev => [{ id: `r-${Date.now()}`, ...report, time: new Date().toISOString() }, ...prev]);
  };

   

  const LandingPage = () => (
    <div className={`min-h-screen ${darkMode ? 'bg-gradient-to-br from-black via-sky-950 to-gray-900' : 'bg-gradient-to-br from-blue-50 via-green-50 to-purple-50'} relative overflow-hidden`}>

    <button onClick={goToHome} className="px-5 py-3 rounded-lg bg-gradient-to-r from-green-900 to-blue-900 font-semibold m-6">Go To Home</button>
    <button className="px-5 py-3 rounded-lg bg-gradient-to-r from-green-900 to-blue-900 font-semibold"><a href=''>Education Hub</a></button>

    <button className="px-5 py-3 rounded-lg bg-gradient-to-r from-green-900 to-blue-900 font-semibold m-6"><Link to='/HabitatDesigner'>Play Habitat Designer!</Link></button>

    <div className="inline-flex items-center gap-2 bg-sky-700 text-white text-4xl font-bold align-middle px-7 py-3 rounded-full mx-50 ">
    <Satellite size={40} /> AntarikshDham
    </div>

      {/* background stars */}
      <div className="absolute inset-0 opacity-20">
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
  );
  
  const StarIcon = ({ darkMode }) => <div style={{ width: 6, height: 6 }} className={`${darkMode ? 'bg-white' : 'bg-yellow-400'} rounded-full`} />;

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

  const Navigation = () => (
    <nav className={`w-full p-4 ${cardClass} border-b ${borderClass} sticky top-0 z-40 `}>
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4 overflow-y-auto hide-scrollbar">
        <div className="flex items-center gap-3 overflow-y-auto hide-scrollbar">
          <button onClick={() => setSidebarOpen(s => !s)} className="lg:hidden"><Menu /></button>
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => setCurrentPage('dashboard')}>
            <Satellite /> <div className="font-bold text-lg">Your Home in Space</div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden md:flex gap-2">
            <button onClick={() => setCurrentPage('dashboard')} className="px-3 py-1 rounded bg-white/5">Dashboard</button>
            <button onClick={() => setCurrentPage('logs')} className="px-3 py-1 rounded bg-white/5">Logs</button>
            <button onClick={() => setCurrentPage('learn')} className="px-3 py-1 rounded bg-white/5">Learn</button>
          </div>

          <div className="flex items-center gap-2">
            <button onClick={() => setDarkMode(!darkMode)} className="p-2 rounded bg-white/5">{darkMode ? <Sun /> : <Moon />}</button>
            <div className="px-3 py-1 rounded bg-gradient-to-r from-yellow-400 to-orange-400 flex items-center gap-2">
              <Award /> <span>0</span>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );

  const DashboardPage = () => (

    <div className={`min-h-screen ${bgClass}`}>
      <Navigation />

      <div className="flex gap-6 p-6">
        {/* Sidebar */}
        <aside className={`${sidebarOpen ? 'w-96' : 'w-0'} transition-all overflow-hidden ${cardClass} border ${borderClass} rounded-lg p-4`}>
          <div className="space-y-4 h-[80vh] overflow-y-auto">
            <div className="relative">
              <Search className="absolute left-3 top-3 opacity-60" />
              <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Search modules or crew..." className="w-full pl-10 p-3 rounded-lg bg-white/5" />
            </div>

            <div>
              <h4 className="font-semibold mb-2">Telemetry Filters</h4>
              <label className="flex items-center gap-2">
                <input type="checkbox" checked={selectedFilter.oxygen} onChange={(e) => setSelectedFilter({...selectedFilter, oxygen: e.target.checked})} /> Oxygen
              </label>
              <label className="flex items-center gap-2">
                <input type="checkbox" checked={selectedFilter.temperature} onChange={(e) => setSelectedFilter({...selectedFilter, temperature: e.target.checked})} /> Temperature
              </label>
              <label className="flex items-center gap-2">
                <input type="checkbox" checked={selectedFilter.radiation} onChange={(e) => setSelectedFilter({...selectedFilter, radiation: e.target.checked})} /> Radiation
              </label>
              <label className="flex items-center gap-2">
                <input type="checkbox" checked={selectedFilter.power} onChange={(e) => setSelectedFilter({...selectedFilter, power: e.target.checked})} /> Power
              </label>
            </div>

            <div className="bg-gradient-to-br from-violet-700 to-cyan-700 p-4 rounded-lg text-white">
              <div className="font-bold">Next EVA Window</div>
              <div className="text-sm opacity-90 mt-1">T+ 6 hrs | Solar angle optimal</div>
              <div className="mt-3"><button className="w-full py-2 rounded bg-white/10">View EVA Plan</button></div>
            </div>

            <div>
              <h4 className="font-semibold mb-2">Upload Report</h4>
              <ReportUploader onUpload={handleReportUpload} />
            </div>

            <div>
              <h4 className="font-semibold mb-2">Citizen Reports</h4>
              <div className="space-y-2 max-h-56  overflow-y-auto hide-scrollbar">
                {citizenReports.length === 0 ? <div className="text-sm opacity-60">No reports yet</div> : citizenReports.map(r => (
                  <div key={r.id} className="p-2 rounded bg-white/5 text-sm">
                    <div className="font-semibold">{r.title}</div>
                    <div className="text-xs opacity-80">{new Date(r.time).toLocaleString()}</div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-2">Quick Actions</h4>
              <div className="flex flex-col gap-2">
               <div className="flex flex-col gap-2">
  <button
    onClick={runDiagnostics}
    className="py-2 rounded bg-blue-600"
  >
    Run Diagnostics
  </button>
  <button
    onClick={syncTelemetry}
    className="py-2 rounded bg-green-600"
  >
    Sync Telemetry
  </button>
  <button
    onClick={raiseAlert}
    className="py-2 rounded bg-red-600"
  >
    Raise Alert
  </button>
</div>

              </div>
            </div>
          </div>
        </aside>

        {/* Main Area */}
        <main className="flex-1">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <SpaceView telemetry={telemetry} region={selectedRegion} view3D={view3D} onModuleClick={setSelectedModule} darkMode={darkMode} />
            <div className={`${cardClass} p-4 rounded-lg border ${borderClass}`}>
              <h3 className="font-bold mb-2">Telemetry Summary</h3>

              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 rounded bg-white/5">
                  <div className="text-xs opacity-70">Average O₂</div>
                  <div className="font-bold">{(telemetry.reduce((s, t) => s + parseFloat(t.oxygenPercent), 0) / telemetry.length).toFixed(2)}%</div>
                </div>

                <div className="p-3 rounded bg-white/5">
                  <div className="text-xs opacity-70">Avg Temp</div>
                  <div className="font-bold">{(telemetry.reduce((s, t) => s + parseFloat(t.temperature), 0) / telemetry.length).toFixed(1)}°C</div>
                </div>

                <div className="p-3 rounded bg-white/5">
                  <div className="text-xs opacity-70">Avg Radiation</div>
                  <div className="font-bold">{(telemetry.reduce((s, t) => s + parseFloat(t.radiationuSv), 0) / telemetry.length).toFixed(3)} µSv</div>
                </div>

                <div className="p-3 rounded bg-white/5">
                  <div className="text-xs opacity-70">Total Solar Power</div>
                  <div className="font-bold">{telemetry.reduce((s, t) => s + parseFloat(t.solarPowerKW), 0).toFixed(2)} kW</div>
                </div>
              </div>

              <div className="mt-4">
                <h4 className="font-semibold">Selected Module</h4>
                {selectedModule ? (
                  <div className="mt-2 p-3 rounded bg-white/5">
                    <div className="font-bold">{selectedModule.module}</div>
                    <div className="text-xs opacity-80">Temp: {selectedModule.temperature}°C | O₂: {selectedModule.oxygenPercent}% | CO₂: {selectedModule.co2ppm} ppm</div>
                    <div className="text-xs opacity-60 mt-2">Crew: {selectedModule.crewOnboard.join(', ') || 'None'}</div>
                  </div>
                ) : <div className="text-sm opacity-60">Click a module on the map to inspect</div>}
              </div>

              {/* Timeline / time-lapse controls */}
              <div className="mt-6">
                <div className="flex items-center gap-3">
                  <button onClick={() => setIsPlaying(!isPlaying)} className="p-2 rounded bg-gradient-to-r from-green-500 to-blue-500">
                    {isPlaying ? <Pause /> : <Play />}
                  </button>
                  <div className="flex-1">
                    <input type="range" min="0" max="23" value={timeIndex} onChange={(e) => setTimeIndex(parseInt(e.target.value))} className="w-full" />
                    <div className="text-xs opacity-70">Orbit / timestep: {timeIndex}</div>
                  </div>
                  <button onClick={() => setView3D(!view3D)} className="px-3 py-2 rounded bg-white/5">{view3D ? '2D' : '3D'}</button>
                </div>
              </div>

            </div>
          </div>
        </main>
      </div>
    </div>
  );

  // small report uploader component
  function ReportUploader({ onUpload }) {
    const [title, setTitle] = useState('');
    const [desc, setDesc] = useState('');
    return (
      <div className="space-y-2">
        <input className="w-full p-2 rounded bg-white/5" placeholder="Report title" value={title} onChange={(e) => setTitle(e.target.value)} />
        <textarea className="w-full p-2 rounded bg-white/5" placeholder="Details" value={desc} onChange={(e) => setDesc(e.target.value)} />
        <div className="flex gap-2">
          <button onClick={() => { if (title) { onUpload({ title, desc }); setTitle(''); setDesc(''); } }} className="py-2 px-3 rounded bg-blue-600">Upload</button>
          <button onClick={() => { setTitle(''); setDesc(''); }} className="py-2 px-3 rounded bg-gray-600">Clear</button>
        </div>
      </div>
    );
  }


  // Top-level render
  return (
    <div className={bgClass}>
      {currentPage === 'landing' && <LandingPage />}
      {currentPage === 'dashboard' && <DashboardPage />}
      {currentPage === 'logs' && (
        <div className={`min-h-screen p-6 ${cardClass}`}>
          <Navigation />
          <div className="max-w-5xl mx-auto">
            <h2 className="text-2xl font-bold mb-4">Mission Logs</h2>
            <div className="space-y-3">
              <div className="p-3 rounded bg-white/5">[Sim] System health nominal — {new Date().toLocaleString()}</div>
              <div className="p-3 rounded bg-white/5">[Sim] Greenhouse growth report uploaded — {new Date().toLocaleString()}</div>
            </div>
          </div>
        </div>
      )}
      {currentPage === 'learn' && (
        <div className={`min-h-screen p-6 ${cardClass}`}>
          <Navigation />
          <div className="max-w-5xl mx-auto prose lg:prose-xl">
            <h2>About "Your Home in Space"</h2>
            <p>This simulation demonstrates a habitat dashboard: life support, telemetry, crew operations, and citizen-sourced reports. Replace placeholders with real telemetry or 3D renderers (Cesium, Three.js) to make it operational.</p>
            <ul>
              <li>Life support sensors: O₂, CO₂, temperature, humidity</li>
              <li>Power telemetry: solar arrays, batteries, power routing</li>
              <li>Radiation monitoring and alerts</li>
              <li>Crew tasking and EVA planning</li>
            </ul>
          </div>
        </div>
      )}
      
    </div>
  );
};

export default HabitatPage;

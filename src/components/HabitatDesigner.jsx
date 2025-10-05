import React, { useState, useRef, useEffect } from 'react';
import { Home, Zap, Users, Leaf, Grid3x3, Undo2, Redo2, RotateCcw, Download, Rocket, Sun, Package, Radio, Moon, Beaker, UtensilsCrossed, Bed, Dumbbell, Briefcase, Droplet, Wifi, AlertTriangle, Info, Eye, EyeOff, Wind, Thermometer } from 'lucide-react';
import {useNavigate} from 'react-router-dom'
import HabitatPage from './HabitatPage';

// Module Types Configuration

const MODULE_TYPES = {
  kitchen: {
    id: 'kitchen',
    name: 'Kitchen',
    icon: UtensilsCrossed,
    color: 'bg-orange-500',
    crew: 0,
    power: -3,
    oxygen: -1,
    space: 1,
    category: 'Living',
    description: 'Food preparation area',
    nasa_guidance: 'Should be central and accessible. Requires good ventilation.'
  },
  sleeping: {
    id: 'sleeping',
    name: 'Crew Quarters',
    icon: Bed,
    color: 'bg-blue-500',
    crew: 2,
    power: -1,
    oxygen: -2,
    space: 1,
    category: 'Living',
    description: 'Private sleeping area',
    nasa_guidance: 'Needs quiet zone, away from high-traffic areas. Min 2m distance from bathrooms.'
  },
  gym: {
    id: 'gym',
    name: 'Exercise Area',
    icon: Dumbbell,
    color: 'bg-red-500',
    crew: 0,
    power: -2,
    oxygen: -3,
    space: 1,
    category: 'Health',
    description: 'Fitness equipment',
    nasa_guidance: 'Critical for bone/muscle health. 2+ hours daily exercise required in microgravity.'
  },
  lab: {
    id: 'lab',
    name: 'Work Lab',
    icon: Briefcase,
    color: 'bg-purple-500',
    crew: 0,
    power: -4,
    oxygen: 0,
    space: 1,
    category: 'Work',
    description: 'Research and work station',
    nasa_guidance: 'Requires stable temperature and low vibration. Keep away from exercise areas.'
  },
  bathroom: {
    id: 'bathroom',
    name: 'Bathroom',
    icon: Droplet,
    color: 'bg-cyan-500',
    crew: 0,
    power: -2,
    oxygen: -1,
    space: 1,
    category: 'Living',
    description: 'Waste management',
    nasa_guidance: 'Must be 2+ cells away from sleeping/eating. Requires water recycling system.'
  },
  comms: {
    id: 'comms',
    name: 'Comm Hub',
    icon: Wifi,
    color: 'bg-indigo-500',
    crew: 0,
    power: -3,
    oxygen: 0,
    space: 1,
    category: 'Systems',
    description: 'Communications center',
    nasa_guidance: 'Central location preferred. Needs redundant power supply.'
  },
  solar: {
    id: 'solar',
    name: 'Solar Panel',
    icon: Sun,
    color: 'bg-yellow-500',
    crew: 0,
    power: 12,
    oxygen: 0,
    space: 1,
    category: 'Power',
    description: 'Power generation',
    nasa_guidance: 'Place on exterior. Each panel provides power for ~3 modules.'
  },
  greenhouse: {
    id: 'greenhouse',
    name: 'Greenhouse',
    icon: Leaf,
    color: 'bg-green-500',
    crew: 0,
    power: -3,
    oxygen: 8,
    space: 1,
    category: 'Life Support',
    description: 'Oxygen & food supply',
    nasa_guidance: 'Provides O2 for ~4 crew. Needs high power for grow lights.'
  },
  storage: {
    id: 'storage',
    name: 'Storage',
    icon: Package,
    color: 'bg-gray-500',
    crew: 0,
    power: 0,
    oxygen: 0,
    space: 1,
    category: 'Systems',
    description: 'Supply storage',
    nasa_guidance: 'Place near airlocks. Keep food storage separate from chemicals.'
  }
};

const TEMPLATES = [
  {
    id: 'mars',
    name: 'Mars Base Alpha',
    description: 'Sustainable Mars colony',
    crew: 6,
    duration: 18,
    gridSize: 10,
    modules: [
      { type: 'sleeping', x: 2, y: 2 }, { type: 'sleeping', x: 3, y: 2 }, { type: 'sleeping', x: 7, y: 2 },
      { type: 'kitchen', x: 5, y: 3 }, { type: 'lab', x: 3, y: 4 }, { type: 'lab', x: 6, y: 4 },
      { type: 'bathroom', x: 2, y: 5 }, { type: 'bathroom', x: 7, y: 5 },
      { type: 'gym', x: 5, y: 5 }, { type: 'greenhouse', x: 2, y: 6 }, { type: 'greenhouse', x: 7, y: 6 },
      { type: 'solar', x: 1, y: 1 }, { type: 'solar', x: 8, y: 1 }, { type: 'solar', x: 4, y: 1 },
      { type: 'comms', x: 5, y: 7 }, { type: 'storage', x: 4, y: 6 }
    ]
  },
  {
    id: 'moon',
    name: 'Lunar Outpost',
    description: 'Compact short-term base',
    crew: 4,
    duration: 6,
    gridSize: 8,
    modules: [
      { type: 'sleeping', x: 3, y: 3 }, { type: 'sleeping', x: 4, y: 3 },
      { type: 'kitchen', x: 3, y: 4 }, { type: 'lab', x: 4, y: 4 },
      { type: 'bathroom', x: 2, y: 5 }, { type: 'gym', x: 5, y: 5 },
      { type: 'solar', x: 2, y: 2 }, { type: 'solar', x: 5, y: 2 },
      { type: 'greenhouse', x: 3, y: 5 }, { type: 'comms', x: 4, y: 2 }
    ]
  },
  {
    id: 'station',
    name: 'Deep Space Station',
    description: 'Large research facility',
    crew: 8,
    duration: 24,
    gridSize: 12,
    modules: [
      { type: 'sleeping', x: 2, y: 2 }, { type: 'sleeping', x: 3, y: 2 }, { type: 'sleeping', x: 9, y: 2 }, { type: 'sleeping', x: 10, y: 2 },
      { type: 'kitchen', x: 5, y: 3 }, { type: 'kitchen', x: 7, y: 3 },
      { type: 'lab', x: 2, y: 4 }, { type: 'lab', x: 5, y: 4 }, { type: 'lab', x: 9, y: 4 },
      { type: 'bathroom', x: 2, y: 6 }, { type: 'bathroom', x: 9, y: 6 },
      { type: 'gym', x: 5, y: 6 }, { type: 'gym', x: 7, y: 6 },
      { type: 'greenhouse', x: 3, y: 7 }, { type: 'greenhouse', x: 6, y: 7 }, { type: 'greenhouse', x: 9, y: 7 },
      { type: 'solar', x: 1, y: 1 }, { type: 'solar', x: 6, y: 1 }, { type: 'solar', x: 11, y: 1 },
      { type: 'comms', x: 6, y: 8 }, { type: 'storage', x: 4, y: 8 }, { type: 'storage', x: 8, y: 8 }
    ]
  }
];

const StarField = () => {
  const [stars, setStars] = useState([]);
  useEffect(() => {
    const newStars = Array.from({ length: 100 }, (_, i) => ({
      id: i, x: Math.random() * 100, y: Math.random() * 100,
      size: Math.random() * 2 + 1, duration: Math.random() * 3 + 2
    }));
    setStars(newStars);
  }, []);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      {stars.map(star => (
        <div key={star.id} className="absolute bg-white rounded-full animate-pulse"
          style={{ left: `${star.x}%`, top: `${star.y}%`, width: `${star.size}px`,
            height: `${star.size}px`, animationDuration: `${star.duration}s` }} />
      ))}
    </div>
  );
};

const HabitatDesigner = () => {
    const navigate = useNavigate();

const goToHabitatpage = () => {
    navigate("/HabitatPage");
};
  const [currentPage, setCurrentPage] = useState('landing');
  const [placedModules, setPlacedModules] = useState([]);
  const [history, setHistory] = useState([[]]);
  const [historyIndex, setHistoryIndex] = useState(0);
  const [draggedModule, setDraggedModule] = useState(null);
  const [hoveredCell, setHoveredCell] = useState(null);
  const [zoom, setZoom] = useState(1);
  const [showAbout, setShowAbout] = useState(false);
  const [showChallenge, setShowChallenge] = useState(false);
  const [gridSize, setGridSize] = useState(8);
  const [crewSize, setCrewSize] = useState(4);
  const [missionDuration, setMissionDuration] = useState(6);
  const [hoveredModule, setHoveredModule] = useState(null);
  const [selectedModule, setSelectedModule] = useState(null);
  const [showOverlay, setShowOverlay] = useState(null);
  const [warnings, setWarnings] = useState([]);
  const [showReport, setShowReport] = useState(false);
  const canvasRef = useRef(null);

  const CELL_SIZE = 60;

  const stats = placedModules.reduce((acc, module) => {
    const type = MODULE_TYPES[module.type];
    return {
      crew: acc.crew + type.crew,
      power: acc.power + type.power,
      oxygen: acc.oxygen + type.oxygen,
      space: acc.space + type.space
    };
  }, { crew: 0, power: 0, oxygen: 0, space: 0 });

  // Calculate warnings
  useEffect(() => {
    const newWarnings = [];
    
    // Check power balance
    if (stats.power < 0) {
      newWarnings.push({ type: 'error', msg: '⚡ Insufficient power! Add more solar panels.' });
    }
    
    // Check oxygen balance
    const oxygenNeeded = crewSize * 2;
    if (stats.oxygen < oxygenNeeded) {
      newWarnings.push({ type: 'error', msg: `🌱 Need ${oxygenNeeded - stats.oxygen} more oxygen units for ${crewSize} crew!` });
    }
    
    // Check crew capacity
    if (stats.crew < crewSize) {
      newWarnings.push({ type: 'warning', msg: `🛏️ Need ${crewSize - stats.crew} more sleeping capacity!` });
    }
    
    // Check bathroom distance from sleeping
    placedModules.forEach(module => {
      if (module.type === 'bathroom') {
        placedModules.forEach(other => {
          if ((other.type === 'sleeping' || other.type === 'kitchen')) {
            const dist = Math.abs(module.x - other.x) + Math.abs(module.y - other.y);
            if (dist < 2) {
              newWarnings.push({ 
                type: 'warning', 
                msg: `🚽 Bathroom too close to ${other.type === 'sleeping' ? 'sleeping' : 'kitchen'} area (NASA: min 2 cells)` 
              });
            }
          }
        });
      }
    });
    
    // Check if gym exists for long missions
    const hasGymModule = placedModules.find(m => m.type === 'gym');
    if (missionDuration > 6 && !hasGymModule) {
      newWarnings.push({ type: 'warning', msg: '💪 Long missions require exercise facilities!' });
    }
    
    // Check crew density
    const areas = {};
    placedModules.forEach(m => {
      const key = `${Math.floor(m.x / 3)}-${Math.floor(m.y / 3)}`;
      areas[key] = (areas[key] || 0) + (MODULE_TYPES[m.type].crew || 0);
    });
    Object.entries(areas).forEach(([area, crew]) => {
      if (crew > 4) {
        newWarnings.push({ type: 'warning', msg: `👥 Too many crew in one area → poor air circulation` });
      }
    });

    setWarnings(newWarnings);
  }, [placedModules, crewSize, missionDuration, stats]);

  const addToHistory = (modules) => {
    const newHistory = history.slice(0, historyIndex + 1);
    newHistory.push(modules);
    setHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
  };

  const placeModule = (type, x, y) => {
    const exists = placedModules.find(m => m.x === x && m.y === y);
    if (exists) return;
    const newModules = [...placedModules, { type, x, y, id: Date.now() }];
    setPlacedModules(newModules);
    addToHistory(newModules);
  };

  const removeModule = (id) => {
    const newModules = placedModules.filter(m => m.id !== id);
    setPlacedModules(newModules);
    addToHistory(newModules);
    setSelectedModule(null);
  };

  const undo = () => {
    if (historyIndex > 0) {
      setHistoryIndex(historyIndex - 1);
      setPlacedModules(history[historyIndex - 1]);
    }
  };

  const redo = () => {
    if (historyIndex < history.length - 1) {
      setHistoryIndex(historyIndex + 1);
      setPlacedModules(history[historyIndex + 1]);
    }
  };

  const reset = () => {
    setPlacedModules([]);
    addToHistory([]);
  };

  const loadTemplate = (template) => {
    const modules = template.modules.map((m, i) => ({ ...m, id: Date.now() + i }));
    setPlacedModules(modules);
    addToHistory(modules);
    setGridSize(template.gridSize);
    setCrewSize(template.crew);
    setMissionDuration(template.duration);
    setCurrentPage('designer');
  };

  const exportImage = () => {
    alert('Screenshot saved! (In a real app, this would download a PNG)');
  };

  // Generate detailed NASA-quality report
  const generateReport = () => {
    const location = missionDuration > 12 ? 'Mars Surface' : missionDuration > 6 ? 'Lunar South Pole' : 'Low Earth Orbit';
    const hasGym = placedModules.find(m => m.type === 'gym');
    const hasGreenhouse = placedModules.filter(m => m.type === 'greenhouse').length;
    const hasSolar = placedModules.filter(m => m.type === 'solar').length;
    const hasLab = placedModules.find(m => m.type === 'lab');
    const hasBathroom = placedModules.find(m => m.type === 'bathroom');
    const hasSleeping = placedModules.filter(m => m.type === 'sleeping').length;
    const hasKitchen = placedModules.find(m => m.type === 'kitchen');
    const hasComms = placedModules.find(m => m.type === 'comms');
    
    return {
      location,
      hasGym,
      hasGreenhouse,
      hasSolar,
      hasLab,
      hasBathroom,
      hasSleeping,
      hasKitchen,
      hasComms,
      powerPerCrew,
      oxygenPerCrew,
      radiationShielding: location === 'Mars Surface' ? 'Regolith 2.5m' : location === 'Lunar South Pole' ? 'Regolith 3m + Water Walls' : 'Multi-layer Kevlar',
      launchMethod: gridSize <= 10 ? 'Single SpaceX Starship' : 'Multiple Falcon Heavy launches',
      assemblyMethod: gridSize <= 8 ? 'Pre-integrated module' : 'Robotic assembly with astronaut supervision',
      gravitySystem: location === 'Low Earth Orbit' ? 'Rotating torus (4 RPM, 56m radius)' : 'Natural planetary gravity',
      communicationDelay: location === 'Mars Surface' ? '4-24 minutes' : location === 'Lunar South Pole' ? '1.3 seconds' : 'Near-instantaneous'
    };
  };

  // Calculate overlay visualization
  const getOverlayData = () => {
    if (!showOverlay) return null;
    
    const data = Array(gridSize).fill(null).map(() => Array(gridSize).fill(0));
    
    placedModules.forEach(module => {
      const type = MODULE_TYPES[module.type];
      let value = 0;
      
      if (showOverlay === 'oxygen') value = type.oxygen;
      else if (showOverlay === 'power') value = type.power;
      else if (showOverlay === 'temp') value = type.power < 0 ? 5 : 0;
      
      // Spread effect to adjacent cells
      for (let dx = -1; dx <= 1; dx++) {
        for (let dy = -1; dy <= 1; dy++) {
          const nx = module.x + dx;
          const ny = module.y + dy;
          if (nx >= 0 && nx < gridSize && ny >= 0 && ny < gridSize) {
            data[ny][nx] += value * (dx === 0 && dy === 0 ? 1 : 0.3);
          }
        }
      }
    });
    
    return data;
  };

  const overlayData = getOverlayData();

  const oxygenPerCrew = crewSize > 0 ? stats.oxygen / crewSize : 0;
  const powerPerCrew = crewSize > 0 ? stats.power / crewSize : 0;


  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 text-white">
      <StarField />
      
      <div className="relative z-10 bg-slate-900 bg-opacity-50 backdrop-blur-sm border-b border-slate-700 p-4">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <button onClick={goToHabitatpage}
            className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg">← Go To Previous Page</button>
          <h1 className="text-2xl font-bold">Habitat Designer</h1>
          <div className="flex gap-2 flex-wrap">
            <button onClick={() => setShowReport(true)}
              className="px-4 py-2 bg-cyan-600 hover:bg-cyan-700 rounded-lg flex items-center gap-2">
              <Info className="w-4 h-4" /> NASA Report
            </button>
            <button onClick={() => setShowChallenge(!showChallenge)}
              className="px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg">Challenge</button>
            <button onClick={exportImage}
              className="px-4 py-2 bg-green-600 hover:bg-green-700 rounded-lg flex items-center gap-2">
              <Download className="w-4 h-4" /> Export
            </button>
          </div>
        </div>
      </div>

      <div className="relative z-10 flex h-[calc(100vh-73px)]">
        <div className="w-64 bg-slate-800 bg-opacity-50 backdrop-blur-sm border-r border-slate-700 p-4 overflow-y-auto">
          <h2 className="text-xl font-bold mb-4">Configuration</h2>
          
          <div className="mb-4 p-3 bg-slate-700 rounded-lg">
            <label className="block text-sm mb-1">Grid Size: {gridSize}x{gridSize}</label>
            <input type="range" min="6" max="16" value={gridSize} 
              onChange={(e) => setGridSize(Number(e.target.value))}
              className="w-full" />
          </div>

          <div className="mb-4 p-3 bg-slate-700 rounded-lg">
            <label className="block text-sm mb-1">👥 Crew: {crewSize}</label>
            <input type="range" min="2" max="12" value={crewSize} 
              onChange={(e) => setCrewSize(Number(e.target.value))}
              className="w-full" />
          </div>

          <div className="mb-4 p-3 bg-slate-700 rounded-lg">
            <label className="block text-sm mb-1">📅 Mission: {missionDuration} mo</label>
            <input type="range" min="1" max="36" value={missionDuration} 
              onChange={(e) => setMissionDuration(Number(e.target.value))}
              className="w-full" />
          </div>

          <div className="mb-4 p-3 bg-slate-700 rounded-lg">
            <label className="block text-sm mb-2">Overlays:</label>
            <div className="space-y-1">
              <button onClick={() => setShowOverlay(showOverlay === 'oxygen' ? null : 'oxygen')}
                className={`w-full px-2 py-1 rounded text-sm ${showOverlay === 'oxygen' ? 'bg-green-600' : 'bg-slate-600'}`}>
                <Wind className="w-3 h-3 inline mr-1" /> Oxygen Flow
              </button>
              <button onClick={() => setShowOverlay(showOverlay === 'power' ? null : 'power')}
                className={`w-full px-2 py-1 rounded text-sm ${showOverlay === 'power' ? 'bg-yellow-600' : 'bg-slate-600'}`}>
                <Zap className="w-3 h-3 inline mr-1" /> Power Grid
              </button>
              <button onClick={() => setShowOverlay(showOverlay === 'temp' ? null : 'temp')}
                className={`w-full px-2 py-1 rounded text-sm ${showOverlay === 'temp' ? 'bg-red-600' : 'bg-slate-600'}`}>
                <Thermometer className="w-3 h-3 inline mr-1" /> Heat Zones
              </button>
            </div>
          </div>

          <h2 className="text-xl font-bold mb-3 mt-6">Modules</h2>
          <div className="space-y-2">
            {Object.values(MODULE_TYPES).map(module => {
              const Icon = module.icon;
              return (
                <div key={module.id} draggable onDragStart={() => setDraggedModule(module.id)}
                  onMouseEnter={() => setHoveredModule(module.id)}
                  onMouseLeave={() => setHoveredModule(null)}
                  className={`${module.color} p-3 rounded-lg cursor-move hover:opacity-80 transition-opacity relative`}>
                  <div className="flex items-center gap-2 mb-1">
                    <Icon className="w-4 h-4" />
                    <span className="font-semibold text-sm">{module.name}</span>
                  </div>
                  <p className="text-xs opacity-90">{module.description}</p>
                  <div className="text-xs mt-1 flex gap-2">
                    {module.crew !== 0 && <span>👥{module.crew > 0 ? '+' : ''}{module.crew}</span>}
                    {module.power !== 0 && <span>⚡{module.power > 0 ? '+' : ''}{module.power}</span>}
                    {module.oxygen !== 0 && <span>🌱{module.oxygen > 0 ? '+' : ''}{module.oxygen}</span>}
                  </div>
                  
                  {hoveredModule === module.id && (
                    <div className="absolute left-full ml-2 top-0 bg-slate-900 p-3 rounded-lg shadow-xl w-64 z-50 border border-slate-600">
                      <div className="flex items-start gap-2 mb-2">
                        <Info className="w-4 h-4 text-blue-400 flex-shrink-0 mt-0.5" />
                        <p className="text-xs text-gray-300">{module.nasa_guidance}</p>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        <div className="flex-1 flex flex-col">
          <div className="bg-slate-800 bg-opacity-50 backdrop-blur-sm border-b border-slate-700 p-2 flex gap-2 items-center">
            <button onClick={undo} disabled={historyIndex === 0}
              className="p-2 bg-gray-700 hover:bg-gray-600 rounded disabled:opacity-50">
              <Undo2 className="w-5 h-5" />
            </button>
            <button onClick={redo} disabled={historyIndex === history.length - 1}
              className="p-2 bg-gray-700 hover:bg-gray-600 rounded disabled:opacity-50">
              <Redo2 className="w-5 h-5" />
            </button>
            <button onClick={reset} className="p-2 bg-red-700 hover:bg-red-600 rounded">
              <RotateCcw className="w-5 h-5" />
            </button>
            <div className="flex-1" />
            <button onClick={() => setZoom(Math.max(0.5, zoom - 0.1))}
              className="p-2 bg-gray-700 hover:bg-gray-600 rounded">-</button>
            <span className="px-3 py-2">{Math.round(zoom * 100)}%</span>
            <button onClick={() => setZoom(Math.min(2, zoom + 0.1))}
              className="p-2 bg-gray-700 hover:bg-gray-600 rounded">+</button>
          </div>

          {warnings.length > 0 && (
            <div className="bg-red-900 bg-opacity-50 border-b border-red-700 p-2 max-h-24 overflow-y-auto">
              {warnings.map((w, i) => (
                <div key={i} className={`flex items-center gap-2 text-sm mb-1 ${w.type === 'error' ? 'text-red-200' : 'text-yellow-200'}`}>
                  <AlertTriangle className="w-4 h-4" />
                  <span>{w.msg}</span>
                </div>
              ))}
            </div>
          )}

          <div className="flex-1 overflow-auto p-8 flex items-center justify-center relative">
            <div ref={canvasRef} className="inline-grid gap-1 bg-slate-900 bg-opacity-50 p-4 rounded-lg relative"
              style={{ gridTemplateColumns: `repeat(${gridSize}, ${CELL_SIZE}px)`, transform: `scale(${zoom})` }}>
              
              {Array.from({ length: gridSize * gridSize }, (_, i) => {
                const x = i % gridSize;
                const y = Math.floor(i / gridSize);
                const module = placedModules.find(m => m.x === x && m.y === y);
                const isHovered = hoveredCell?.x === x && hoveredCell?.y === y;
                
                let overlayColor = '';
                if (overlayData && showOverlay) {
                  const value = overlayData[y][x];
                  if (showOverlay === 'oxygen') {
                    overlayColor = value > 0 ? `rgba(34, 197, 94, ${Math.min(value / 10, 0.6)})` : 
                                   value < 0 ? `rgba(239, 68, 68, ${Math.min(Math.abs(value) / 5, 0.4)})` : '';
                  } else if (showOverlay === 'power') {
                    overlayColor = value > 0 ? `rgba(234, 179, 8, ${Math.min(value / 15, 0.6)})` : 
                                   value < 0 ? `rgba(239, 68, 68, ${Math.min(Math.abs(value) / 5, 0.4)})` : '';
                  } else if (showOverlay === 'temp') {
                    overlayColor = value > 0 ? `rgba(239, 68, 68, ${Math.min(value / 10, 0.5)})` : '';
                  }
                }

                return (
                  <div key={i}
                    onDragOver={(e) => { e.preventDefault(); setHoveredCell({ x, y }); }}
                    onDragLeave={() => setHoveredCell(null)}
                    onDrop={(e) => {
                      e.preventDefault();
                      if (draggedModule) {
                        placeModule(draggedModule, x, y);
                        setDraggedModule(null);
                        setHoveredCell(null);
                      }
                    }}
                    onClick={() => {
                      if (module) setSelectedModule(module);
                    }}
                    className={`border-2 border-slate-700 rounded transition-all cursor-pointer relative ${
                      isHovered ? 'bg-blue-500 bg-opacity-30 border-blue-400' : 'bg-slate-800 bg-opacity-30'
                    }`}
                    style={{ width: `${CELL_SIZE}px`, height: `${CELL_SIZE}px`, backgroundColor: overlayColor || undefined }}>
                    
                    {module && (() => {
                      const moduleType = MODULE_TYPES[module.type];
                      const Icon = moduleType.icon;
                      return (
                        <div className={`w-full h-full ${moduleType.color} rounded flex items-center justify-center group`}>
                          <Icon className="w-8 h-8" />
                          {selectedModule?.id === module.id && (
                            <div className="absolute inset-0 border-4 border-white rounded animate-pulse pointer-events-none" />
                          )}
                        </div>
                      );
                    })()}
                  </div>
                );
              })}
            </div>
            
            {/* Animated astronaut */}
            <div className="absolute bottom-4 left-4 animate-[bounce_3s_ease-in-out_infinite]">
              <Users className="w-8 h-8 text-blue-400" />
            </div>
          </div>
        </div>

        <div className="w-64 bg-slate-800 bg-opacity-50 backdrop-blur-sm border-l border-slate-700 p-4 overflow-y-auto">
          <h2 className="text-xl font-bold mb-4">Stats</h2>
          
          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-1">
                <span className="flex items-center gap-1"><Users className="w-4 h-4" /> Crew</span>
                <span className="font-bold">{stats.crew} / {crewSize}</span>
              </div>
              <div className="w-full bg-slate-700 rounded-full h-2">
                <div className={`h-2 rounded-full transition-all ${stats.crew >= crewSize ? 'bg-green-500' : 'bg-red-500'}`}
                  style={{ width: `${Math.min(100, (stats.crew / crewSize) * 100)}%` }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between mb-1">
                <span className="flex items-center gap-1"><Zap className="w-4 h-4" /> Power</span>
                <span className={`font-bold ${stats.power < 0 ? 'text-red-400' : 'text-green-400'}`}>
                  {stats.power > 0 ? '+' : ''}{stats.power}
                </span>
              </div>
              <div className="w-full bg-slate-700 rounded-full h-2">
                <div className={`h-2 rounded-full transition-all ${stats.power >= 0 ? 'bg-green-500' : 'bg-red-500'}`}
                  style={{ width: `${Math.min(100, Math.abs(stats.power / 30) * 100)}%` }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between mb-1">
                <span className="flex items-center gap-1"><Leaf className="w-4 h-4" /> Oxygen</span>
                <span className={`font-bold ${stats.oxygen < crewSize * 2 ? 'text-red-400' : 'text-green-400'}`}>
                  {stats.oxygen} / {crewSize * 2}
                </span>
              </div>
              <div className="w-full bg-slate-700 rounded-full h-2">
                <div className={`h-2 rounded-full transition-all ${stats.oxygen >= crewSize * 2 ? 'bg-green-500' : 'bg-red-500'}`}
                  style={{ width: `${Math.min(100, (stats.oxygen / (crewSize * 2)) * 100)}%` }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between mb-1">
                <span className="flex items-center gap-1"><Grid3x3 className="w-4 h-4" /> Modules</span>
                <span className="font-bold">{stats.space} / {gridSize * gridSize}</span>
              </div>
              <div className="w-full bg-slate-700 rounded-full h-2">
                <div className="bg-purple-500 h-2 rounded-full transition-all"
                  style={{ width: `${(stats.space / (gridSize * gridSize)) * 100}%` }} />
              </div>
            </div>
          </div>

          {selectedModule && (
            <div className="mt-6 p-4 bg-slate-700 rounded-lg">
              <div className="flex justify-between items-start mb-3">
                <h3 className="font-bold">Selected Module</h3>
                <button onClick={() => removeModule(selectedModule.id)}
                  className="text-red-400 hover:text-red-300">Remove</button>
              </div>
              {(() => {
                const type = MODULE_TYPES[selectedModule.type];
                const Icon = type.icon;
                return (
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Icon className="w-5 h-5" />
                      <span className="font-semibold">{type.name}</span>
                    </div>
                    <p className="text-sm text-gray-400 mb-2">{type.description}</p>
                    <div className="text-xs bg-slate-600 p-2 rounded mb-2">
                      <div className="flex items-start gap-1">
                        <Info className="w-3 h-3 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-300">{type.nasa_guidance}</span>
                      </div>
                    </div>
                    <div className="text-sm space-y-1">
                      <div>Category: <span className="text-gray-400">{type.category}</span></div>
                      <div>Position: <span className="text-gray-400">({selectedModule.x}, {selectedModule.y})</span></div>
                    </div>
                  </div>
                );
              })()}
            </div>
          )}

          {showChallenge && (
            <div className="mt-6 p-4 bg-purple-900 bg-opacity-50 rounded-lg">
              <h3 className="font-bold mb-2">🎯 Challenge Mode</h3>
              <p className="text-sm mb-3">Mission: {missionDuration} months, {crewSize} crew</p>
              <ul className="text-sm space-y-1">
                <li className={stats.crew >= crewSize ? 'text-green-400' : ''}>
                  ✓ {crewSize}+ crew capacity
                </li>
                <li className={stats.power >= 5 ? 'text-green-400' : ''}>
                  ✓ 5+ power surplus
                </li>
                <li className={stats.oxygen >= crewSize * 2 ? 'text-green-400' : ''}>
                  ✓ {crewSize * 2}+ oxygen output
                </li>
                <li className={placedModules.find(m => m.type === 'gym') ? 'text-green-400' : ''}>
                  ✓ Exercise facility
                </li>
                <li className={warnings.length === 0 ? 'text-green-400' : ''}>
                  ✓ No warnings
                </li>
              </ul>
              {stats.crew >= crewSize && stats.power >= 5 && stats.oxygen >= crewSize * 2 && 
               placedModules.find(m => m.type === 'gym') && warnings.length === 0 && (
                <div className="mt-3 p-2 bg-green-600 rounded text-center font-bold animate-pulse">
                  🎉 Mission Ready!
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* NASA Quality Report Modal */}
      {showReport && (() => {
        const report = generateReport();
        const hasGymModule = placedModules.find(m => m.type === 'gym');
        const hasBathroomModule = placedModules.find(m => m.type === 'bathroom');
        const hasKitchenModule = placedModules.find(m => m.type === 'kitchen');
        const hasLabModule = placedModules.find(m => m.type === 'lab');
        const hasCommsModule = placedModules.find(m => m.type === 'comms');
        
        return (
          <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4 z-50 overflow-y-auto">
            <div className="bg-slate-800 rounded-lg p-8 max-w-5xl max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="text-3xl font-bold mb-2">NASA Habitat Technical Report</h2>
                  <p className="text-gray-400">Mission ID: {Date.now().toString(36).toUpperCase()}</p>
                </div>
                <button onClick={() => setShowReport(false)}
                  className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg">Close</button>
              </div>

              {/* 1. Location & Purpose */}
              <div className="mb-6 p-4 bg-slate-700 rounded-lg">
                <h3 className="text-xl font-bold mb-3 flex items-center gap-2">
                  <Moon className="w-5 h-5" /> 1. Location & Purpose
                </h3>
                <div className="space-y-2 text-sm">
                  <p><strong>Location:</strong> {report.location}</p>
                  <p><strong>Mission Duration:</strong> {missionDuration} months • <strong>Crew:</strong> {crewSize} astronauts</p>
                  <p className="text-gray-300">
                    {report.location === 'Mars Surface' && 
                      "Selected for abundant water ice at mid-latitudes, 38% Earth gravity reducing muscle atrophy, and protection from solar radiation via 2.5m regolith shielding. Communication delay: 4-24 minutes requires autonomous operations."}
                    {report.location === 'Lunar South Pole' && 
                      "Chosen for permanent sunlight exposure (99.7% solar availability) at Shackleton Crater rim, water ice access in permanently shadowed regions, and 1.3-second communication delay enabling real-time Earth support. Strategic staging point for deep space missions."}
                    {report.location === 'Low Earth Orbit' && 
                      "400km altitude provides microgravity research environment, near-instantaneous communication, and easier crew rotation. Protection from Van Allen radiation belts while maintaining visual Earth contact for psychological wellbeing."}
                  </p>
                </div>
              </div>

              {/* 2. Habitat Design */}
              <div className="mb-6 p-4 bg-slate-700 rounded-lg">
                <h3 className="text-xl font-bold mb-3 flex items-center gap-2">
                  <Home className="w-5 h-5" /> 2. Habitat Design & Structure
                </h3>
                <div className="space-y-2 text-sm">
                  <p><strong>Materials:</strong> Aluminum-lithium alloy (2195) primary structure, Kevlar micrometeorite shielding (15 layers), {report.radiationShielding} radiation protection</p>
                  <p><strong>Launch Method:</strong> {report.launchMethod}</p>
                  <p><strong>Assembly:</strong> {report.assemblyMethod}</p>
                  <p className="text-gray-300">
                    Floor plan ({gridSize}×{gridSize}m grid): {report.hasSleeping} crew quarters providing privacy and acoustic isolation, 
                    {report.hasLab ? ' dedicated research laboratory with vibration dampening,' : ''} 
                    {report.hasKitchen ? ' central galley with magnetic meal prep surfaces,' : ''} 
                    {report.hasGym ? ' exercise area with resistive equipment (ARED-style),' : ''} 
                    {report.hasGreenhouse} greenhouse module(s) with LED grow lights, 
                    {report.hasBathroom ? ' waste management facility with suction-based systems,' : ''} 
                    and pressurized airlocks. Inflatable BEAM-style modules expand usable volume by 40% while maintaining less than 3kg/m² mass.
                  </p>
                  <p className="text-gray-300">
                    <strong>Protection:</strong> Triple-redundant pressure hull, Whipple shield (aluminum bumper + Nextel ceramic fabric + Kevlar backstop) defeats 1cm projectiles at 7km/s. Internal bladder prevents catastrophic decompression.
                  </p>
                </div>
              </div>

              {/* 3. Life Support */}
              <div className="mb-6 p-4 bg-slate-700 rounded-lg">
                <h3 className="text-xl font-bold mb-3 flex items-center gap-2">
                  <Wind className="w-5 h-5" /> 3. Life Support Systems
                </h3>
                <div className="space-y-2 text-sm">
                  <p><strong>Water Recycling:</strong> 98% recovery via Vapor Compression Distillation + multifiltration. Urine distillate → potable water (6L/person/day). Humidity condensation captures respiration moisture.</p>
                  <p><strong>Air Recycling:</strong> CO₂ scrubbing via 4-bed molecular sieve (zeolite 5A/13X), oxygen regeneration through Sabatier reactor (CO₂ + H₂ → CH₄ + H₂O) + electrolysis. Maintains 21% O₂, 101.3kPa, less than 0.5% CO₂.</p>
                  <p><strong>Waste Management:</strong> Solid waste compaction and vacuum desiccation (90% volume reduction). Composting of organic matter for greenhouse fertilizer. Closed-loop nitrogen recycling.</p>
                  <p><strong>Environmental Control:</strong> Active thermal control via ammonia coolant loops (−10°C to +50°C range). Pressure maintained at 14.7 PSI with ±0.2 PSI tolerance. HEPA filtration removes particulates greater than 0.3μm.</p>
                  <p className="text-green-400"><strong>Current O₂ Status:</strong> {report.oxygenPerCrew.toFixed(1)} units/crew (target: 2.0+) {stats.oxygen >= crewSize * 2 ? '✓ NOMINAL' : '⚠ INSUFFICIENT'}</p>
                </div>
              </div>

              {/* 4. Power & Energy */}
              <div className="mb-6 p-4 bg-slate-700 rounded-lg">
                <h3 className="text-xl font-bold mb-3 flex items-center gap-2">
                  <Zap className="w-5 h-5" /> 4. Power & Energy Systems
                </h3>
                <div className="space-y-2 text-sm">
                  <p><strong>Primary Source:</strong> {report.hasSolar} deployable solar arrays (each 20m², 30% efficiency triple-junction GaInP/GaAs/Ge cells) generating {stats.power > 0 ? stats.power : 0}kW peak</p>
                  <p><strong>Backup:</strong> {report.location === 'Mars Surface' ? 'Kilopower reactor (10kW fission)' : 'Li-ion battery bank (100kWh)'} ensures 14-day autonomy during dust storms or eclipses</p>
                  <p><strong>Distribution:</strong> 120V DC bus, smart load management prioritizes: life support (40%) → thermal (25%) → science (20%) → crew comfort (15%)</p>
                  <p><strong>Conservation:</strong> LED lighting (5W/m²), heat recovery ventilation, automated sleep mode for non-critical systems</p>
                  <p className={`${stats.power >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                    <strong>Power Budget:</strong> {stats.power}kW net ({report.powerPerCrew >= 2 ? 'SURPLUS' : 'DEFICIT'}) • Target: 2kW/crew minimum
                  </p>
                </div>
              </div>

              {/* 5. Gravity & Mobility */}
              <div className="mb-6 p-4 bg-slate-700 rounded-lg">
                <h3 className="text-xl font-bold mb-3 flex items-center gap-2">
                  <Users className="w-5 h-5" /> 5. Gravity & Mobility
                </h3>
                <div className="space-y-2 text-sm">
                  <p><strong>Gravity Environment:</strong> {report.gravitySystem}</p>
                  {report.location === 'Low Earth Orbit' && (
                    <p className="text-gray-300">Rotating habitat generates 1g centrifugal force. 56m radius at 4 RPM prevents Coriolis effect disorientation. Central zero-g hub for microgravity research.</p>
                  )}
                  <p><strong>Countermeasures:</strong> {report.hasGym ? 'Advanced Resistive Exercise Device (ARED) provides 270kg loading, Cycle Ergometer with Vibration Isolation (CEVIS), and treadmill with harness system. Mandatory 2.5 hr/day exercise prevents 1-2% bone density loss/month.' : '⚠ NO EXERCISE FACILITY - Critical for missions over 30 days'}</p>
                  <p><strong>Mobility:</strong> Handrails every 0.6m, velcro foot restraints, body restraint tethers. Automated logistics module (ALM) transports cargo. Color-coded pathways (blue=sleep, green=work, red=emergency).</p>
                </div>
              </div>

              {/* 6. Human Habitability */}
              <div className="mb-6 p-4 bg-slate-700 rounded-lg">
                <h3 className="text-xl font-bold mb-3 flex items-center gap-2">
                  <Bed className="w-5 h-5" /> 6. Human Habitability
                </h3>
                <div className="space-y-2 text-sm">
                  <p><strong>Crew Quarters:</strong> {report.hasSleeping} private 2m×2m×2m sleep stations with acoustic foam (NC-40 noise criteria), personalized airflow, and circadian lighting (2700K-6500K, 200-500 lux)</p>
                  <p><strong>Hygiene:</strong> {report.hasBathroom ? 'Wet wipes + waterless soap for daily cleaning. Vacuum shower every 3 days (6L water). Suction-based toilet with odor control.' : '⚠ No dedicated hygiene facility'}</p>
                  <p><strong>Food System:</strong> {report.hasKitchen ? 'Rehydration station, convection oven, and magnetic utensil storage. Menu: 70% shelf-stable, 30% fresh from greenhouse.' : 'Basic food preparation only'} Caloric intake: 2500-3000 kcal/day</p>
                  <p><strong>Hydroponics:</strong> {report.hasGreenhouse} {report.hasGreenhouse > 0 ? `greenhouse module(s) growing lettuce, tomatoes, peppers in aeroponic towers. Provides ${(report.hasGreenhouse * 0.2).toFixed(1)}kg fresh produce/day + psychological benefits of gardening.` : 'No greenhouse modules present'}</p>
                  <p><strong>Mental Health:</strong> 
                    {report.location !== 'Low Earth Orbit' ? ' High-res displays show real-time Earth view. ' : ' Large cupola windows (0.8m diameter). '}
                    VR relaxation chamber, private communication booths, library of 10,000+ books/films. Adjustable circadian lighting mimics Earth day-night (24hr cycle). Group activities scheduled weekly.
                  </p>
                </div>
              </div>

              {/* 7. Safety & Emergency */}
              <div className="mb-6 p-4 bg-slate-700 rounded-lg">
                <h3 className="text-xl font-bold mb-3 flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-yellow-400" /> 7. Safety & Emergency Systems
                </h3>
                <div className="space-y-2 text-sm">
                  <p><strong>Airlocks:</strong> Dual-door design with pressure equalization chamber. Emergency rapid repressurization (2 min to 1 atm). Suit donning station integrated.</p>
                  <p><strong>Fire Suppression:</strong> Water mist system + CO₂ extinguishers. Smoke detectors every 3m. Fireproof partitions isolate sections. Vacuum venting as last resort.</p>
                  <p><strong>Leak Detection:</strong> Ultrasonic sensors detect 0.1mm holes. Automated sealant deployment + crew-accessible patch kits. Safe haven module maintains pressure for 48hr.</p>
                  <p><strong>Emergency Oxygen:</strong> 30-day backup from solid fuel oxygen generators (SFOG). Pressure suits available within 60 seconds.</p>
                  <p><strong>Communication:</strong> {report.hasComms ? `Redundant Ka-band (32 GHz) + S-band (2 GHz) antennas. Delay: ${report.communicationDelay}. Autonomous AI handles time-critical decisions during blackouts.` : '⚠ No dedicated comms hub - relies on distributed antennas'}</p>
                </div>
              </div>

              {/* 8. Robotics & Automation */}
              <div className="mb-6 p-4 bg-slate-700 rounded-lg">
                <h3 className="text-xl font-bold mb-3 flex items-center gap-2">
                  <Rocket className="w-5 h-5" /> 8. Robotics & Automation
                </h3>
                <div className="space-y-2 text-sm">
                  <p><strong>Maintenance Robots:</strong> 2× Robonaut-style humanoid robots perform EVA repairs, module inspection, and sample collection. 16-hour autonomous operation.</p>
                  <p><strong>Drones:</strong> Quadcopter surveillance drones map exterior every 48hr, detecting micrometeorite damage. Interior drones monitor air quality and perform inventory.</p>
                  <p><strong>AI Systems:</strong> ECLSS (Environmental Control & Life Support System) AI optimizes resource allocation. Predictive maintenance algorithms reduce failures by 60%. Voice-activated "Habitat Assistant" answers crew queries.</p>
                  <p><strong>Smart Monitoring:</strong> 200+ sensors track: vitals (HR, BP, SpO₂), habitat pressure, radiation, power draw, water quality. Dashboard alerts crew to anomalies. Weekly health checks automated.</p>
                </div>
              </div>

              {/* 9. Sustainability */}
              <div className="mb-6 p-4 bg-slate-700 rounded-lg">
                <h3 className="text-xl font-bold mb-3 flex items-center gap-2">
                  <Leaf className="w-5 h-5" /> 9. Sustainability & Future Expansion
                </h3>
                <div className="space-y-2 text-sm">
                  <p><strong>Growth Potential:</strong> Modular design allows adding {Math.floor(gridSize * 0.5)} more modules. Current capacity: {crewSize} → expandable to {crewSize * 3}</p>
                  <p><strong>Local Resources (ISRU):</strong> 
                    {report.location === 'Mars Surface' && ' Regolith 3D printing for radiation shielding. Sabatier reactor produces methane fuel from atmospheric CO₂. Water extraction from subsurface ice deposits.'}
                    {report.location === 'Lunar South Pole' && ' Regolith sintering creates landing pads and foundations. Ice mining from PSRs provides water/oxygen. Oxygen extraction from ilmenite (FeTiO₃) via hydrogen reduction.'}
                    {report.location === 'Low Earth Orbit' && ' Orbital debris collection for raw materials. Water recycling eliminates resupply. Future orbital refueling depot integration.'}
                  </p>
                  <p><strong>Mission Integration:</strong> Compatible with Artemis/Gateway architecture. Can serve as staging base for {report.location === 'Lunar South Pole' ? 'Mars missions' : 'asteroid mining operations'}. Docking ports accept SpaceX Dragon, Boeing Starliner, and international crew vehicles.</p>
                </div>
              </div>

              {/* 10. Visualization */}
              <div className="mb-6 p-4 bg-slate-700 rounded-lg">
                <h3 className="text-xl font-bold mb-3 flex items-center gap-2">
                  <Eye className="w-5 h-5" /> 10. Visualization & Daily Life
                </h3>
                <div className="space-y-2 text-sm">
                  <p><strong>Interior Aesthetic:</strong> Clean white Nomex fabric walls with wood-grain accents (psychological warmth). Soft blue LED accent lighting. Curved edges reduce injury risk. Plants throughout provide biophilic connection.</p>
                  <p><strong>Daily Routine:</strong> 0700-Wake (sunrise simulation), 0730-Breakfast in galley, 0800-1200 Science/maintenance, 1200-Lunch, 1300-1700 Experiments, 1700-1900 Exercise, 1900-Dinner, 2000-Personal time/comms with Earth, 2200-Sleep (sunset fade).</p>
                  <p><strong>Exterior:</strong> Gleaming white thermal control coating. {report.hasSolar} deployable solar arrays (40m span) track sunlight. Parabolic Ka-band antenna (3m dish). Docking ports with blue LED approach lights. Landing legs with crushable honeycomb shock absorbers.</p>
                  <p><strong>Interaction:</strong> Touchscreens control lighting/temperature. Magnetic meal trays, velcro slippers. Sleeping bags attach to walls. Weekly movie nights in common area. Science samples processed in glovebox. Real-time Earth video calls boost morale.</p>
                </div>
              </div>

              {/* Summary */}
              <div className="p-4 bg-gradient-to-r from-blue-900 to-purple-900 rounded-lg">
                <h3 className="text-xl font-bold mb-2">Mission Readiness Assessment</h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className={stats.crew >= crewSize ? 'text-green-400' : 'text-red-400'}>
                      ✓ Crew Capacity: {stats.crew >= crewSize ? 'ADEQUATE' : 'INSUFFICIENT'}
                    </p>
                    <p className={stats.power >= 0 ? 'text-green-400' : 'text-red-400'}>
                      ✓ Power: {stats.power >= 0 ? 'POSITIVE BUDGET' : 'DEFICIT'}
                    </p>
                    <p className={stats.oxygen >= crewSize * 2 ? 'text-green-400' : 'text-red-400'}>
                      ✓ Oxygen: {stats.oxygen >= crewSize * 2 ? 'SUFFICIENT' : 'INSUFFICIENT'}
                    </p>
                  </div>
                  <div>
                    <p className={hasGym ? 'text-green-400' : 'text-yellow-400'}>
                      ✓ Exercise: {hasGym ? 'PRESENT' : 'MISSING'}
                    </p>
                    <p className={hasBathroom ? 'text-green-400' : 'text-yellow-400'}>
                      ✓ Hygiene: {hasBathroom ? 'EQUIPPED' : 'BASIC ONLY'}
                    </p>
                    <p className={warnings.length === 0 ? 'text-green-400' : 'text-yellow-400'}>
                      ✓ Warnings: {warnings.length === 0 ? 'NONE' : `${warnings.length} ACTIVE`}
                    </p>
                  </div>
                </div>
                <p className="mt-4 text-center font-bold text-lg">
                  {stats.crew >= crewSize && stats.power >= 0 && stats.oxygen >= crewSize * 2 && hasGym && warnings.length === 0
                    ? '🚀 MISSION GO FOR LAUNCH'
                    : '⚠️ FURTHER OPTIMIZATION REQUIRED'}
                </p>
              </div>

              <div className="mt-6 text-center text-xs text-gray-500">
                <p>Report generated based on NASA Technical Standards (NASA-STD-3001, NASA-STD-3000)</p>
                <p>Design references: ISS, Gateway, Mars Design Reference Architecture 5.0</p>
              </div>
            </div>
          </div>
        );
      })()}
    </div>
  );
};

export default HabitatDesigner;
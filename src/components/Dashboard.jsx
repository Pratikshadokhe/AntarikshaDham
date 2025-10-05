import React, { useState } from 'react';
import ReportModal from './ReportModal'; // import the modal

export default function Dashboard({
  dashRef,
  crewSize = 1,
  setCrewSize = () => {},
  missionDuration = 1,
  setMissionDuration = () => {},
  modules = { greenhouse: 0, lab: 0, habitat: 0 },
  changeModule = () => {},
  stats = { oxygenProduction: 0, oxygenNeeded: 0, powerNet: 0 },
  exportError = '',
  setExportError = () => {},
}) {
  // Safe access
  const currentModules = modules || { greenhouse: 0, lab: 0, habitat: 0 };
  const currentStats = stats || { oxygenProduction: 0, oxygenNeeded: 0, powerNet: 0 };

  // Report modal state
  const [reportRedacted, setReportRedacted] = useState(false);
  const [previousReportHtml, setPreviousReportHtml] = useState(null);

  return (
    <section ref={dashRef} className="p-8">
      <div className="max-w-6xl mx-auto bg-[#071020] p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4">Space Life Dashboard</h2>

        <div className="grid md:grid-cols-3 gap-4">
          {/* Crew & Mission */}
          <div className="bg-slate-900 p-4 rounded">
            <label>Crew: {crewSize}</label>
            <input
              type="range"
              min="1"
              max="12"
              value={crewSize}
              onChange={(e) => setCrewSize(Number(e.target.value))}
              className="w-full"
            />
            <label>Mission: {missionDuration} months</label>
            <input
              type="range"
              min="1"
              max="36"
              value={missionDuration}
              onChange={(e) => setMissionDuration(Number(e.target.value))}
              className="w-full"
            />

            {/* Button to open report */}
            <button
              onClick={() => setReportRedacted(true)}
              className="mt-4 px-3 py-2 bg-blue-600 rounded hover:bg-blue-500 transition"
            >
              View Report
            </button>
          </div>

          {/* Modules */}
          <div className="bg-slate-900 p-4 rounded">
            <p>Greenhouses: {currentModules.greenhouse}</p>
            <button onClick={() => changeModule('greenhouse', 1)} className="px-2 py-1 bg-green-600 rounded">+</button>

            <p>Labs: {currentModules.lab}</p>
            <button onClick={() => changeModule('lab', 1)} className="px-2 py-1 bg-green-600 rounded">+</button>

            <p>Habitats: {currentModules.habitat}</p>
            <button onClick={() => changeModule('habitat', 1)} className="px-2 py-1 bg-green-600 rounded">+</button>
          </div>

          {/* Stats */}
          <div className="bg-slate-900 p-4 rounded">
            <p>O₂: {currentStats.oxygenProduction} / {currentStats.oxygenNeeded}</p>
            <p>Power: {currentStats.powerNet} kW</p>
          </div>
        </div>

        {/* Export Error */}
        {exportError && <div className="bg-red-900 mt-4 p-2">{exportError}</div>}
      </div>

      {/* Report Modal */}
      {reportRedacted && (
        <ReportModal
          reportSections={{
            overview: ({ Badge }) => (
              <>
                <h3 className="text-white font-semibold">Mission Overview</h3>
                <p>Mission Duration: {missionDuration} months. Crew Size: {crewSize} astronauts.</p>
                <Badge type="success" text="All systems nominal" />
              </>
            ),
            lifeSupport: ({ Badge }) => (
              <>
                <h3 className="text-white font-semibold">Life Support</h3>
                <p>O₂: {currentStats.oxygenProduction} / {currentStats.oxygenNeeded}</p>
                <Badge type="warning" text="Water levels low" />
                <Badge type="critical" text="Temperature exceeded safe range" />
              </>
            ),
            crew: ({ Badge }) => (
              <>
                <h3 className="text-white font-semibold">Crew Status</h3>
                <p>Daily exercise complete. Health nominal.</p>
                <Badge type="success" text="Crew healthy" />
              </>
            ),
            experiments: ({ Badge }) => (
              <>
                <h3 className="text-white font-semibold">Experiments</h3>
                <p>Plant growth experiment shows steady biomass increase.</p>
                <Badge type="success" text="Plant growth stable" />
              </>
            )
          }}
          setReportRedacted={setReportRedacted}
          setPreviousReportHtml={setPreviousReportHtml}
        />
      )}
    </section>
  );
}

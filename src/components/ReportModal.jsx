import React, { useState } from 'react';

// Badge component
const Badge = ({ type, text }) => {
  let colorClass = '';
  switch (type) {
    case 'critical':
      colorClass = 'bg-red-600 text-white';
      break;
    case 'warning':
      colorClass = 'bg-yellow-500 text-black';
      break;
    case 'success':
      colorClass = 'bg-green-600 text-white';
      break;
    default:
      colorClass = 'bg-gray-600 text-white';
  }
  return (
    <span className={`px-2 py-0.5 rounded text-xs font-semibold ${colorClass}`}>
      {text}
    </span>
  );
};

export default function ReportModal({ reportSections = {}, setReportRedacted = () => {}, setPreviousReportHtml = () => {} }) {
  const tabs = Object.keys(reportSections);
  const [activeTab, setActiveTab] = useState(tabs[0] || '');

  return (
    <div aria-hidden={false} className="fixed right-6 bottom-6 z-40">
      <div className="bg-[#071020] p-4 rounded shadow-lg w-[520px] max-h-[80vh] flex flex-col">

        {/* Header */}
        <div className="flex items-center justify-between mb-2">
          <strong className="text-white text-lg">NASA Report</strong>
          <div className="flex gap-2">
            <button
              onClick={() => { setReportRedacted(false); setPreviousReportHtml(null); }}
              className="px-2 py-1 bg-slate-700 rounded hover:bg-slate-600 transition"
            >
              Back
            </button>
            <button
              onClick={() => alert('Open full report modal')}
              className="px-2 py-1 bg-green-600 rounded hover:bg-green-500 transition"
            >
              Open
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 border-b border-gray-600 mb-2">
          {tabs.length === 0 && <p className="text-gray-400">No sections available</p>}
          {tabs.map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-3 py-1 rounded-t ${
                activeTab === tab ? 'bg-slate-700 text-white' : 'bg-slate-800 text-gray-400 hover:bg-slate-700'
              } transition`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="text-sm text-gray-300 overflow-auto p-2 flex-1 space-y-3 bg-slate-900 rounded">
          {reportSections[activeTab] ? reportSections[activeTab]({ Badge }) : <p className="text-gray-400">No content for this section.</p>}
        </div>

        {/* Footer / Timestamp */}
        <div className="text-xs text-gray-500 mt-2 text-right">
          {new Date().toLocaleString()}
        </div>
      </div>
    </div>
  );
}

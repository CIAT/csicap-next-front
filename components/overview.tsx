import React from "react";

const OverviewCard = () => {
  return (
    <div className="bg-gray-900 text-white p-5 rounded-lg max-w-md mx-auto">
      <div className="mb-5">
        <h2 className="text-lg">MyApp Overview</h2>
        <p className="text-gray-400">
          During the last 30 days, the peak user volume is 5403.
        </p>
      </div>
      <div className="flex justify-between">
        <div className="flex items-center">
          <div className="text-2xl mr-3">👤</div>
          <div>
            <p className="text-gray-400 text-sm">Users</p>
            <h3 className="text-xl">1000</h3>
            <p className="text-xs text-green-500">▲ 15.05%</p>
          </div>
        </div>
        <div className="flex items-center">
          <div className="text-2xl mr-3">📶</div>
          <div>
            <p className="text-gray-400 text-sm">Network Traffic</p>
            <h3 className="text-xl">512 MB/s</h3>
            <p className="text-xs text-red-500">▼ 2.15%</p>
          </div>
        </div>
        <div className="flex items-center">
          <div className="text-2xl mr-3">⚠️</div>
          <div>
            <p className="text-gray-400 text-sm">Operational Impact</p>
            <h3 className="text-xl">1643</h3>
          </div>
        </div>
        <div className="flex items-center">
          <div className="text-2xl mr-3">💹</div>
          <div>
            <p className="text-gray-400 text-sm">Uptime</p>
            <h3 className="text-xl">99.93%</h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OverviewCard;

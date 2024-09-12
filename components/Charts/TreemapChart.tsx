import React from 'react';
import Plot from 'react-plotly.js';

const TreemapChart: React.FC = () => {
  return (
    <Plot
      data={[
        {
          type: 'treemap',
          labels: ['Events', 'Cultivo A', 'Cultivo B', 'Cultivo C', 'Cultivo D', 'Cultivo E'],
          parents: ['', 'Events', 'Events', 'Events', 'Events', 'Events'],
          values: [0, 100, 200, 150, 80, 130],
          textinfo: 'label+value',
        },
      ]}
      layout={{
        title: 'Events Treemap',
        width: 600,
        height: 400,
      }}
    />
  );
};

export default TreemapChart;

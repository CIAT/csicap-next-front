import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

// Definir el tipo de las props
interface DoughnutChartProps {
  data: any; // Este tipo puede ajustarse dependiendo de la estructura de tus datos
}

const DoughnutChart: React.FC<DoughnutChartProps> = ({ data }) => {
  return (
    <div>
      <Doughnut data={data} />
    </div>
  );
};

export default DoughnutChart;

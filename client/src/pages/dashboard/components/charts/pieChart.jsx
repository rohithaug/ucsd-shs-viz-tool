// IMPORT COMPONENTS
import React from 'react';
import {
  Chart as ChartJS,
  ArcElement, Tooltip, Legend
} from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(
    ArcElement, Tooltip, Legend
);

const PieChart = ({ title, labels, datasets }) => {
    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
                labels: {
                    font: {
                        size: 14
                    }                        
                }
            },
            title: {
                display: true,
                text: title,
                font: {
                    size: 18
                }
            },
        },
    };

    const data = {
        labels,
        datasets
    };

    return <Pie options={options} data={data} />
}

export default PieChart;

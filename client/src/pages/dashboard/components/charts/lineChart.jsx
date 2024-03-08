// IMPORT COMPONENTS
import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

const generateRandomColor = () => {
    return '#' + Math.floor(Math.random() * 16777215).toString(16);
};

const BarChart = ({ title, labels, datasets }) => {
    console.log(labels, datasets);

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: title,
            },
        },
    };

    const data = {
        labels,
        datasets: datasets.map(dataset => ({
            ...dataset,
            backgroundColor: 'rgba(54, 162, 235, 0.2)',
            borderColor: 'rgb(54, 162, 235)'

        }))
    };

    return <Bar options={options} data={data} />;
}

export default BarChart;

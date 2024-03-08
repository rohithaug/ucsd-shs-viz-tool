// IMPORT COMPONENTS
import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  ScatterElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Scatter } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    ScatterElement,
    Title,
    Tooltip,
    Legend
);

const generateRandomColor = () => {
    return '#' + Math.floor(Math.random() * 16777215).toString(16);
};

const LineChart = ({ title, labels, datasets, time }) => {
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

    if (time) {
        options = {
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
            scales: {
                x: {
                    type: 'time',
                    time: {
                        unit: 'month'
                    }
                }
            },
        };
    }

    const data = {
        labels,
        datasets: datasets.map(dataset => ({
            ...dataset,
            backgroundColor: 'rgba(54, 162, 235, 0.2)',
            borderColor: 'rgb(54, 162, 235)'

        })),
        showLine: true
    };

    return <Scatter options={options} data={data} />;
}

export default LineChart;

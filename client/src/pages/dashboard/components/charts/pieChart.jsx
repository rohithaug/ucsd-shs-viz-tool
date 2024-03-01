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

const COLORS = ["#333333",  
"#4CAF50",  
"#2196F3", 
"#FF9800", 
"#F44336", 
"#9C27B0",
"#03A9F4",
"#7F8C8D",
"#FFEB3B", 
"#C2C2F0",
];


const PieChart = ({ title, labels, datasets }) => {
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
        datasets: [
            {
                label: 'Likes',
                data: datasets[0].data,
                backgroundColor: COLORS.slice(0, labels.length),
                borderColor: 'rgb(54, 162, 235)'
            }
        ],
    };

    return (
    <div >
        <Pie options={options} data={data} />
    </div>
    );

}

export default PieChart;

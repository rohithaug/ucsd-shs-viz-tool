// import React from 'react';
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   Title,
//   Tooltip,
//   Legend,
// } from 'chart.js';
// import { Scatter, Bar, Doughnut } from 'react-chartjs-2';

// function optionsAtemporal({title}) {
//     return {plugins: {
//       title: {
//           display: true,
//           text: title,
//           position: 'bottom'
//       }
//   }}
// }

// function optionsTemporal({title}) {
//     return {scales: {
//         x: {
//             type: 'time',
//             time: {
//                 unit: 'month'
//             }
//         }
//     },
//     plugins: {
//       title: {
//           display: true,
//           text: title,
//           position: 'bottom'
//       }
//   }}
// }

// // const evilLabels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
// // const babyData = {
// //     evilLabels,
// //     datasets: [
// //       {
// //         label: 'Dataset 1',
// //         data: [1, 2, 3, 4, 5, 6, 7],
// //         backgroundColor: 'rgba(255, 99, 132, 0.5)',
// //       },
// //       {
// //         label: 'Dataset 2',
// //         data: [10, 20, 30, 0.4, 0.5, 0.6, 0.7],
// //         backgroundColor: 'rgba(53, 162, 235, 0.5)',
// //       },
// //     ],
// //   };
// //   const babyOptions = {}

// export function MakeChart({chartType, labels, datasets, timelike, title}) {
//     // return <Scatter options={babyOptions} data={babyData}/>
//     let options = optionsAtemporal(title);
//     let data = {labels:labels, datasets: datasets};
//     if (chartType == "scatter") {
//         if (timelike) {
//             options = optionsTemporal(title);
//         }
//         return <Scatter options={options} data={data}/>
//     } 
//     else if (chartType == "doughnut") { //options had better be atemporal
//         return <Doughnut options={options} data={data}/>
//     } 
//     else { //default to bar? Sure why not
//         if (timelike) {
//             options = optionsTemporal(title);
//         }
//         return <Bar options={options} data={data}/>
//     }
// }
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
// import faker from 'faker';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    title: {
      display: true,
      text: 'Chart.js Bar Chart',
    },
  },
};

const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

export const data = {
  labels,
  datasets: [
    {
      label: 'Dataset 1',
      data: [1, 2, 3, 4, 5, 6, 7],
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
    },
    {
      label: 'Dataset 2',
      data: [1, 2, 3, 4, 5, 6, 7],
      backgroundColor: 'rgba(53, 162, 235, 0.5)',
    },
  ],
};

export function MakeChart() {
  return <Bar options={options} data={data} />;
}
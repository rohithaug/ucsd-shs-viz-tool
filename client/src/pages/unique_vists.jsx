import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';

const Dashboard = () => {
  const [chartData, setChartData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('api url');
        const data = await response.json();

        const blogSources = data.blogSource;
        const labels = [];
        const visitData = [];

        for (const source of blogSources) {
          const blogId = source.blogId;
          const sourceCounts = Object.entries(source.count);

          labels.push(blogId);
          visitData.push(sourceCounts.map(([sourceName, count]) => count));
        }

        setChartData({
          labels: labels,
          datasets: visitData.map((counts, index) => ({
            label: blogSources[index].blogId,
            data: counts,
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
            ],
            borderWidth: 1,
          })),
        });
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  // Chart options
  const chartOptions = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div>
      <h2>Dashboard Frontend Chart - Source of visit for each blog page</h2>
      <div style={{ height: '400px', width: '600px' }}>
        <Bar data={chartData} options={chartOptions} />
      </div>
    </div>
  );
};

export default Dashboard;

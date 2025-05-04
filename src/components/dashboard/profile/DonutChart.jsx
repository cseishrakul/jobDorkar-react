import React from "react";
import ReactApexChart from "react-apexcharts";

const DonutChart = ({ darkMode }) => {
  const series = [44, 55, 41];

  const options = {
    chart: {
      type: "donut",
      height: 350,
    },
    labels: ["Desktop", "Tablet", "Mobile"],
    colors: ["#FF5733", "#33FF57", "#3357FF"],
    legend: {
      position: "bottom",
      labels: {
        colors: darkMode ? "#dddddd" : "#000000",
      },
    },
    dataLabels: {
      style: {
        colors: [darkMode ? "#dddddd" : "#000000"],
      },
    },
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 200,
          },
          legend: {
            position: "bottom",
          },
        },
      },
    ],
  };

  return (
    <div
      className={`py-6 rounded-lg p-5 flex items-center justify-center transition-colors duration-300 ${
        darkMode ? "bg-gray-600 text-white" : "bg-white text-black"
      }`}
    >
      <ReactApexChart options={options} series={series} type="donut" height={300} />
    </div>
  );
};

export default DonutChart;

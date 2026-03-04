import React from "react";
import Chart from "react-apexcharts";
import type { ApexOptions } from "apexcharts";

const WaterLevelChart: React.FC = () => {

    const options: ApexOptions = {
        chart: {
            id: "water-level",
            toolbar: { show: false },
            zoom: { enabled: false }
        },

        xaxis: {
            type: "datetime",
            labels: {
                rotate: -45
            }
        },

        yaxis: {
            title: {
                text: "Water Level (Litres)"
            }
        },

        stroke: {
            curve: "smooth",
            width: 3
        },

        fill: {
            type: "solid",
            opacity: 0.9
        },

        colors: ["#2ec4b6"],

        grid: {
            borderColor: "#e5e7eb"
        }
    };

    const series = [
        {
            name: "Water Level",
            data: [
                [Date.now() - 600000, 5000],
                [Date.now() - 500000, 5200],
                [Date.now() - 400000, 5100],
                [Date.now() - 300000, 5300],
                [Date.now() - 200000, 5400],
                [Date.now() - 100000, 5500],
                [Date.now(), 5600]
            ]
        }
    ];

    return (
        <div className="bg-white rounded-xl p-6 shadow-sm">
            <Chart
                options={options}
                series={series}
                type="area"
                height={380}
            />
        </div>
    );
};

export default WaterLevelChart;
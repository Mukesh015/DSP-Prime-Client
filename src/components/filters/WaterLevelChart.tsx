import Chart from "react-apexcharts";
import type { ApexOptions } from "apexcharts";

interface GraphData {
    success: boolean;
    series: {
        name: string;
        data: [number, number][];
    }[];
}

const WaterLevelChart = ({ graphData }: { graphData: GraphData }) => {

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

    return (
        <div className="bg-white rounded-xl p-6 shadow-sm">
            <Chart
                options={options}
                series={graphData?.series || []}
                type="area"
                height={380}
            />
        </div>
    );
};

export default WaterLevelChart;
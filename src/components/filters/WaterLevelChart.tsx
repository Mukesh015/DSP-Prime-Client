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
            type: "area",
            zoom: {
                enabled: true,
                type: "x",
                autoScaleYaxis: true
            },
            toolbar: {
                show: true,
                tools: {
                    zoom: true,
                    zoomin: true,
                    zoomout: true,
                    pan: true,
                    reset: true,
                    download: true
                }
            },
            animations: { enabled: false }
        },

        dataLabels: { enabled: false },

        markers: {
            size: 0,
            hover: { size: 6 }
        },

        tooltip: {
            enabled: true,
            x: {
                formatter: (value) =>
                    new Date(value).toLocaleString("en-IN", {
                        timeZone: "Asia/Kolkata",
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                        hour12: false
                    })
            },
            y: {
                formatter: (v: number) => `${v}%`
            }
        },

        yaxis: {
            min: 0,
            max: 100,
            tickAmount: 5,
            title: {
                text: "Water Level (%)"
            }
        },

        xaxis: {
            type: "datetime",
            labels: {
                rotate: -45,
                formatter: (value: string) => {
                    const d = new Date(Number(value));
                    return d.toLocaleString("en-IN", {
                        timeZone: "Asia/Kolkata",
                        day: "2-digit",
                        month: "short",
                        hour: "2-digit",
                        minute: "2-digit",
                        hour12: false
                    });
                }
            },
            title: {
                text: "Date & Time (IST)"
            }
        },

        stroke: {
            curve: "smooth",
            width: 3
        },

        fill: {
            type: "gradient",
            gradient: {
                shadeIntensity: 1,
                opacityFrom: 0.7,
                opacityTo: 0.15
            }
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
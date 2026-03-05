import { useState } from "react";
import AnalyticsFilters from "../components/filters/AnalyticsFilters";
import WaterLevelChart from "../components/filters/WaterLevelChart";
import { fetchTankAnalyticsData } from "../api/analytics";

interface GraphData {
    success: boolean;
    series: {
        name: string;
        data: [number, number][];
    }[];
}

const Analytics = () => {

    const [graphData, setGraphData] = useState<GraphData | null>(null);

    const loadGraphData = async (tankNo: string, startDate: string, endDate: string) => {
        const res = await fetchTankAnalyticsData(tankNo, startDate, endDate);
        setGraphData(res);
    }

    console.log('graphData', graphData)

    return (
        <div className="space-y-6">

            {/* Page Title */}
            <div>
                <h2 className="text-2xl font-semibold text-gray-700">
                    Water Level Trends
                </h2>

                <p className="text-sm text-gray-500 mt-1">
                    Home › Analytics › Charts
                </p>
            </div>

            {/* Filters */}
            <AnalyticsFilters loadGraphData={loadGraphData} />

            {/* Chart */}
            {graphData && (
                <WaterLevelChart graphData={graphData} />
            )}

        </div>
    );
};

export default Analytics;
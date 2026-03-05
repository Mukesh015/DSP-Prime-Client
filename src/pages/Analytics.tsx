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
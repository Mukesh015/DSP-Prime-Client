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

/* =====================
🔧 WATER LEVEL CLEANING LOGIC
(SAME AS OLD CODE)
===================== */

const EMPTY_LEVEL = 15;
const SPIKE_LEVEL = 40;
const MAX_JUMP = 30;

function sanitizeLevel(current: number, last: number | null) {

    if (last === null) return current;

    // Empty tank fake spike
    if (last < EMPTY_LEVEL && current > SPIKE_LEVEL) {
        return last;
    }

    // Sudden jump reject
    if (Math.abs(current - last) > MAX_JUMP) {
        return last;
    }

    // Soft smoothing
    const ALPHA = 0.3;
    return last + ALPHA * (current - last);
}

const Analytics = () => {

    const [graphData, setGraphData] = useState<GraphData | null>(null);

    const loadGraphData = async (tankNo: string, startDate: string, endDate: string) => {

        const res = await fetchTankAnalyticsData(tankNo, startDate, endDate);

        /* =====================
        APPLY NOISE FILTER HERE
        ===================== */

        let lastValid: number | null = null;

        const cleanedSeries = res.series.map((s: any) => {

            const cleanedData = s.data.map(([timestamp, value]: [number, number]) => {

                const cleaned = sanitizeLevel(value, lastValid);
                lastValid = cleaned;

                return [timestamp, cleaned] as [number, number];

            });

            return {
                ...s,
                data: cleanedData
            };

        });

        setGraphData({
            ...res,
            series: cleanedSeries
        });
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





// import { useState } from "react";
// import AnalyticsFilters from "../components/filters/AnalyticsFilters";
// import WaterLevelChart from "../components/filters/WaterLevelChart";
// import { fetchTankAnalyticsData } from "../api/analytics";

// interface GraphData {
//     success: boolean;
//     series: {
//         name: string;
//         data: [number, number][];
//     }[];
// }

// const Analytics = () => {

//     const [graphData, setGraphData] = useState<GraphData | null>(null);

//     const loadGraphData = async (tankNo: string, startDate: string, endDate: string) => {
//         const res = await fetchTankAnalyticsData(tankNo, startDate, endDate);
//         setGraphData(res);
//     }

//     console.log('graphData', graphData)

//     return (
//         <div className="space-y-6">

//             {/* Filters */}
//             <AnalyticsFilters loadGraphData={loadGraphData} />

//             {/* Chart */}
//             {graphData && (
//                 <WaterLevelChart graphData={graphData} />
//             )}

//         </div>
//     );
// };

// export default Analytics;
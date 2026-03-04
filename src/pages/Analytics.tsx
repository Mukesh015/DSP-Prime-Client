import AnalyticsFilters from "../components/filters/AnalyticsFilters";
import WaterLevelChart from "../components/filters/WaterLevelChart";

const Analytics = () => {
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
            <AnalyticsFilters />

            {/* Chart */}
            <WaterLevelChart />

        </div>
    );
};

export default Analytics;
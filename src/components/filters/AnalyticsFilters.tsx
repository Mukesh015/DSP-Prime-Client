import { useState } from "react";
import { DateRange } from "react-date-range";
import { TANK_PARAMETERS } from "../../constants/tanks";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

interface Range {
    startDate: Date;
    endDate: Date;
    key: string;
}

const AnalyticsFilters = ({ loadGraphData }: { loadGraphData: (tank_no: string, startDate: string, endDate: string) => void }) => {
    const [showPicker, setShowPicker] = useState(false);
    const [selectedTank, setSelectedTank] = useState(TANK_PARAMETERS[0].tank_no);

    const [range, setRange] = useState<Range[]>([
        {
            startDate: new Date(),
            endDate: new Date(),
            key: "selection",
        },
    ]);

    const formatDate = (date: Date) =>
        date.toISOString().split("T")[0];

    const handleFetchGraphData = () => {
        loadGraphData(selectedTank, formatDate(range[0].startDate), formatDate(range[0].endDate));
    }

    return (
        <div className="bg-white rounded-xl p-6 shadow-sm flex items-end gap-6 flex-wrap relative">

            {/* Tank Select */}
            {/* Tank Select */}
            <div className="flex flex-col gap-1 min-w-[220px]">
                <label className="text-sm font-medium text-gray-600">
                    Select Tank
                </label>

                <div className="relative">
                    <select
                        value={selectedTank}
                        onChange={(e) => setSelectedTank(e.target.value)}
                        className="
                            w-full
                            appearance-none
                            border border-gray-300
                            rounded-lg
                            px-4 py-2.5
                            text-sm
                            bg-white
                            shadow-sm
                            focus:outline-none
                            focus:ring-2
                            focus:ring-indigo-500
                            focus:border-indigo-500
                            hover:border-gray-400
                            transition
                        "
                    >
                        {TANK_PARAMETERS.map((tank) => (
                            <option key={tank.tank_no} value={tank.tank_no}>
                                {tank.tank_no} - {tank.location}
                            </option>
                        ))}
                    </select>

                    {/* Custom Arrow */}
                    <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-gray-400">
                        ▼
                    </div>
                </div>
            </div>

            {/* Date Range */}
            <div className="relative">
                <label className="text-sm font-medium text-gray-600 mr-2">
                    Select Date Range
                </label>

                <input
                    readOnly
                    onClick={() => setShowPicker(!showPicker)}
                    value={`${formatDate(range[0].startDate)} to ${formatDate(
                        range[0].endDate
                    )}`}
                    className="mt-2 border text-sm border-gray-200 rounded-lg px-4 py-2 w-60 cursor-pointer"
                />

                {showPicker && (
                    <div className="absolute top-16 z-50 shadow-lg">
                        <DateRange
                            editableDateInputs
                            onChange={(item: any) => setRange([item.selection])}
                            moveRangeOnFirstSelection={false}
                            ranges={range}
                        />
                    </div>
                )}
            </div>

            {/* Button */}
            <button
                disabled={!range[0].startDate || !range[0].endDate}
                className="bg-linear-to-r from-indigo-500 to-purple-500 text-white px-6 py-2 rounded-lg"
                onClick={handleFetchGraphData}
            >
                Fetch Data
            </button>
        </div>
    );
};

export default AnalyticsFilters;
import { useState } from "react";
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

interface Range {
    startDate: Date;
    endDate: Date;
    key: string;
}

const AnalyticsFilters = () => {
    const [showPicker, setShowPicker] = useState(false);

    const [range, setRange] = useState<Range[]>([
        {
            startDate: new Date(),
            endDate: new Date(),
            key: "selection",
        },
    ]);

    const formatDate = (date: Date) =>
        date.toISOString().split("T")[0];

    return (
        <div className="bg-white rounded-xl p-6 shadow-sm flex items-end gap-6 flex-wrap relative">

            {/* Tank Select */}
            <div>
                <label className="text-sm text-gray-600">Select Tank:</label>

                <select className="mt-2 border rounded-lg px-4 py-2 w-[180px]">
                    <option>SMS : CS 13</option>
                    <option>Stripper Bay : BS 3B</option>
                    <option>CS 11C</option>
                </select>
            </div>

            {/* Date Range */}
            <div className="relative">
                <label className="text-sm text-gray-600">
                    Select Date Range:
                </label>

                <input
                    readOnly
                    onClick={() => setShowPicker(!showPicker)}
                    value={`${formatDate(range[0].startDate)} to ${formatDate(
                        range[0].endDate
                    )}`}
                    className="mt-2 border rounded-lg px-4 py-2 w-[240px] cursor-pointer"
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
            <button className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-6 py-2 rounded-lg">
                Fetch Data
            </button>
        </div>
    );
};

export default AnalyticsFilters;
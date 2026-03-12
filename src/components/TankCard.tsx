import type { Tank } from "../types/tank";
import { formatDateTime } from "../utils/dateTime";

interface Props {
    tank: Tank;
}

const TankCard = ({ tank }: Props) => {

    const percent = (tank.liters / tank.tank_volume) * 100;

    const upperPercent =
        (tank.upper_safe_limit_pct / tank.tank_volume) * 100;

    const lowerPercent =
        (tank.lower_safe_limit / tank.tank_volume) * 100;

    const isAlert =
        (tank.msg === "network_issue" &&
            (tank.flow === "high_level" || tank.flow === "low_level")) ||
        tank.msg === "high_level" ||
        tank.msg === "low_level";

    const textColor = isAlert ? "text-red-600" : "text-green-600";

    const fillHeight = `${Math.max(0, Math.min(100, percent))}%`;

    const ticks = [
        tank.tank_volume,
        tank.tank_volume * 0.75,
        tank.tank_volume * 0.5,
        tank.tank_volume * 0.25,
        0
    ];

    return (
        <div
            className={`border-4 ${tank.border === "red"
                ? "border-red-500"
                : "border-green-500"
                } bg-white rounded-md p-5`}
        >

            {/* HEADER */}
            <h2 className="text-lg font-semibold text-center mb-4">
                {tank.tank_no} - {tank.location}
            </h2>

            <div className="flex justify-center items-end">

                {/* ================= CYLINDER ================= */}

                <div className="flex flex-col items-center gap-1">

                    <div className="relative h-60 w-40">

                        {/* Tank body */}
                        <div
                            className="absolute inset-0"
                            style={{
                                borderRadius: "120px / 38px",
                                background:
                                    "linear-gradient(to right, rgba(255,255,255,0.20), rgba(220,220,220,0.65), rgba(255,255,255,0.20))",
                                borderLeft: "3px solid rgba(0,0,0,0.75)",
                                borderRight: "3px solid rgba(0,0,0,0.75)",
                                boxShadow:
                                    "inset 0 0 14px rgba(0,0,0,0.25), 0 0 10px rgba(0,0,0,0.15)",
                                overflow: "hidden"
                            }}
                        >

                            {/* Reflection */}
                            <div
                                style={{
                                    position: "absolute",
                                    left: 28,
                                    top: 28,
                                    bottom: 38,
                                    width: 60,
                                    borderRadius: 26,
                                    background:
                                        "linear-gradient(to right, rgba(255,255,255,0.9), rgba(255,255,255,0))",
                                    opacity: 0.75
                                }}
                            />

                            {/* Water container */}
                            <div
                                style={{
                                    position: "absolute",
                                    inset: "20px 8px 15px 8px",
                                    borderRadius: "95px / 28px",
                                    overflow: "hidden"
                                }}
                            >

                                {/* Water level */}
                                <div
                                    className="absolute left-0 right-0 bottom-0 transition-[height] duration-700"
                                    style={{
                                        height: fillHeight,
                                        background:
                                            "linear-gradient(to right, #5fb8cf, #7ecfe3, #6bc3da)"
                                    }}
                                >

                                    {/* Water surface */}
                                    <div
                                        style={{
                                            position: "absolute",
                                            left: -10,
                                            right: -10,
                                            top: -20,
                                            height: 36,
                                            borderRadius: "50%",
                                            background:
                                                "radial-gradient(circle at 50% 30%, rgba(255,255,255,0.9), rgba(200,240,250,0.9) 35%, rgba(126,207,227,0.85) 65%, rgba(126,207,227,0) 100%)"
                                        }}
                                    />

                                </div>
                            </div>

                            {/* Top rim */}
                            <div
                                style={{
                                    position: "absolute",
                                    left: 20,
                                    right: 20,
                                    top: 3,
                                    height: 40,
                                    borderRadius: "50%",
                                    border: "3px solid rgba(0,0,0,0.75)"
                                }}
                            />

                        </div>

                        {/* Tank shadow */}
                        <div
                            className="mx-auto mt-2"
                            style={{
                                width: 150,
                                height: 12,
                                background:
                                    "radial-gradient(ellipse at center, rgba(0,0,0,0.22), transparent 70%)",
                                borderRadius: "50%"
                            }}
                        />

                    </div>

                    {/* Current value */}
                    <div className={`text-[24px] font-bold ${textColor}`}>
                        {tank.liters?.toLocaleString()} ltrs
                    </div>

                </div>

                {/* ================= SCALE ================= */}

                <div className="relative h-52.5 w-10 text-[14px] -top-14">

                    {/* This inner area matches the tank water area */}
                    <div className="absolute left-3 top-5 bottom-3.75">

                        {/* Vertical dotted line */}
                        <div className="absolute left-0 top-0 bottom-0 border-l-2 border-dotted border-slate-700" />

                        {ticks.map((val, idx) => {
                            const pct = val / tank.tank_volume;

                            return (
                                <div
                                    key={idx}
                                    className="absolute flex items-center gap-3"
                                    style={{ bottom: `${pct * 100}%` }}
                                >
                                    {/* tick line */}
                                    <div className="w-4 h-0.5 bg-black" />

                                    {/* label */}
                                    <span className="whitespace-nowrap">
                                        {Math.floor(val).toLocaleString()} ltrs
                                    </span>
                                </div>
                            );
                        })}

                        {/* Upper Limit */}
                        <div
                            className="absolute flex items-center group"
                            style={{ bottom: `${upperPercent}%` }}
                        >
                            {/* red line touching tank */}
                            <div className="absolute -left-5 w-7.5 h-1 bg-red-500" />


                            <div className="absolute -left-44.5 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition bg-white border rounded-md shadow px-3 py-1 text-sm">
                                Upper Limit: {Math.round(tank.upper_safe_limit_pct).toLocaleString()} L
                            </div>
                        </div>

                        {/* Lower Limit */}
                        <div
                            className="absolute flex items-center group"
                            style={{ bottom: `${lowerPercent}%` }}
                        >
                            {/* red line touching tank */}
                            <div className="absolute -left-5 w-7.5 h-1 bg-red-500" />

                            <div className="absolute -left-44.5 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition bg-white border rounded-md shadow px-3 py-1 text-sm">
                                Lower Limit: {Math.round(tank.lower_safe_limit).toLocaleString()} L
                            </div>
                        </div>

                    </div>

                </div>

            </div>

            {/* FOOTER */}

            <div className="mt-3 text-base space-y-1">

                <p>
                    Alert - {tank.alert}
                </p>

                <p>
                    Flow - <span className="text-green-600">No Leakage</span>
                </p>

                <p>
                    Last Updated - {formatDateTime(tank.lastUpdated)}
                </p>

            </div>

        </div>
    );
};

export default TankCard;












// Backup of TankCard before redesign

// import type { Tank } from "../types/tank";
// import { formatDateTime } from "../utils/dateTime";

// interface Props {
//     tank: Tank;
// }

// const TankCard = ({ tank }: Props) => {
//     const percent = (tank.liters / tank.tank_volume) * 100;

//     const upperPercent =
//         (tank.upper_safe_limit_pct / tank.tank_volume) * 100;

//     const lowerPercent =
//         (tank.lower_safe_limit / tank.tank_volume) * 100;

//     const isAlert =
//         (tank.msg === "network_issue" &&
//             (tank.flow === "high_level" || tank.flow === "low_level")) ||
//         tank.msg === "high_level" ||
//         tank.msg === "low_level";

//     const textColor = isAlert ? "text-red-600" : "text-green-600";

//     return (
//         <div
//             className={`border-4 ${tank.border === "red" ? "border-red-500" : "border-green-500"
//                 } bg-white rounded-md p-5`}
//         >
//             <h2 className="text-lg font-semibold text-center mb-4">
//                 {tank.tank_no} - {tank.location}
//             </h2>

//             <div className="flex justify-center gap-4">

//                 {/* Cylinder */}
//                 <div className="relative w-40 h-56 border-2 border-gray-300 rounded-t-full overflow-hidden">

//                     {/* Water Level */}
//                     <div
//                         className="absolute bottom-0 w-full bg-linear-to-b from-sky-300 to-sky-700"
//                         style={{ height: `${percent}%` }}
//                     />

//                     {/* Upper Safe Limit */}
//                     <div
//                         className="absolute left-0 w-full border-t-2 border-red-500"
//                         style={{ bottom: `${upperPercent}%` }}
//                     />

//                     {/* Lower Safe Limit */}
//                     <div
//                         className="absolute left-0 w-full border-t-2 border-yellow-500"
//                         style={{ bottom: `${lowerPercent}%` }}
//                     />

//                 </div>

//                 {/* Scale */}
//                 <div className="flex flex-col justify-between text-sm text-gray-500 h-56">
//                     <span>{tank.tank_volume} ltrs</span>
//                     <span>{Math.floor(tank.tank_volume * 0.75)} ltrs</span>
//                     <span>{Math.floor(tank.tank_volume * 0.5)} ltrs</span>
//                     <span>{Math.floor(tank.tank_volume * 0.25)} ltrs</span>
//                     <span>0 ltrs</span>
//                 </div>

//             </div>

//             <h3 className={`text-center text-xl font-bold mt-3 ${textColor}`}>
//                 {tank.liters?.toLocaleString()} ltrs
//             </h3>

//             <div className="mt-3 text-sm space-y-1">
//                 <p>Alert - {tank.alert}</p>

//                 <p>
//                     Flow - <span className="text-green-600">No Leakage</span>
//                 </p>

//                 <p>
//                     Last Updated - {formatDateTime(tank.lastUpdated)}
//                 </p>
//             </div>
//         </div>
//     );
// };

// export default TankCard;
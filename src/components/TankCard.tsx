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

    return (
        <div
            className={`border-4 ${tank.border === "red" ? "border-red-500" : "border-green-500"
                } bg-white rounded-md p-5`}
        >
            <h2 className="text-lg font-semibold text-center mb-4">
                {tank.tank_no} - {tank.location}
            </h2>

            <div className="flex justify-center gap-4">

                {/* Cylinder */}
                <div className="relative w-40 h-56 border-2 border-gray-300 rounded-t-full overflow-hidden">

                    {/* Water Level */}
                    <div
                        className="absolute bottom-0 w-full bg-gradient-to-b from-sky-300 to-sky-700"
                        style={{ height: `${percent}%` }}
                    />

                    {/* Upper Safe Limit */}
                    <div
                        className="absolute left-0 w-full border-t-2 border-red-500"
                        style={{ bottom: `${upperPercent}%` }}
                    />

                    {/* Lower Safe Limit */}
                    <div
                        className="absolute left-0 w-full border-t-2 border-yellow-500"
                        style={{ bottom: `${lowerPercent}%` }}
                    />

                </div>

                {/* Scale */}
                <div className="flex flex-col justify-between text-sm text-gray-500 h-56">
                    <span>{tank.tank_volume} ltrs</span>
                    <span>{Math.floor(tank.tank_volume * 0.75)} ltrs</span>
                    <span>{Math.floor(tank.tank_volume * 0.5)} ltrs</span>
                    <span>{Math.floor(tank.tank_volume * 0.25)} ltrs</span>
                    <span>0 ltrs</span>
                </div>

            </div>

            <h3 className="text-center text-xl font-bold mt-3">
                {tank.liters?.toLocaleString()} ltrs
            </h3>

            <div className="mt-3 text-sm space-y-1">
                <p>Alert - {tank.alert}</p>

                <p>
                    Flow - <span className="text-green-600">{tank.flow}</span>
                </p>

                <p>
                    Last Updated - {formatDateTime(tank.lastUpdated)}
                </p>
            </div>
        </div>
    );
};

export default TankCard;
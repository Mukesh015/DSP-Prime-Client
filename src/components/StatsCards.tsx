import { useState } from "react";
import StatCard from "./StatCard";
import TankListModal from "./modals/TankListModal";

interface StatsSectionProps {
    stats: {
        stats: {
            issuesDetected: number;
            totalTanks: number;
            onlineTanks: number;
            offlineTanks: number;
        },
        tanks: any[];
    } | null;
}

const StatsSection = ({
    stats,
}: StatsSectionProps) => {

    const [modalType, setModalType] = useState<"online" | "offline" | null>(null);
    const onlineTankList = stats?.tanks.filter((t) => t.status === "online") || [];
    const offlineTankList = stats?.tanks.filter((t) => t.status === "offline") || [];

    if (!stats) {
        return (
            <div className="bg-white rounded-xl shadow-sm p-6 flex justify-center items-center w-full">
                <p>No stats available</p>
            </div>
        );
    }

    return (
        <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">

                {/* Total Tanks (no modal) */}
                <StatCard
                    title="Total Tanks"
                    value={stats.stats.totalTanks}
                />

                {/* Online Tanks */}
                <div onClick={() => setModalType("online")}>
                    <StatCard
                        title="Online Tanks"
                        value={stats.stats.onlineTanks}
                        clickable
                    />
                </div>

                {/* Offline Tanks */}
                <div onClick={() => setModalType("offline")}>
                    <StatCard
                        title="Offline Tanks"
                        value={stats.stats.offlineTanks}
                        clickable
                    />
                </div>

            </div>

            {/* Online Modal */}
            {modalType === "online" && (
                <TankListModal
                    title="Online Tanks"
                    tanks={onlineTankList}
                    onClose={() => setModalType(null)}
                />
            )}

            {/* Offline Modal */}
            {modalType === "offline" && (
                <TankListModal
                    title="Offline Tanks"
                    tanks={offlineTankList}
                    onClose={() => setModalType(null)}
                />
            )}
        </>
    );
};

export default StatsSection;
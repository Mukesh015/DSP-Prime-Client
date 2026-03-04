import StatCard from "./StatCard";

interface StatsSectionProps {
    stats: {
        totalTanks: number;
        onlineTanks: number;
        offlineTanks: number;
    } | null;
}

const StatsSection = ({ stats }: StatsSectionProps) => {

    if (!stats) {
        return (
            <div className="bg-white rounded-xl shadow-sm p-6 flex justify-center items-center w-full">
                <p> No stats available </p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-3 gap-6 mt-6">
            <StatCard title="Total Tanks" value={stats?.totalTanks || 0} />
            <StatCard title="Online Tanks" value={stats?.onlineTanks || 0} />
            <StatCard title="Offline Tanks" value={stats?.offlineTanks || 0} />
        </div>
    );
};

export default StatsSection;
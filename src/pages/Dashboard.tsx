import { useEffect, useState } from "react";
import StatsSection from "../components/StatsCards";
import TankGrid from "../components/TankGrid";
import { fetchDashboardStats, fetchTanksData } from "../api/dashboard";

const Dashboard = () => {

    const [stats, setStats] = useState(null);
    const [tanks, setTanks] = useState([]);

    const loadStats = async () => {
        try {
            const stats = await fetchDashboardStats();
            setStats(stats);
            console.log("Dashboard Stats:", stats);
        } catch (error) {
            console.error("Failed to load dashboard stats:", error);
        }
    };

    const loadtanksData = async () => {
        try {
            const tanksData = await fetchTanksData();
            setTanks(tanksData.tanks || []);
        }
        catch (error) {
            console.error("Failed to load tanks data:", error);
        }
    };

    useEffect(() => {
        loadStats();
        loadtanksData();
    }, []);

    return (
        <>
            <StatsSection stats={stats} />
            <TankGrid tanks={tanks} />
        </>
    );
};

export default Dashboard;
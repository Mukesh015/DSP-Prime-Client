import { api } from "./axios";

export const fetchTankAnalyticsData = async (
    tank_no: string,
    startDate: string,
    endDate: string
) => {
    try {
        const response = await api.get("/analytics", {
            params: {
                tank_no,
                start_date: startDate,
                end_date: endDate
            }
        });

        return response.data;
    } catch (error) {
        console.error("Error fetching analytics data:", error);
        throw error;
    }
};
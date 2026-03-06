export interface Tank {
    tank_no: string;
    location: string;

    tank_volume: number;

    upper_safe_limit_pct: number;
    lower_safe_limit: number;

    liters: number;
    fillPercent: number;

    lastUpdated: string | null;

    border: "red" | "green";
    msg: string;
    flow: string;
    alert: string | null;
}

export interface User {
    id: number;
    name: string;
    phone: string;
}
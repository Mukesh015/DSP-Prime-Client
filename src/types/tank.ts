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

    flow: string;
    etf: string | null;
}

// "tank_no": "CS21",
//             "location": "Battery-5",
//             "tank_volume": 1350,
//             "upper_safe_limit_pct": 1287.65,
//             "lower_safe_limit": 1094.54,
//             "liters": 0,
//             "fillPercent": 0,
//             "lastUpdated": null,
//             "border": "red",
//             "flow": "No Data",
//             "etf": null
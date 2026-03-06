import React from "react";

interface Tank {
    sl: number;
    tankNo: string;
    sim: string;
    imei: string;
    ssid: string;
    safeMax: number;
    safeMin: number;
    installDate: string;
}

const tankData: Tank[] = [
    {
        sl: 1,
        tankNo: "CS21",
        sim: "8991302401250042980",
        imei: "4298",
        ssid: "Plumule_CS21_E01",
        safeMax: 1287.7,
        safeMin: 1094.5,
        installDate: "25/11/2025",
    },
    {
        sl: 2,
        tankNo: "CS21B",
        sim: "8991302401250042972",
        imei: "4297",
        ssid: "Plumule_CS21B_E02",
        safeMax: 3000,
        safeMin: 2457,
        installDate: "26/11/2025",
    },
    {
        sl: 3,
        tankNo: "BS-11",
        sim: "8991302401250042766",
        imei: "4276",
        ssid: "Plumule_BS-11_E03",
        safeMax: 11660,
        safeMin: 9328,
        installDate: "22/11/2025",
    },
    {
        sl: 4,
        tankNo: "BS-10",
        sim: "8991302401250042758",
        imei: "4275",
        ssid: "Plumule_BS-10_E04",
        safeMax: 8478.4,
        safeMin: 6782.7,
        installDate: "22/11/2025",
    },
    {
        sl: 5,
        tankNo: "BS-7A",
        sim: "8991302401250042741",
        imei: "4274",
        ssid: "Plumule_BS-7A_E05",
        safeMax: 12110,
        safeMin: 9688,
        installDate: "20/11/2025",
    },
    {
        sl: 6,
        tankNo: "BS-7B",
        sim: "8991302401250042743",
        imei: "4273",
        ssid: "Plumule_BS-7B_E06",
        safeMax: 11220.2,
        safeMin: 8976.2,
        installDate: "21/11/2025",
    },
    {
        sl: 7,
        tankNo: "CS-23B",
        sim: "8991302401250042725",
        imei: "4272",
        ssid: "Plumule_CS-23B_E07",
        safeMax: 10950,
        safeMin: 8881.7,
        installDate: "28/11/2025",
    },
    {
        sl: 8,
        tankNo: "BS-6",
        sim: "8991302401250042717",
        imei: "4271",
        ssid: "Plumule_BS-6_E08",
        safeMax: 20871.8,
        safeMin: 16697.4,
        installDate: "28/11/2025",
    },
    {
        sl: 9,
        tankNo: "LS-1",
        sim: "8991302401250042709",
        imei: "4270",
        ssid: "Plumule_LS-1_E09",
        safeMax: 7390.6,
        safeMin: 5912.5,
        installDate: "02/12/2025",
    },
    {
        sl: 10,
        tankNo: "MS-14",
        sim: "8991302401250042691",
        imei: "4269",
        ssid: "Plumule_MS-14_E10",
        safeMax: 14570.2,
        safeMin: 11656,
        installDate: "30/11/2025",
    },
];

const TankParameter = () => {
    return (
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">

            <table className="w-full text-sm">

                <thead className="bg-gray-100 text-gray-700 uppercase text-xs font-bold">

                    <tr>
                        <th className="px-6 py-3 text-left">SL</th>
                        <th className="px-6 py-3 text-left">Tank No</th>
                        <th className="px-6 py-3 text-left">SIM Number</th>
                        <th className="px-6 py-3 text-left">IMEI Number</th>
                        <th className="px-6 py-3 text-left">SSID</th>
                        <th className="px-6 py-3 text-left">Safe Max (L)</th>
                        <th className="px-6 py-3 text-left">Safe Min (L)</th>
                        <th className="px-6 py-3 text-left">Installation Date</th>
                    </tr>

                </thead>

                <tbody>

                    {tankData.map((tank) => (

                        <tr
                            key={tank.sl}
                            className="border-b border-gray-200 hover:bg-gray-50"
                        >

                            <td className="px-6 py-4">{tank.sl}</td>

                            <td className="px-6 py-4 font-medium text-blue-600">
                                {tank.tankNo}
                            </td>

                            <td className="px-6 py-4">{tank.sim}</td>

                            <td className="px-6 py-4">{tank.imei}</td>

                            <td className="px-6 py-4">{tank.ssid}</td>

                            <td className="px-6 py-4">{tank.safeMax}</td>

                            <td className="px-6 py-4">{tank.safeMin}</td>

                            <td className="px-6 py-4">{tank.installDate}</td>

                        </tr>

                    ))}

                </tbody>

            </table>

        </div>
    );
};

export default TankParameter;
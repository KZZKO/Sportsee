import { useEffect, useState } from "react";
import { getUserPerformance } from "../../services/api";
import "./index.scss";

// IMP//
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer } from "recharts";

export const PerfChart = () => {
    const [perfData, setPerfData] = useState([]);

    useEffect(() => {
        getUserPerformance(12)
            .then((data) => {
                const kindMapping = {
                    1: "Cardio",
                    2: "Energie",
                    3: "Endurance",
                    4: "Force",
                    5: "Vitesse",
                    6: "Intensité",
                };

                const formatted = data.data.map((item) => ({
                    subject: kindMapping[item.kind],
                    value: item.value,
                }));

                setPerfData(formatted);
            })
            .catch((err) => console.error(err));
    }, []);

    return (
        <div className="perf-chart">
            <ResponsiveContainer width="100%" height="100%">
                <RadarChart
                    outerRadius="65%"
                    data={perfData}
                    startAngle={210}
                    endAngle={-150}
                >
                    <PolarGrid radialLines={false} stroke="#FFFFFF" />
                    <PolarAngleAxis
                        dataKey="subject"
                        stroke="#FFFFFF"
                        tickLine={false}
                        axisLine={false}
                        tick={{ fontSize: 11, fill: "#FFFFFF" }}
                    />
                    <Radar
                        dataKey="value"
                        fill="#FF0101"
                        fillOpacity={0.6}
                    />
                </RadarChart>
            </ResponsiveContainer>
        </div>
    );
};
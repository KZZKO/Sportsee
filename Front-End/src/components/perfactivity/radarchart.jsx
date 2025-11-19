import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getUserPerformance } from "../../services/api";
import "./index.scss";

// IMP//
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer } from "recharts";

export const PerfChart = () => {
    const { id } = useParams();
    const userId = Number(id) || 12;

    const [perfData, setPerfData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function loadPerformance() {
            try {
                const data = await getUserPerformance(userId);

                const kindMapping = {
                    1: "Energie",
                    2: "Cardio",
                    3: "Intensité",
                    4: "Vitesse",
                    5: "Force",
                    6: "Endurance",
                };

                const formatted = data.data.map((item) => ({
                    subject: kindMapping[item.kind],
                    value: item.value,
                }));

                setPerfData(formatted);
            } catch (err) {
                console.error(err);
                setError("Impossible de charger les données de performance.");
            } finally {
                setLoading(false);
            }
        }

        loadPerformance();
    }, [userId]);

    if (loading) return <p>Chargement...</p>;
    if (error) return <p>{error}</p>;

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
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getUserActivity } from "../../services/api";
import "./index.scss";

// Recharts
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

export const DailyActivity = () => {
    const { id } = useParams();
    const userId = Number(id) || 12;

    const [activityData, setActivityData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function loadActivity() {
            try {
                const data = await getUserActivity(userId);

                const formattedData = data.sessions.map((session, index) => ({
                    name: index + 1,
                    kilogram: session.kilogram,
                    calories: session.calories,
                }));

                setActivityData(formattedData);
            } catch (err) {
                console.error("Erreur lors du chargement des données :", err);
                setError("Impossible de charger les données d'activité.");
            } finally {
                setLoading(false);
            }
        }

        loadActivity();
    }, [userId]);

    if (loading) return <p>Chargement...</p>;
    if (error) return <p>{error}</p>;

    const CustomTooltip = ({ active, payload }) => {
        if (active && payload && payload.length) {
            return (
                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        gap: "20px",
                        backgroundColor: "#E60000",
                        color: "#fff",
                        padding: "10px 5px",
                        textAlign: "center",
                        fontSize: "12px",
                        lineHeight: "20px",
                    }}
                >
                    <p>{`${payload[0].value} kg`}</p>
                    <p>{`${payload[1].value} kCal`}</p>
                </div>
            );
        }
        return null;
    };

    return (
        <div className="daily-activity">
            <h2>Activité quotidienne</h2>
            <ResponsiveContainer width="100%" height={300}>
                <BarChart
                    data={activityData}
                    margin={{
                        top: 20,
                        right: 0,
                        left: 20,
                        bottom: 5,
                    }}
                    barGap={8}
                >
                    <CartesianGrid
                        strokeDasharray="3 3"
                        vertical={false} />

                    <XAxis
                        dataKey="name"
                        tickLine={false}
                        axisLine={false}
                        tick={{ fontSize: 15 }}
                        dy={10}
                        stroke="#e3e3e3ff"
                    />
                    <YAxis
                        yAxisId="kilogram"
                        orientation="right"
                        tickLine={false}
                        axisLine={false}
                        tick={{ fontSize: 15 }}
                    />
                    <YAxis yAxisId="calories" hide={true} />

                    <Tooltip content={<CustomTooltip />} />

                    <Legend
                        verticalAlign="top"
                        align="right"
                        iconType="circle"
                        iconSize={10}
                        height={35}
                        wrapperStyle={{
                            top: 0,
                            right: 0,
                        }}
                    />
                    <Bar
                        yAxisId="kilogram"
                        dataKey="kilogram"
                        name="Poids (kg)"
                        fill="#282D30"
                        barSize={8}
                        radius={[3, 3, 0, 0]}
                    />
                    <Bar
                        yAxisId="calories"
                        dataKey="calories"
                        name="Calories brûlées (kCal)"
                        fill="#E60000"
                        barSize={8}
                        radius={[3, 3, 0, 0]}
                    />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};
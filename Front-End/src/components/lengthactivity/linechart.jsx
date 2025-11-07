import { useEffect, useState } from "react";
import { getUserAverageSessions } from "../../services/api";
import "./index.scss";

// IMP//
import { LineChart, Line, XAxis, YAxis, Tooltip, Rectangle, ResponsiveContainer } from "recharts";


export const LengthSession = () => {
    const [sessionData, setSessionData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function loadSessions() {
            try {
                const userId = 12;
                const data = await getUserAverageSessions(userId);


                const days = ["L", "M", "M", "J", "V", "S", "D"];
                const formattedData = data.sessions.map((session, index) => ({
                    day: days[index],
                    sessionLength: session.sessionLength,
                }));

                setSessionData(formattedData);
            } catch (err) {
                console.error("Erreur lors du chargement des sessions :", err);
                setError("Impossible de charger les données de sessions.");
            } finally {
                setLoading(false);
            }
        }

        loadSessions();
    }, []);

    if (loading) return <p>Chargement...</p>;
    if (error) return <p>{error}</p>;


    const CustomTooltip = ({ active, payload }) => {
        if (active && payload && payload.length) {
            return (
                <div className="tooltip-line">
                    <p>{`${payload[0].value} min`}</p>
                </div>
            );
        }
        return null;
    };

    const CustomCursor = ({ points }) => {
        const { x } = points[0];
        return (
            <Rectangle fill="#00000020" x={x} width={500} height={300} />
        );
    };

    return (
        <div className="length-session">
            <h3>Durée moyenne des sessions</h3>
            <ResponsiveContainer width="100%" height="100%">
                <LineChart
                    data={sessionData}
                    margin={{ top: 60, right: 10, left: 10, bottom: 10 }}
                >
                    <XAxis
                        dataKey="day"
                        axisLine={false}
                        tickLine={false}
                        stroke="#FFFFFF80"
                        tick={{ fontSize: 12 }}
                        padding={{ left: 10, right: 10 }}
                    />
                    <YAxis hide={true} domain={["dataMin - 10", "dataMax + 20"]} />
                    <Tooltip content={<CustomTooltip />} cursor={<CustomCursor />} />
                    <Line
                        type="monotone"
                        dataKey="sessionLength"
                        stroke="#FFFFFF"
                        strokeWidth={2}
                        dot={false}
                        activeDot={{
                            r: 4,
                            stroke: "#FFFFFF",
                            fill: "#FFFFFF",
                        }}
                    />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
};
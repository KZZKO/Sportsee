import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getUserAverageSessions } from "../../services/api";
import "./index.scss";

import { LineChart, Line, XAxis, YAxis, Tooltip, Rectangle, ResponsiveContainer } from "recharts";

export const LengthSession = () => {
    const { id } = useParams();
    const userId = Number(id) || 12;

    const [sessionData, setSessionData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function loadSessions() {
            try {
                const data = await getUserAverageSessions(userId);
                setSessionData(data.sessions);
            } catch (err) {
                console.error(err);
                setError("Impossible de charger les données de sessions.");
            } finally {
                setLoading(false);
            }
        }

        loadSessions();
    }, [userId]);

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
        return <Rectangle fill="#00000020" x={x} width={500} height={300} />;
    };

    return (
        <div className="length-session">
            <h3>Durée moyenne des sessions</h3>
            <ResponsiveContainer width="100%" height="100%">
                <LineChart
                    data={sessionData}
                    margin={{ top: 60, right: 10, left: 10, bottom: 10 }}
                >
                    <defs>
                        <linearGradient id="lineGradient" x1="0" y1="0" x2="1" y2="0">
                            <stop offset="0%" stopColor="#ffffff4c" />
                            <stop offset="100%" stopColor="#ffffffff" />
                        </linearGradient>
                    </defs>

                    <XAxis
                        dataKey="id"
                        axisLine={false}
                        tickLine={false}
                        stroke="#FFFFFF80"
                        tick={({ x, y, index }) => {
                            const day = sessionData[index].day;
                            return (
                                <text x={x} y={y + 15} textAnchor="middle" fill="#FFFFFF80" fontSize={12}>
                                    {day}
                                </text>
                            );
                        }}
                        padding={{ left: 10, right: 10 }}
                    />
                    <YAxis hide={true} domain={["dataMin - 10", "dataMax + 20"]} />
                    <Tooltip content={<CustomTooltip />} cursor={<CustomCursor />} />

                    <Line
                        type="monotone"
                        dataKey="sessionLength"
                        stroke="url(#lineGradient)"
                        strokeWidth={2}
                        dot={false}
                        activeDot={(props) => {
                            const { cx, cy } = props;
                            return <circle cx={cx} cy={cy} r={4} fill="#FFFFFF" stroke="#FFFFFF" />;
                        }}
                    />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
};
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getUserMainData } from "../../services/api";
import "./index.scss";

// Recharts
import { RadialBarChart, RadialBar, PolarAngleAxis, ResponsiveContainer } from "recharts";

export const ScoreChart = () => {
    const { id } = useParams();
    const userId = Number(id) || 12;

    const [score, setScore] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function loadScore() {
            try {
                const data = await getUserMainData(userId);
                const userScore = data.todayScore || data.score || 0;
                setScore(userScore * 100);
            } catch (err) {
                console.error(err);
                setError("Impossible de charger le score.");
            } finally {
                setLoading(false);
            }
        }

        loadScore();
    }, [userId]);

    if (loading) return <p>Chargement...</p>;
    if (error) return <p>{error}</p>;

    const data = [
        {
            name: "Score",
            value: score,
            fill: "#FF0000",
        },
    ];

    return (
        <div className="score-chart">
            <h3 className="score-title">Score</h3>
            <ResponsiveContainer width="100%" height="100%">
                <RadialBarChart
                    data={data}
                    startAngle={90}
                    endAngle={450}
                    innerRadius="70%"
                    outerRadius="80%"
                    barSize={10}
                >
                    <RadialBar
                        dataKey="value"
                        cornerRadius={10}
                        background={{
                            fill: "white",
                        }}
                    />
                    <PolarAngleAxis type="number" domain={[0, 100]} tick={false} />
                </RadialBarChart>
            </ResponsiveContainer>

            <div className="score-center">
                <p className="score-percent">{score}%</p>
                <p className="score-text">
                    de votre<br />objectif
                </p>
            </div>
        </div>
    );
};
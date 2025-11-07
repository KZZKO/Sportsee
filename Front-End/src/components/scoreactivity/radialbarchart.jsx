import { useEffect, useState } from "react";
import { getUserMainData } from "../../services/api";
import "./index.scss";

// IMP//
import { RadialBarChart, RadialBar, PolarAngleAxis, ResponsiveContainer } from "recharts";

export const ScoreChart = () => {
    const [score, setScore] = useState(0);

    useEffect(() => {
        getUserMainData(12)
            .then((data) => {
                const userScore = data.todayScore || data.score || 0;
                setScore(userScore * 100);
            })
            .catch((err) => console.error(err));
    }, []);

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
                    innerRadius="70%"
                    outerRadius="80%"
                    barSize={10}
                    data={data}
                    startAngle={90}
                    endAngle={450}
                >
                    <PolarAngleAxis
                        type="number"
                        domain={[0, 100]}
                        tick={false}
                    />
                    <RadialBar
                        dataKey="value"
                        cornerRadius={10}
                    />
                </RadialBarChart>
            </ResponsiveContainer>
            <div className="score-center">
                <p className="score-percent">{score}%</p>
                <p className="score-text">de votre<br />objectif</p>
            </div>
        </div>
    );
};
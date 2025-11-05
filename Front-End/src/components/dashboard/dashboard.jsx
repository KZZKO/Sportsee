import { useEffect, useState } from "react";
import { getUserMainData } from "../../services/api";
import "./index.scss";

// IMP//
import { DailyActivity } from "../dailyactivity/barchart";

export const Dashboard = () => {
    const [user, setUser] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        getUserMainData(12)
            .then((data) => setUser(data))
            .catch((err) => setError(err.message));
    }, []);

    if (error) return <p>Erreur : {error}</p>;
    if (!user) return <p>Chargement...</p>;

    return (
        <section className="section-dashboard">
            <div className="dashboard-header">
                <h2>
                    Bonjour <span>{user.userInfos.firstName}</span>
                </h2>
                <p>Félicitation ! Vous avez explosé vos objectifs hier 👏</p>
            </div>
            <div className="dashboard-content">
                <div className="dashboard-content-left">
                    <div className="content-top">
                        <DailyActivity />
                    </div>
                    <div className="content-bot">

                    </div>
                </div>
                <div className="dashboard-content-right">

                </div>
            </div>
        </section>
    );
};
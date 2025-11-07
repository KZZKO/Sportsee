import { useEffect, useState } from "react";
import { getUserMainData } from "../../services/api";
import "./index.scss";

// IMP //
import { DailyActivity } from "../dailyactivity/barchart";
import { LengthSession } from "../lengthactivity/linechart";
import { PerfChart } from "../perfactivity/radarchart";
import { ScoreChart } from "../scoreactivity/radialbarchart";
import { NutrimentCard } from "../nutriment/nutriment";

import CalLogo from '../../assets/images/energy.png';
import ProtLogo from '../../assets/images/chicken.png';
import GluLogo from '../../assets/images/apple.png';
import LipLogo from '../../assets/images/cheeseburger.png';

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

    const { calorieCount, proteinCount, carbohydrateCount, lipidCount } = user.keyData;

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
                        <LengthSession />
                        <PerfChart />
                        <ScoreChart />
                    </div>
                </div>
                <div className="dashboard-content-right">
                    <NutrimentCard
                        NutImg={CalLogo}
                        NutAlt="Calories"
                        NutAmount={calorieCount}
                        NutUnit="kCal"
                        NutType="Calories"
                        bgColor="#FF000020"
                    />
                    <NutrimentCard
                        NutImg={ProtLogo}
                        NutAlt="Protéines"
                        NutAmount={proteinCount}
                        NutUnit="g"
                        NutType="Protéines"
                        bgColor="#4AB8FF20"
                    />
                    <NutrimentCard
                        NutImg={GluLogo}
                        NutAlt="Glucides"
                        NutAmount={carbohydrateCount}
                        NutUnit="g"
                        NutType="Glucides"
                        bgColor="#F9CE2320"
                    />
                    <NutrimentCard
                        NutImg={LipLogo}
                        NutAlt="Lipides"
                        NutAmount={lipidCount}
                        NutUnit="g"
                        NutType="Lipides"
                        bgColor="#FD518120"
                    />
                </div>
            </div>
        </section>
    )
}
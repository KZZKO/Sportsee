import { useParams } from "react-router-dom";
import { Header } from "../../components/header/header";
import { Nav } from "../../components/nav/nav";
import { Dashboard } from "../../components/dashboard/dashboard";
import './index.scss';

export const Index = () => {
    const { id } = useParams();

    return (
        <>
            <Header />
            <main className="main-section">
                <Nav />
                <Dashboard userId={id} />
            </main>
        </>
    );
};
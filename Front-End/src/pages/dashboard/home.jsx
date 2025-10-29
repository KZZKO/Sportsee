import { Header } from "../../components/header/header";
import { Nav } from "../../components/nav/nav";
import { Dashboard } from "../../components/dashboard/dashboard";
import './index.scss';

export const Index = () => {
    return (
        <>
            <Header />
            <div className="main-section">
                <Nav />
                <Dashboard />
            </div>
        </>
    )
}
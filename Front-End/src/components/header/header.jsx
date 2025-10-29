import SportseeLogo from '../../assets/images/Sportseelogo.webp';
import './index.scss';

export const Header = () => {

    return (
        <header>
            <nav>
                <ul>
                    <li>
                        <img src={SportseeLogo} alt="Logo SportSee" />
                        <h1>SportSee</h1>
                    </li>
                    <li>Accueil</li>
                    <li>Profil</li>
                    <li>Réglage</li>
                    <li>Communauté</li>
                </ul>
            </nav>
        </header>
    )
}
import './index.scss';

// IMP// 
import SportseeLogo from '../../assets/images/Sportseelogo.webp';

export const Header = () => {

    return (
        <header>
            <nav>
                <div className='logo'>
                    <img src={SportseeLogo} alt="Logo SportSee" />
                    <h1>SportSee</h1>
                </div>
                <ul>
                    <li>Accueil</li>
                    <li>Profil</li>
                    <li>Réglage</li>
                    <li>Communauté</li>
                </ul>
            </nav>
        </header>
    )
}
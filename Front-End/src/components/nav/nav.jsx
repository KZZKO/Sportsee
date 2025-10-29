import { NavButton } from '../navbutton/navbutton';
import './index.scss';

// IMP//
import Forme from '../../assets/images/Forme.png';
import Nage from '../../assets/images/Nage.png';
import Velo from '../../assets/images/Vélo.png';
import Musculation from '../../assets/images/Musculation.png';

export const Nav = () => {
    return (
        <div className='left-bloc'>
            <nav className='left-nav'>
                <NavButton
                    icon={Forme}
                    alt='Forme' />
                <NavButton
                    icon={Nage}
                    alt='Natation' />
                <NavButton
                    icon={Velo}
                    alt='Vélo' />
                <NavButton
                    icon={Musculation}
                    alt='Musculation' />
            </nav>
            <p>Copyright, SportSee 2025</p>
        </div >
    )
}
import './index.scss';

export const NavButton = ({ icon, alt }) => {
    return (
        <button>
            <img src={icon} alt={alt} />
        </button>
    )
}
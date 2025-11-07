import './index.scss';

// IMP//

export const NutrimentCard = ({ NutImg, NutAlt, NutAmount, NutUnit, NutType, bgColor }) => {
    return (
        <div className='nut-card'>
            <div className='nut-card-int'>
                <div className='nut-left-icon' style={{ backgroundColor: bgColor }}>
                    <img src={NutImg} alt={NutAlt} />
                </div>
                <div className='nut-right'>
                    <p className='nut-right-title'>
                        {NutAmount}{NutUnit}
                    </p>
                    <p className='nut-right-text'>
                        {NutType}
                    </p>
                </div>
            </div>
        </div>
    )
};
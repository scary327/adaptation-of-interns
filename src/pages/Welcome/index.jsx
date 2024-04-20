import { React } from 'react';
// import { PageLoader } from '../../components/PageLoader/index.jsx';
import { LeftWelcome } from '../../components/WelcomeTopComponents/LeftWelcome/index.jsx';
import { RightWelcome } from '../../components/WelcomeTopComponents/RightWelcome/index.jsx';

export const WelcomePage = () => {
    return (
        <div className='welcome-page__top-container'>
            <LeftWelcome />
            <RightWelcome />
        </div>
    )
}
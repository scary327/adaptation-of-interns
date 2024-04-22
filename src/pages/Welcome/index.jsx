import { React, useState } from 'react';
// import { PageLoader } from '../../components/PageLoader/index.jsx';
import { LeftWelcome } from '../../components/WelcomeTopComponents/LeftWelcome/index.jsx';
import { RightWelcome } from '../../components/WelcomeTopComponents/RightWelcome/index.jsx';
import LoginModalForm from '../../containers/LoginModalForm/index.jsx';

export const WelcomePage = () => {

    const [openModal, setOpenModal] = useState(false);

    return (
        <div className='welcome-page__container'>
            <div className='welcome-page__top-container'>
                <LeftWelcome />
                <RightWelcome setOpenModal={setOpenModal} />
            </div>
            <LoginModalForm
                openModal={openModal}
                setOpenModal={setOpenModal} />
        </div>
    )
}
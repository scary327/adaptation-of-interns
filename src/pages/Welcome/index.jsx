import { useState, useEffect } from 'react';
import styles from './welcome-page.module.css';
import { RightWelcome } from '../../components/WelcomeComponents/WelcomeTop/RightWelcome/index.jsx';
import { LeftWelcome } from '../../components/WelcomeComponents/WelcomeTop/LeftWelcome/index.jsx';
import LoginModalForm from '../../containers/LoginModalForm/index.jsx';
import { WelcomeMainComponent } from '../../components/WelcomeComponents/WelcomeMain/index.jsx';
import { WelcomeBottomComponent } from '../../components/WelcomeComponents/WelcomeBottom/index.jsx';

export const WelcomePage = () => {

    const [openModal, setOpenModal] = useState(false);

    return (
        <div className={styles.container}>
            <div className={styles.top_container}>
                <LeftWelcome setOpenModal={setOpenModal} />
                <RightWelcome setOpenModal={setOpenModal} />
                <LoginModalForm
                    openModal={openModal}
                    setOpenModal={setOpenModal} />
            </div>
            <div className={styles.section}>
                <WelcomeMainComponent />
            </div>
            <div className={styles.section}>
                <WelcomeBottomComponent />
            </div>
        </div>
    )
}
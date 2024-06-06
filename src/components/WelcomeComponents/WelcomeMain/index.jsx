import styles from './welcome-main.module.css';
import UserCardImage from '../../../theme/images/userCard.png';
import CreateUserImage from '../../../theme/images/createNewUser.png';
import { useState, useEffect } from 'react';

export const WelcomeMainComponent = () => {

    const [isMoved, setIsMoved] = useState(false);

    useEffect(() => {
        const interval = setInterval(() => {
            setIsMoved(prevState => !prevState);
        }, 5000);
        
        return () => clearInterval(interval);
    }, []);

    const handleImageClick = () => {
        setIsMoved(prevState => !prevState);
    };

    return (
        <div className={styles.container}>
            <div className={styles.right_container}>
                <p className={styles.title}>Удобное управление пользователями</p>
                <p className={styles.description}>Наше решение предлагает удобное управление пользователями, предоставляя полный контроль над созданием, удалением и&nbsp;просмотром информации о&nbsp;пользователях.</p>
            </div>
            <div className={styles.left_container}>
                <div className={styles.images_container} onClick={handleImageClick}>
                <img
                    src={UserCardImage}
                    alt='user card'
                    className={`${styles.images} ${styles.image1} ${isMoved ? styles.moved : ''} ${!isMoved ? '' : styles.dimmed}`}
                />
                <img
                    src={CreateUserImage}
                    alt='create user'
                    className={`${styles.images} ${styles.image2} ${isMoved ? styles.moved : ''} ${!isMoved ? styles.dimmed : ''}`}
                />
                </div>
            </div>
        </div>
    )
}
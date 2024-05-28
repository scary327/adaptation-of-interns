import { useState } from "react";
import { UserCardModal } from "../UserCardModal";
import styles from './user-card.module.css';

export const UserCard = (props) => {

    const { userInfo } = props;
    const [ openModal, setOpenModal ] = useState(false);

    return (
        <>
            <div className={styles.container} onClick={() => setOpenModal(true)}>
                <img src={userInfo.img ? userInfo.img : 'src/theme/images/default-avatar.png'} 
                    alt='user-avatar'
                    className={styles.user_avatar} />
                <div className={styles.user_full_name}>
                    {userInfo.surname} {userInfo.name}
                </div>
                <div className={styles.user_description}>
                    {userInfo.descriptionProfile}
                </div>
            </div>
            { openModal && (
                <UserCardModal userInfo={userInfo} 
                    closeModal={() => setOpenModal(false)} />
            )}
        </>
    )
};
import { useContext } from 'react';
import styles from './user-card-modal.module.css';
import { UserInfoContext } from '../../RootApp';

export const UserCardModal = (props) => {

    const { roleDictionary } = useContext(UserInfoContext);

    const { userInfo, closeModal, mentor } = props;
    const translatedRole = roleDictionary[userInfo.role];

    return (
        <div className={styles.background_container}>
            <div className={styles.container}>
                <button className={styles.close_btn} onClick={closeModal}>
                    <img src='src/theme/images/cross.svg' alt='cross-img'></img>
                </button>
                <div className={styles.top_container}>
                    <img src={userInfo.img ? userInfo.img : 'src/theme/images/default-avatar.png'}
                        alt="user-avatar" className={styles.user_avatar} />
                    <div className={styles.top_name__container}>
                        <span className={styles.top_span}>{userInfo.surname} {userInfo.name} {userInfo.middleName}</span>
                        <div className={styles.top_name__descr_container}>
                            <span className={styles.top_span_small}>{translatedRole}</span>
                            <em className={styles.top_span_small}>{userInfo.email}</em>
                        </div>
                    </div>
                </div>
                <div className={styles.main_container}>
                    <div className={styles.main_left_container}>
                        <div className={styles.main_text}>
                            telegram
                        </div>
                        <div className={styles.main_text}>
                            vk
                        </div>
                        <div className={styles.main_text}>
                            наставник
                        </div>
                    </div>
                    <div className={styles.main_right_container}>
                        <span className={styles.main_span}>{userInfo.telegram ? userInfo.telegram : 'Нет telegram'}</span>
                        <span className={styles.main_span}>{userInfo.vk ? userInfo.vk : 'Нет vk'}</span>
                        <span className={styles.main_span}>{mentor}</span>
                    </div>
                </div>
                <button className={styles.delete_btn}>Удалить</button>
            </div>
        </div>
    )
}
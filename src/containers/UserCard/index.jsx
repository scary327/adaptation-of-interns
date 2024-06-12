import { useContext, useState } from "react";
import { UserCardModal } from "../UserCardModal";
import styles from './user-card.module.css';
import { UserInfoContext } from "../../RootApp";

export const UserCard = (props) => {

    const { userInfo, userList, setUserList } = props;
    const { roleDictionary } = useContext(UserInfoContext);
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
                    {roleDictionary[userInfo.role]}
                </div>
            </div>
            { openModal && (
                <UserCardModal cardUser={userInfo} userList={userList} setUserList={setUserList}
                    closeModal={() => setOpenModal(false)} />
            )}
        </>
    )
};
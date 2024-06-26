import { useContext } from "react"
import { UserInfoContext } from "../../RootApp"
import styles from './user-right-info.module.css';
import { useNavigate } from "react-router-dom";
import DefaultAvatar from '../../theme/images/default-avatar.png';

export const UserRightInfo = () => {
    const { userInfo } = useContext(UserInfoContext);
    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/user-profile');
    }

    return (
        <div className={styles.container} onClick={() => handleClick()}>
            <div className={styles.user_name}>{userInfo.surname} {userInfo.name[0]}.</div>
            <img src={userInfo.img ? userInfo.img : DefaultAvatar}
                alt='user-avatar' 
                className={styles.user_avatar}
            />
        </div>
    )
}
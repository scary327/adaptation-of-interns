import { useContext, useState } from "react"
import { UserInfoContext } from "../../RootApp";
import styles from './user-profile.module.css';
import { HeaderContainer } from "../../app/Header/HeaderContainer";
import { useForm } from "react-hook-form";
import { UserInfoContainer } from "../../containers/UserInfoContainer";
import Modal from 'react-modal';
import { ChangePassword } from "../../containers/ChangePassword";

export const UserProfile = () => {
    const { userInfo } = useContext(UserInfoContext);
    const [changePwd, setChangePwd] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm();

    return (
        <div className={styles.container}>
            <HeaderContainer />
            <div className={styles.main_container}>
                <p className={styles.main_p}>Мой профиль</p>
                    <form onSubmit={() => handleSubmit()} className={styles.user_info__container}>
                        <div className={styles.user__right_container}>
                            <img 
                                src={userInfo.img ? userInfo.img : 'src/theme/images/default-avatar.png'}
                                alt="User Avatar"
                                className={styles.user__avatar} />
                            <div className={styles.edit_avatar__container}>
                                <button className={styles.button__avatar}>Изменить</button>
                                <input
                                    type="file"
                                    className={styles.input_avatar}
                                    {...register("avatar")} />
                            </div>
                        </div>
                        <div className={styles.user_form__container}>
                            <p className={styles.user_role}><span>Роль: </span>{userInfo.role}</p>
                            <UserInfoContainer />
                            <button className={styles.save__button} type="submit">Сохранить</button>
                            <button className={styles.change_password__button} onClick={() => setChangePwd(true)} type="button" >Изменить пароль</button>
                        </div>
                    </form>           
            </div>
            <Modal 
                isOpen={changePwd}
                onRequestClose={() => setChangePwd(false)} 
                closeOnEscape={true} 
                ariaHideApp={false}
                closeOnOutsideClick={true}
                className={styles.modal__change_pwd}
                style={{
                    overlay: {
                        backgroundColor: 'rgba(26, 26, 26, 0.75)'
                    }
                }}>
                    <ChangePassword close={() => setChangePwd(false)} />
            </Modal>
        </div>
    )
}
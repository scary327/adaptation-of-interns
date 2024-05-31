import { useContext, useEffect, useState } from "react"
import { UserInfoContext } from "../../RootApp";
import styles from './user-profile.module.css';
import { HeaderContainer } from "../../app/Header/HeaderContainer";
import { useForm } from "react-hook-form";
import { UserInfoContainer } from "../../containers/UserInfoContainer";
import Modal from 'react-modal';
import { ChangePassword } from "../../containers/ChangePassword";

export const UserProfile = () => {
    const { userInfo, server, setUserInfo } = useContext(UserInfoContext);
    const [changePwd, setChangePwd] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm();

    async function saveChanges(data) {
        console.log(data);
        const dataToSend = {
            name: data.name,
            surname: data.surname,
            middleName: data.middleName,
            desciptionProfile: data.desciptionProfile,
            telegram: data.telegram,
            vk: data.vk
        }
        await fetch(`${server}/user/${userInfo.id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json;charset=utf-8' },
            body: JSON.stringify(dataToSend)
        }).then((response) => {
            if (!response.ok) throw new Error('Не удалось изменить данные пользователя');
            setUserInfo({
                ...dataToSend,
                role: userInfo.role,
                id: userInfo.id,
                email: userInfo.email
            });
        });
    }

    useEffect(() => {
        localStorage.setItem('pepega', JSON.stringify(userInfo));
    }, [userInfo]);

    // {
    //     "name": "string",
    //     "surname": "string",
    //     "middleName": "string",
    //     "desciptionProfile": "string",
    //     "telegram": "string",
    //     "vk": "string"
    //   }

    return (
        <div className={styles.container}>
            <HeaderContainer />
            <div className={styles.main_container}>
                <p className={styles.main_p}>Мой профиль</p>
                    <form onSubmit={handleSubmit(saveChanges)} className={styles.user_info__container}>
                        <div className={styles.user__right_container}>
                            <img 
                                src={userInfo.img ? userInfo.img : 'src/theme/images/default-avatar.png'}
                                alt="User Avatar"
                                className={styles.user__avatar} />
                            <div className={styles.edit_avatar__container}>
                                <button className={styles.button__avatar} disabled>Изменить</button>
                                <input
                                    type="file"
                                    className={styles.input_avatar} disabled />
                            </div>
                        </div>
                        <div className={styles.user_form__container}>
                            <p className={styles.user_role}><span>Роль: </span>{userInfo.role}</p>
                            <UserInfoContainer register={register} />
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
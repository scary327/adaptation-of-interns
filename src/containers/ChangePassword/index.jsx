import { useForm } from 'react-hook-form';
import styles from './change-password.module.css';
import { UserInfoContext } from '../../RootApp';
import { useContext } from 'react';
export const ChangePassword = ({close}) => {
    const { server, userInfo } = useContext(UserInfoContext);
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm();

    const change = async (data) => {
        await fetch(`${server}/auth/${userInfo.id}/changePassword?oldPassword=${data.oldPassword}&newPassword=${data.newPassword}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json;charset=utf-8' },
        }).then((response) => {
            if (!response.ok) 
                alert(response.text());
                throw new Error('Change password error');
        })
    }

    return (
        <form onSubmit={handleSubmit(change)} className={styles.container}>
            <p className={styles.title}>Смена пароля</p>
            <div className={styles.input__container}>
                <input 
                    className={styles.input}
                    type='password'
                    {...register('oldPassword')} />
                <div className={styles.description}>Старый пароль</div>
            </div>
            <div className={styles.input__container}>
                <input 
                    className={styles.input}
                    type='password'
                    {...register('newPassword')} />
                <div className={styles.description}>Новый пароль</div>
            </div>
            <div className={styles.input__container}>
                <input 
                    className={styles.input}
                    type='password'
                    {...register('repeatNewPassword')} />
                <div className={styles.description}>Повторите новый пароль</div>
            </div>
            <button className={styles.submit__button} type='submit'>Изменить</button>
            <button className={styles.close__button} onClick={close} type='button'>Отмена</button>
        </form>
    )
}
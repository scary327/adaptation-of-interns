import { useForm } from 'react-hook-form';
import styles from './change-password.module.css';

export const ChangePassword = ({close}) => {
    
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm();

    return (
        <form onSubmit={() => handleSubmit()} className={styles.container}>
            <p className={styles.title}>Смена пароля</p>
            <div className={styles.input__container}>
                <input 
                    className={styles.input}
                    type='password'
                    {...register('oldPassword')}  />
                <div className={styles.description}>Старый пароль</div>
            </div>
            <div className={styles.input__container}>
                <input 
                    className={styles.input}
                    type='password'
                    {...register('newPassword')}  />
                <div className={styles.description}>Новый пароль</div>
            </div>
            <div className={styles.input__container}>
                <input 
                    className={styles.input}
                    type='password'
                    {...register('repeatNewPassword')}  />
                <div className={styles.description}>Повторите новый пароль</div>
            </div>
            <button className={styles.submit__button} type='submit'>Изменить</button>
            <button className={styles.close__button} onClick={close} type='button'>Отмена</button>
        </form>
    )
}
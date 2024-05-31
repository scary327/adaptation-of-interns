import { useForm } from 'react-hook-form';
import styles from './new-user.module.css';
import Modal from 'react-modal';
import { useContext } from 'react';
import { UserInfoContext } from '../../RootApp';

export const CreateNewUser = (props) => {

    const {modalOpen, closeModal, userList, setUserList} = props;
    const { server } = useContext(UserInfoContext);

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm();

    async function onSubmit(data) {
        await fetch(`${server}/auth/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json;charset=utf-8' },
            body: JSON.stringify({
                password: data.password,
                email: data.email,
                name: data.name,
                surname: data.surname,
                middleName: data.middleName,
                role: data.role
            })
        }).then((response) => {
            if (!response.ok) 
                throw new Error('http error');
            return response.json() 
        }).then((data) => {
            alert('Пользователь успешно создан');
            setUserList([...userList, data]);
        })
    }

    return (
        <Modal
            isOpen={modalOpen} 
            onRequestClose={closeModal} 
            closeOnEscape={true} 
            closeOnOutsideClick={true}
            ariaHideApp={false}
            style={{
                overlay: {
                    backgroundColor: 'rgba(26, 26, 26, 0.75)'
                }
            }} 
            className={styles.modal_container}>
                <div className={styles.container}>
                    <p className={styles.modal_title}>Добавление пользователя</p>
                    <form onSubmit={handleSubmit(onSubmit)} className={styles.form_container}>
                        <input 
                            type='email' 
                            className={styles.input} 
                            placeholder='Почта'
                            {...register('email')} />
                        <input 
                            type='text'
                            className={styles.input}
                            placeholder='Имя'
                            {...register('name')} />
                        <input 
                            type='text'
                            className={styles.input}
                            placeholder='Фамилия'
                            {...register('surname')} />
                        <input 
                            type='text'
                            className={styles.input}
                            placeholder='Отчество'
                            {...register('middleName')} />
                        <input 
                            type='text' 
                            className={styles.input} 
                            placeholder='Пароль пользователя'
                            {...register('password')} />
                        <select className={styles.select_container} {...register('role')}>
                            <option value='Admin'>Админ</option>
                            <option value='Mentor'>Наставник</option>
                            <option value='Intern'>Стажёр</option>
                        </select>
                        <button type='submit' className={styles.submit_btn}>Создать</button>
                    </form>
                </div>
        </Modal>
    )
}
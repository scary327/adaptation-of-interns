import { useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from 'react-router-dom';
import { UserInfoContext } from "../../RootApp";
import styles from './login.module.css';

const LoginModalForm = (props) => {

    const { openModal, setOpenModal} = props;
    const { userInfo, setUserInfo } = useContext(UserInfoContext);
    const { server } = useContext(UserInfoContext);
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm();

    async function onSubmit(data) {
        await fetch(`${server}/auth/signin`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json;charset=utf-8' },
            body: JSON.stringify({password: data.password, email: data.email})
        }).then((data) => {
            if (!data.ok) {
                data.text().then(error => {
                    alert(error);
                })
                throw new Error('sign in error');
            }
            data.json().then((data1) => {
                localStorage.setItem('pepega', JSON.stringify(data1));
                setUserInfo(data1);
            });
        });
    }

    useEffect(() => {
        if (userInfo) navigate(`/user-profile`);
    }, [navigate, userInfo]);

    const emailPattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    return (
        openModal && (
            <div className={styles.bg_container}>
                <div className={styles.main_container}>
                    <button className={styles.close_btn} onClick={() => setOpenModal(false)}>
                        x
                    </button>
                    <div className={styles.form_container}>
                        <p className={styles.title}>Вход</p>
                        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
                            <input
                                id="email"
                                type="text"
                                {...register("email", {
                                    required: 'Это поле является обязательным', 
                                    pattern: {
                                        value: emailPattern,
                                        message: "Неправильный формат электронной почты"
                                    }
                                })} 
                                placeholder="Электронная почта"
                                className={styles.form_input}
                                />
                            {errors.email && <span className={styles.error_span}>{errors.email.message}</span>}
                            <input 
                                id="password"
                                type="password"
                                {...register("password", {
                                    required: 'Это поле является обязательным!',
                                    minLength: {
                                        value: 8,
                                        message: 'Минимальная длинна пароля - 8 символов(обязательно хотя бы одна цифра)'
                                    },
                                    maxLength: {
                                        value: 15,
                                        message: 'Максимальная длинна пароля - 15 символов'
                                    }
                                })}
                                placeholder="Пароль"
                                className={styles.form_input}
                                />
                                {errors.password && <span className={styles.error_span}>{errors.password.message}</span>}
                            <button className={styles.submit_btn} type="submit">Войти в аккаунт</button>
                        </form>
                    </div>
                </div>
            </div>
        )
    );
}

export default LoginModalForm;
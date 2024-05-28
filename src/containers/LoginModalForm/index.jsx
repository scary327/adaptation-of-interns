import { useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from 'react-router-dom';
import { UserInfoContext } from "../../RootApp";

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
                throw new Error('http error')
            }
            data.json().then((data1) => {
                localStorage.setItem('pepega', JSON.stringify(data1));
                setUserInfo(data1);
            });
        });
    }

    useEffect(() => {
        if (userInfo) navigate(`/user-profile`);
    }, [userInfo]);

    const emailPattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    return (
        openModal && (
            <div className="login-modal__bg-container">
                <div className="login-modal__main-container">
                    <button className="login-modal__close-btn" onClick={() => setOpenModal(false)}>
                        x
                    </button>
                    <div className="login-modal__form-container">
                        <p className="login-modal__title">Вход</p>
                        <form className="login-modal__form" onSubmit={handleSubmit(onSubmit)}>
                            <input
                                id="email"
                                type="text"
                                {...register("email", {required: true, pattern: emailPattern})} 
                                placeholder="Электронная почта"
                                className="login-modal__form-input"
                                />
                            {errors.email && <span className="login-modal__error-span">This field is required and should be a valid email format</span>}
                            <input 
                                id="password"
                                type="password"
                                {...register("password", {required: true})}
                                placeholder="Пароль"
                                className="login-modal__form-input"
                                />
                            {errors.password && <span className="login-modal__error-span">This field is required</span>}
                            <button className="login-modal__submit-btn" type="submit">Войти в аккаунт</button>
                        </form>
                    </div>
                </div>
            </div>
        )
    );
}

export default LoginModalForm;
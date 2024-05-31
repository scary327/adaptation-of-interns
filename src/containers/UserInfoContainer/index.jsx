import { useContext } from 'react';
import styles from './user-info-container.module.css';
import { UserInfoContext } from '../../RootApp';

export const UserInfoContainer = (props) => {

    const { userInfo } = useContext(UserInfoContext);
    const { register } = props;

    const parameterTranslator = {
        surname: 'фамилия',
        name: 'имя',
        middleName: 'отчество',
        desciptionProfile: 'роль в команде',
        mentor: 'наставник',
        vk: 'vk',
        telegram: 'telegram'
    }

    return (
        <div className={styles.user_info__container}>
            <div className={styles.input_container}>
                <input
                    type='email'
                    className={styles.user_info__input}
                    defaultValue={userInfo.email}
                    disabled />
                <div className={styles.input_description}>почта</div>
            </div>
            {Object.entries(userInfo).map(([key, value]) => {
                if (parameterTranslator[key]) {
                    return (
                        <div key={key} className={styles.input_container}>
                            <input
                                type='text'
                                className={styles.user_info__input}
                                defaultValue={value}
                                {...register(`${key}`)} />
                            <div className={styles.input_description}>{parameterTranslator[key]}</div>
                        </div>
                    )
                }
            })}
        </div>
    )
}
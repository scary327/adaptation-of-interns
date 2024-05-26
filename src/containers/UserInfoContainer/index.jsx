import styles from './user-info-container.module.css';

export const UserInfoContainer = (props) => {

    const { userInfo } = props;

    const parameterTranslator = {
        surname: 'фамилия',
        name: 'имя',
        middleName: 'отчество',
        descriptionProfile: 'роль в команде',
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
                    defaultValue={userInfo.email} />
                <div className={styles.input_description}>почта</div>
            </div>
            {Object.entries(userInfo).map(([key, value]) => {
                if (parameterTranslator[key]) {
                    return (
                        <div key={key} className={styles.input_container}>
                            <input
                                type='text'
                                className={styles.user_info__input}
                                defaultValue={value} />
                            <div className={styles.input_description}>{parameterTranslator[key]}</div>
                        </div>
                    )
                }
            })}
        </div>
    )
}
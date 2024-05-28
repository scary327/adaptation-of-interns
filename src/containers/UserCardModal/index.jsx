import { useContext } from 'react';
import styles from './user-card-modal.module.css';
import { UserInfoContext } from '../../RootApp';

export const UserCardModal = (props) => {

    const { roleDictionary } = useContext(UserInfoContext);

    const { userInfo, closeModal } = props;
    const translatedRole = roleDictionary[userInfo.role];

    const mentors = [
        {
            id: 0,
            surname: 'Зверев',
            name: 'Александр',
            middleName: 'Владимирович',
            email: 'cs-govno@yandex.ru',
            img: '',
            role: 'Mentor',
            descriptionProfile: 'Бэкенд Разработчик',
            telegram: '@scary3270',
            vk: 'vk.ru/tiri-piri'
        },
        {
            id: 1,
            surname: 'Рябков',
            name: 'Георгий',
            middleName: 'Константинович',
            email: 'lyublyu-dotu@yandex.ru',
            img: '',
            role: 'Mentor',
            descriptionProfile: 'Фронтенд Разработчик',
            telegram: '@scary3270',
            vk: 'vk.ru/tiri-piri'
        },
        {
            id: 2,
            surname: 'Рябков',
            name: 'Георгий',
            middleName: 'Константинович',
            email: 'lyublyu-dotu@yandex.ru',
            img: '',
            role: 'Mentor',
            descriptionProfile: 'Фронтенд Разработчик',
            telegram: '@scary3270',
            vk: 'vk.ru/tiri-piri'
        },
        {
            id: 3,
            surname: 'Рябков',
            name: 'Георгий',
            middleName: 'Константинович',
            email: 'lyublyu-dotu@yandex.ru',
            img: '',
            role: 'Mentor',
            descriptionProfile: 'Фронтенд Разработчик',
            telegram: '@scary3270',
            vk: 'vk.ru/tiri-piri'
        }
        
    ];

    let currentMentorId = 0; // id уже закрепленного ментора
    const internMentor = mentors.find((mentor) => mentor.id === currentMentorId ? mentor : null);

    return (
        <div className={styles.background_container}>
            <div className={styles.container}>
                <button className={styles.close_btn} onClick={closeModal}>
                    <img src='src/theme/images/cross.svg' alt='cross-img'></img>
                </button>
                <div className={styles.top_container}>
                    <img src={userInfo.img ? userInfo.img : 'src/theme/images/default-avatar.png'}
                        alt="user-avatar" className={styles.user_avatar} />
                    <div className={styles.top_name__container}>
                        <span className={styles.top_span}>{userInfo.surname} {userInfo.name} {userInfo.middleName}</span>
                        <div className={styles.top_name__descr_container}>
                            <span className={styles.top_span_small}>{translatedRole}</span>
                            <em className={styles.top_span_small}>{userInfo.email}</em>
                        </div>
                    </div>
                </div>
                <div className={styles.main_container}>
                    <div className={styles.main_left_container}>
                        <div className={styles.main_text}>
                            telegram
                        </div>
                        <div className={styles.main_text}>
                            vk
                        </div>
                        {userInfo.role === 'Intern' && 
                            <div className={styles.main_text}>
                                наставник
                            </div>
                        }
                    </div>
                    <div className={styles.main_right_container}>
                        <span className={styles.main_span}>{userInfo.telegram ? userInfo.telegram : 'Нет telegram'}</span>
                        <span className={styles.main_span}>{userInfo.vk ? userInfo.vk : 'Нет vk'}</span>
                        { userInfo.role === 'Intern' &&
                            <select defaultValue={'DEFAULT'} onChange={(value) => console.log(value)}>
                                {internMentor ? (
                                    <option key={internMentor.id} value={internMentor.id}>
                                        {internMentor.surname} {internMentor.name} {internMentor.middleName}
                                    </option>
                                ) : (
                                    <option value='DEFAULT' disabled selected>Выбор наставника</option>
                                )}
                                {mentors.map((mentor) => ( mentor.id !== currentMentorId ? 
                                    <option value={mentor.id} key={mentor.id}>
                                        {mentor.surname} {mentor.name} {mentor.middleName}
                                    </option> : <></> 
                                ))}
                            </select>
                        }
                    </div>
                </div>
                <button className={styles.delete_btn}>Удалить</button>
            </div>
        </div>
    )
}
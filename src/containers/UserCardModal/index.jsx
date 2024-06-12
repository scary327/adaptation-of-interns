import { useContext, useState, useEffect } from 'react';
import styles from './user-card-modal.module.css';
import { UserInfoContext } from '../../RootApp';
import { NavLink } from 'react-router-dom';

export const UserCardModal = (props) => {

    const { roleDictionary } = useContext(UserInfoContext);

    const { userInfo, setUserInfo } = useContext(UserInfoContext);
    const { server } = useContext(UserInfoContext);
    const { cardUser, closeModal, userList, setUserList } = props;
    const translatedRole = roleDictionary[cardUser.role];

    const [mentors, setMentors] = useState([]);
    const [selectedMentor, setSelectedMentor] = useState('DEFAULT');
    const [internMentor, setInternMentor] = useState(null);

    const deleteUser = () => {
        fetch(`${server}/user/${cardUser.id}`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json;charset=utf-8' },
        });
        setUserList(userList.filter(elem => elem.id !== cardUser.id));
        closeModal()
        if (cardUser.id === userInfo.id) {
            localStorage.clear();
            setUserInfo(null);
        }
    }

    useEffect(() => {
        const fetchUsers = async () => {
            if (userInfo.role === "Admin") {
                try {
                    const response = await fetch(`${server}/user/Mentor`, {
                        method: 'GET',
                        headers: { 'Content-Type': 'application/json;charset=utf-8' },
                    });
    
                    if (!response.ok) {
                        throw new Error('HTTP error');
                    }
    
                    let data = await response.json();
                    setMentors(data);

                    const secondResponse = await fetch(`${server}/internship/mentorIntern/intern/${cardUser.id}`, {
                        method: 'GET',
                        headers: { 'Content-Type': 'application/json;charset=utf-8' },
                    });

                    if (!secondResponse.ok) {
                        throw new Error('HTTP error');
                    }

                    data = await secondResponse.json();
                    setInternMentor(data[0]);
                   
                } catch (error) {
                    console.error('Error fetching users:', error);
                }
            }
        };
    
        fetchUsers();
    }, []);
    
    useEffect(() => {
        if (internMentor)
            setSelectedMentor(internMentor.mentorId);
    }, [internMentor]);

    const changeMentor = (value) => {
        setSelectedMentor(value);
        const dataToSend = JSON.stringify({ mentorId: value , internId: cardUser.id});
        fetch(`${server}/internship/mentorIntern/intern/${cardUser.id}`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json;charset=utf-8' }
        }).then((responce) => {
            if (responce.ok)
                fetch(`${server}/internship/mentorIntern`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json;charset=utf-8' },
                    body: dataToSend
                });
        });
       
    }

    return (
        <div className={styles.background_container}>
            <div className={styles.container}>
                <button className={styles.close_btn} onClick={closeModal}>
                    <img src='src/theme/images/cross.svg' alt='cross-img'></img>
                </button>
                <div className={styles.top_container}>
                    <img src={cardUser.img ? cardUser.img : 'src/theme/images/default-avatar.png'}
                        alt="user-avatar" className={styles.user_avatar} />
                    <div className={styles.top_name__container}>
                        <span className={styles.top_span}>{cardUser.surname} {cardUser.name} {cardUser.middleName}</span>
                        <div className={styles.top_name__descr_container}>
                            <span className={styles.top_span_small}>{translatedRole}</span>
                            <em className={styles.top_span_small}>{cardUser.email}</em>
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
                        {cardUser.role === 'Intern' && userInfo.role === 'Admin' &&
                            <div className={styles.main_text}>
                                наставник
                            </div>
                        }
                    </div>
                    <div className={styles.main_right_container}>
                        <span className={styles.main_span}>{cardUser.telegram ? cardUser.telegram : 'Нет telegram'}</span>
                        <span className={styles.main_span}>{cardUser.vk ? cardUser.vk : 'Нет vk'}</span>
                        { cardUser.role === 'Intern' && userInfo.role === 'Admin' &&
                         <select className={styles.custom_select} value={selectedMentor} onChange={(e) => changeMentor(e.target.value)}>
                         <option value='DEFAULT'>
                             Выбор наставника
                         </option>
                         {mentors.map((mentor) => (
                             <option key={mentor.id} value={mentor.id}>
                                 {mentor.surname} {mentor.name} {mentor.middleName}
                             </option>
                         ))}
                        </select>
                          
                        }
                    </div>
                    { cardUser.role === 'Intern' &&
                        <NavLink to={`/gantt/${cardUser.id}`} className={styles.main_link}>Перейти в гант</NavLink>
                    }
                </div>
                <button className={styles.delete_btn} onClick={() => deleteUser()}>Удалить</button>
            </div>
        </div>
    )
}
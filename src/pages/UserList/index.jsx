import { useContext, useState, useEffect } from "react";
import styles from './user-list.module.css';
import { UserInfoContext } from '../../RootApp';
import { HeaderContainer } from "../../app/Header/HeaderContainer";
import { UserCard } from "../../containers/UserCard";
import { FilterRole } from "../../components/FilterRoleElem";
import { UserRightInfo } from "../../components/UserRightInfo";
import { CreateNewUser } from "../../containers/CreateNewUser";

export const UserList = () => {
    const { userInfo } = useContext(UserInfoContext);

    const [ filterRole, setFilterRole ] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const [userList, setUserList] = useState([]); 
    const { server } = useContext(UserInfoContext);

    useEffect(() => {
        const fetchUsers = async () => {
            if (userInfo.role === "Admin") {
                try {
                    const response = await fetch(`${server}/user`, {
                        method: 'GET',
                        headers: { 'Content-Type': 'application/json;charset=utf-8' },
                    });
    
                    if (!response.ok) {
                        throw new Error('HTTP error');
                    }
    
                    const data = await response.json();
                    setUserList(data);
                } catch (error) {
                    console.error('Error fetching users:', error);
                }
            }
            if (userInfo.role === "Mentor") {
                try {
                    const response = await fetch(`${server}/internship/mentorIntern/mentor/${userInfo.id}/users`, {
                        method: 'GET',
                        headers: { 'Content-Type': 'application/json;charset=utf-8' },
                    });
    
                    if (!response.ok) {
                        throw new Error('HTTP error');
                    }
    
                    const data = await response.json();
                    setUserList(data);
                } catch (error) {
                    console.error('Error fetching users:', error);
                }
            }
                
        };
    
        fetchUsers();
    }, []);

    const filterList = [
        {
            id: 1,
            name: 'стажёр',
            role: 'Intern'
        }, 
        {
            id: 2,
            name: 'куратор',
            role: 'Mentor'
        },
        {
            id: 3,
            name: 'админ',
            role: 'Admin'
        },
        {
            id: 4,
            name: 'все',
            role: ''
        }
    ]

    const filteredUsers = userList.filter((user) => {
        if (filterRole && user.role.toLowerCase()!== filterRole.toLowerCase()) {
            return false;
        }

        if (searchQuery &&!`${user.surname} ${user.name} ${user.middleName}`.toLowerCase().includes(searchQuery.toLowerCase())) {
            return false;
        }

        return true;
    });

    const [modalOpen, setOpenModal] = useState(false);

    return (
        <div className={styles.container}>
            <HeaderContainer />
            <div className={styles.main_container}>
                <div className={styles.top_container}>
                    { userInfo.role === 'Admin' ? (
                        <div className={styles.admin_top_container}>
                            <p className={styles.title}>Пользователи</p>
                            <button type="button" onClick={() => setOpenModal(true)} className={styles.admin_btn}>Добавить</button>
                            <CreateNewUser userList={userList} setUserList={setUserList}  modalOpen={modalOpen} closeModal={() => setOpenModal(false)} />
                        </div>
                    ) : (
                        <p className={styles.title}>Стажёры</p>
                    )}
                    <UserRightInfo />
                </div>
                { userInfo.role === 'Admin' ? (
                    <form className={styles.filter_container}>
                        <input type='text' 
                            placeholder="поиск..." 
                            className={styles.filter_input}
                            onChange={(e) => setSearchQuery(e.target.value)} />
                        <span className={styles.filter_description}>должность:</span>
                        <div className={styles.role_container}>
                            {filterList.map((role) => (
                                <FilterRole name={role.name} key={role.id} onClick={() => setFilterRole(role.role)} />
                            ))}
                        </div>
                    </form>
                ) : (
                    <></>
                ) }
                <div className={styles.user_cards__container}>
                    {userInfo.role === 'Admin' && filteredUsers.map((user) => (
                        <UserCard userInfo={user} key={user.id} />
                    ))}
                    {userInfo.role === 'Mentor' && userList.map((user) => (
                        <UserCard userInfo={user} key={user.id} />
                    ))}
                </div>
            </div>
        </div>
    )
}
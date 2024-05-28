import { useContext, useState } from "react";
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

    const usersList = [
        {
            id: userInfo.id,
            surname: userInfo.surname,
            name: userInfo.name,
            middleName: userInfo.middleName,
            email: userInfo.email,
            img: userInfo.img,
            role: userInfo.role,
            descriptionProfile: userInfo.descriptionProfile,
            vk: userInfo.vk,
            telegram: userInfo.telegram
        },
        {
            id: 1,
            surname: 'Новиков',
            name: 'Антон',
            middleName: 'Романович',
            email: 'dota-govno@yandex.ru',
            img: '',
            role: 'Intern',
            descriptionProfile: 'Дизайнер',
            telegram: '@scary3270',
            vk: 'vk.ru/tiri-piri',
            mentor: 0
        },
        {
            id: 2,
            surname: 'Зверев',
            name: 'Александр',
            middleName: 'Владимирович',
            email: 'cs-govno@yandex.ru',
            img: '',
            role: 'Mentor',
            descriptionProfile: 'Бэкенд Разработчик',
            telegram: '@scary3270',
            vk: 'vk.ru/tiri-piri',
            mentor: ''
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
            vk: 'vk.ru/tiri-piri',
            mentor: ''
        },
        {
            id: 4,
            surname: 'Иванов',
            name: 'Иван',
            middleName: 'Иванович',
            email: 'lol-huynya@yandex.ru',
            descriptionProfile: '',
            telegram: '',
            vk: '',
            role: 'Admin'
        }
    ];

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

    const filteredUsers = usersList.filter((user) => {
        if (filterRole && user.role.toLowerCase()!== filterRole.toLowerCase()) {
            return false;
        }

        if (searchQuery &&!`${user.surname} ${user.name} ${user.middleName}`.toLowerCase().includes(searchQuery.toLowerCase())) {
            return false;
        }

        return true;
    });
    
    const internUsers = usersList.filter((user) => {
        if (user.role === 'Intern' && user.mentor === userInfo.id) {
            return true
        }

        return false;
    });

    const [modalOpen, setOpenModal] = useState(false);

    return (
        <div className="user-list__container">
            <HeaderContainer />
            <div className="user-list__main-container">
                <div className="user-list__top-container">
                    { userInfo.role === 'Admin' ? (
                        <div className="user-list__admin-top-container">
                            <p className="user-list__title">Пользователи</p>
                            <button type="button" onClick={() => setOpenModal(true)} className="user-list__admin-btn">Добавить</button>
                            <CreateNewUser modalOpen={modalOpen} closeModal={() => setOpenModal(false)} />
                        </div>
                    ) : (
                        <p className="user-list__title">Стажёры</p>
                    )}
                    <UserRightInfo />
                </div>
                { userInfo.role === 'Admin' ? (
                    <form className="user-list__filter-container">
                        <input type='text' 
                            placeholder="поиск..." 
                            className="user-list__filter-input"
                            onChange={(e) => setSearchQuery(e.target.value)} />
                        <span className="user-list__filter-description">должность:</span>
                        <div className="user-list__filter-role-container">
                            {filterList.map((role) => (
                                <FilterRole name={role.name} key={role.id} onClick={() => setFilterRole(role.role)} />
                            ))}
                        </div>
                    </form>
                ) : (
                    <></>
                ) }
                <div className="user-list__user-cards">
                    {userInfo.role === 'Admin' && filteredUsers.map((user) => (
                        <UserCard userInfo={user} key={user.id} />
                    ))}
                    {userInfo.role === 'Mentor' && internUsers.map((user) => (
                        <UserCard userInfo={user} key={user.id} />
                    ))}
                </div>
            </div>
        </div>
    )
}
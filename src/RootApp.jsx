import './theme/app.css';

import { BrowserRouter, Navigate, Route, Routes} from 'react-router-dom';
import { WelcomePage } from './pages/Welcome';
import { UserList } from './pages/UserList';
import { UserProfile } from './pages/UserProfile';
import { createContext } from 'react';
import RequireAuth from './containers/RequireAuth';
import { Constructor } from './pages/Constructor';

export const UserInfoContext = createContext();

export default function RootApp() {

    //надо с бд получать
    const userInfo = {
        id: 0,
        role: 'Admin',
        name: 'Илья',
        surname: 'Калугин',
        middleName: 'Александрович',
        email: 'lol-govno@yandex.ru',
        descriptionProfile: 'Фронтенд разработчик',
        img: '',
        telegram: '@scary3270',
        vk: 'vk.ru/tiri-piri',
        mentor: ''
    };

    const roleDictionary = {
        Admin: 'Админ',
        Mentor: 'Наставник',
        Intern: 'Стажёр'
    };

    return (
        <UserInfoContext.Provider value={{userInfo, roleDictionary}} >
            <BrowserRouter>
                <Routes>
                    <Route path='/' exact element={<WelcomePage />}/>
                    <Route path='/intern-profile' exact element={<RequireAuth><UserProfile /></RequireAuth>}/>
                    <Route path='/user-list' exact element={<RequireAuth><UserList /></RequireAuth>} />
                    <Route path='/constructor' exact element={<RequireAuth><Constructor/></RequireAuth>} />
                    <Route path='*' element={<Navigate to="/" />} />
                </Routes>
            </BrowserRouter>
        </UserInfoContext.Provider>
    )
}
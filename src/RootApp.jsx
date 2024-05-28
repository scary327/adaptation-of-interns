import './theme/app.css';

import { BrowserRouter, Navigate, Route, Routes} from 'react-router-dom';
import { WelcomePage } from './pages/Welcome';
import { UserList } from './pages/UserList';
import { UserProfile } from './pages/UserProfile';
import { createContext, useEffect, useState } from 'react';
import RequireAuth from './containers/RequireAuth';
import { Constructor } from './pages/Constructor';

export const UserInfoContext = createContext();

export default function RootApp() {

    const [userInfo, setUserInfo] = useState(JSON.parse(localStorage.getItem('pepega')));

    const roleDictionary = {
        Admin: 'Админ',
        Mentor: 'Наставник',
        Intern: 'Стажёр'
    };

    const server = 'http://localhost:5045/api';


    return (
        <UserInfoContext.Provider value={{userInfo, setUserInfo, roleDictionary, server}}>
            <BrowserRouter>
                <Routes>
                    <Route path='/' exact element={<WelcomePage />}/>
                    <Route path='/user-profile' exact element={<RequireAuth><UserProfile /></RequireAuth>}/>
                    <Route path='/user-list' exact element={<RequireAuth><UserList /></RequireAuth>} />
                    <Route path='/constructor' exact element={<RequireAuth><Constructor/></RequireAuth>} />
                    <Route path='*' element={<Navigate to="/" />} />
                </Routes>
            </BrowserRouter>
        </UserInfoContext.Provider>
    )
}
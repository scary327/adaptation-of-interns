import './theme/app.css';

import { BrowserRouter, Navigate, Route, Routes} from 'react-router-dom';
import { WelcomePage } from './pages/Welcome';
import { UserList } from './pages/UserList';
import { UserProfile } from './pages/UserProfile';
import { createContext, useState } from 'react';
import RequireAuth from './containers/RequireAuth';
import { Constructor } from './pages/Constructor';
import { PageLoader } from './components/PageLoader';
import { Gant } from './pages/Gant';

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
                    <Route path='/' exact 
                        element={<WelcomePage />} 
                        loader={<PageLoader />}/>
                    <Route path='/user-profile' exact 
                        element={<RequireAuth><UserProfile /></RequireAuth>}
                        loader={<PageLoader />} />
                    <Route path='/user-list' exact 
                        element={<RequireAuth><UserList /></RequireAuth>}
                        loader={<PageLoader />} />
                    <Route path='/constructor' exact 
                        element={<RequireAuth><Constructor /></RequireAuth>}
                        loader={<PageLoader />} />
                    <Route path='/gantt/:userId' exact 
                        element={<RequireAuth><Gant  /></RequireAuth>}
                        loader={<PageLoader />} />
                    <Route path='*' element={<Navigate to="/" />} />
                </Routes>
            </BrowserRouter>
        </UserInfoContext.Provider>
    )
}
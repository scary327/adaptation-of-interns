import './theme/app.css';

import { BrowserRouter, Route, Routes} from 'react-router-dom';
import { WelcomePage } from './pages/Welcome';

export default function RootApp() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' exact element={<WelcomePage />}/>
            </Routes>
        </BrowserRouter>
    )
}
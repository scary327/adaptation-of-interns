import { useContext, useEffect, useState } from "react"
import { NavigationElement } from "./NavigationElement";
import { UserInfoContext } from "../../RootApp";

export const HeaderContainer = () => {
    const { userInfo } = useContext(UserInfoContext);

    const [ isHeaderOpen, setIsHeaderOpen] = useState(false);
    const [ headerWidth, setHeaderWidth ] = useState(100);
    const [ currentPage, setCurrentPage ] = useState(null);

    useEffect(() => {
        if (isHeaderOpen) {
            setHeaderWidth(300);
        } else {
            setHeaderWidth(100);
        }
    }, [isHeaderOpen]);

    useEffect(() => {
        const page = window.location.pathname.split('/')[1];
        setCurrentPage(page);
    }, []);

    //будет меняться в зависимости от роли (передаётся с бд)
    const navListMentor = [
        {
            id: 1,
            name: 'Стажёры',
            icon: 'src/theme/images/trainee-icon',
            page: 'user-list'
        },
        {
            id: 2,
            name: 'Конструктор',
            icon: 'src/theme/images/constructor',
            page: 'constructor'
        }
    ];

    const navListAdmin = [
        {
            id: 1,
            name: 'Пользователи',
            icon: 'src/theme/images/trainee-icon',
            page: 'user-list'
        },
        {
            id: 2,
            name: 'Конструктор',
            icon: 'src/theme/images/constructor',
            page: 'constructor'
        }
    ];

    const navListIntern = [
        {
            id: 1,
            name: 'Гант',
            icon: 'src/theme/images/constructor',
            page: 'constructor'
        }
    ];

    return (
        <div className="header-navigation__container" style={{ width: `${headerWidth}px` }}>
            <div className="header-navigation__burger-container"  onClick={() => setIsHeaderOpen(!isHeaderOpen)}>
                <div className={`header-navigation__nav-icon ${isHeaderOpen ? 'nav-icon__open' : ''}`}>
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
                <div className={`header-navigation__burger-text ${isHeaderOpen ? 'header-navigation__burger-text__open' : ''}`}>Закрыть</div>
            </div>
            <ul className="header-navigation__nav-list">
                {userInfo.role === 'Mentor' && navListMentor.map((elem) => {
                    return (
                        <NavigationElement data={elem} key={elem.id} isOpen={isHeaderOpen} isCurrentPage={elem.page === currentPage} />
                    );
                })}
                {userInfo.role === 'Intern' && navListIntern.map((elem) => {
                    return (
                        <NavigationElement data={elem} key={elem.id} isOpen={isHeaderOpen} isCurrentPage={elem.page === currentPage} />
                    );
                })}
                {userInfo.role === 'Admin' && navListAdmin.map((elem) => {
                    return (
                        <NavigationElement data={elem} key={elem.id} isOpen={isHeaderOpen} isCurrentPage={elem.page === currentPage} />
                    );
                })}
            </ul>
        </div>
    )
}
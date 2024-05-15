import { useNavigate } from "react-router-dom";

export const NavigationElement = (props) => {

    const { data, isOpen, isCurrentPage } = props;

    const navigate = useNavigate();


    return isCurrentPage ? (
            <li className="navigation-elem__container navigation-elem__page-open">
                <img src={`${data.icon}-orange.svg`} alt={`${data.name} icon`} className="navigation-elem__icon" />
                <div className={`navigation-elem__name ${isOpen ? 'navigation-elem__open' : ''}`}>{data.name}</div>
            </li>
        ) : (
            <li className="navigation-elem__container" onClick={() => navigate(`/${data.page}`)}>
                <img src={`${data.icon}-black.svg`} alt={`${data.name} icon`} className="navigation-elem__icon" />
                <div className={`navigation-elem__name ${isOpen ? 'navigation-elem__open' : ''}`}>{data.name}</div>
            </li>
        )
}
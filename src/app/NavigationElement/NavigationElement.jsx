import { useNavigate } from "react-router-dom";
import styles from './navigation-elem.module.css';
import classNames from "classnames";

export const NavigationElement = (props) => {

    const { data, isOpen, isCurrentPage } = props;
    const navigate = useNavigate();

    return isCurrentPage ? (
            <li className={classNames(styles.container, styles.page_open)}>
                <img src={data.iconOrange} alt={`${data.name} icon`} className={styles.icon} />
                <div className={classNames(styles.name, { [styles.open]: isOpen })}>{data.name}</div>
            </li>
        ) : (
            <li className={styles.container} onClick={() => navigate(`/${data.page}`)}>
                <img src={data.iconBlack} alt={`${data.name} icon`} className={styles.icon} />
                <div className={classNames(styles.name, { [styles.open]: isOpen })}>{data.name}</div>
            </li>
        )
}
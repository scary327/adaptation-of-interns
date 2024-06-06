import styles from './filter-role.module.css';

export const FilterRole = (props) => {

    const { name, onClick } = props;

    return (
        <div className={styles.container}
            onClick={onClick}>
            {name}
        </div>
    )
}
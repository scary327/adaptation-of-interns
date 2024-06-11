import styles from './input.module.css';

export const InputDate = (props) => {

    const { onChange, min } = props;

    return (
        <input
            type='date'
            min={ min ? min : undefined }
            className={styles.input}
            onChange={(e) => onChange(e.target.value)} />
    )
}
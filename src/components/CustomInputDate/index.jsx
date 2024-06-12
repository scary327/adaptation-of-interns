import styles from './input.module.css';

export const InputDate = (props) => {

    const { onChange, min, value } = props;

    return (
        <input
            type='date'
            min={ min ? min : undefined }
            value={ value ? value : undefined }
            className={styles.input}
            onChange={(e) => onChange(e.target.value)} />
    )
}
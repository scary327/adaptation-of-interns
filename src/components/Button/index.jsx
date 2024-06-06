import styles from './buttons.module.css';

export const Button = (props) => {
    //color: orange, black, empty (button classes)
    const color = props.color === 'orange-button' ? styles.orange_button : props.color === 'black-button' ? styles.black_button : styles.empty_button;

    return (
        <button className={color} onClick={props.onClick}>
            {props.title}
        </button>
    )
}
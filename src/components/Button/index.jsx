export const Button = (props) => {
    //color: orange, black, empty (button classes)

    return (
        <button className={props.color} onClick={props.onClick}>
            {props.title}
        </button>
    )
}
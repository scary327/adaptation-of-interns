export const Button = (props) => {
    //color: orange, black, empty (button classes)

    return (
        <button className={props.color}>
            {props.title}
        </button>
    )
}
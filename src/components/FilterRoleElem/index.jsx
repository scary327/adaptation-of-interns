export const FilterRole = (props) => {

    const { name, onClick } = props;

    return (
        <div className="filter-role__container"
            onClick={onClick}>
            {name}
        </div>
    )
}
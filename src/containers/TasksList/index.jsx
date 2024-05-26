import styles from './tasks-list.module.css';

export const TasksList = (props) => {

    const tasksList = [
        {
            id: 1,
            name: 'Задача 1'
        },
        {
            id: 2,
            name: 'Задача 2'
        },
        {
            id: 3,
            name: 'Задача 3'
        },
        {
            id: 4,
            name: 'Задача 4'
        },
    ]

    return (
        <div className={styles.container}>
            {tasksList.map((task) => {
                return (
                    <div key={task.id} className={styles.task_container}>
                        {task.name}
                    </div>
                )
            })}
        </div>
    )
}
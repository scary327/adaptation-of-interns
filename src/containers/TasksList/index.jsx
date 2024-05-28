import styles from './tasks-list.module.css';

export const TasksList = (props) => {

    const {planList, tasksList, setTasksList} = props;

    const addTask = (task) => {
        const newTask = {
            id: tasksList.length + 1,
            name: task.name,
            start: new Date().toISOString().slice(0, 10),
            end: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10),
            progress: 0
        };
        setTasksList([...tasksList, newTask]);
    }

    return (
        <div className={styles.container}>
            {planList.map((task) => {
                return (
                    <div key={task.id} onClick={() => addTask(task)} className={styles.task_container}>
                        {task.name}
                    </div>
                )
            })}
        </div>
    )
}
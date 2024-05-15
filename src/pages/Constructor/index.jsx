import { useState } from "react";
import { HeaderContainer } from "../../app/Header/HeaderContainer";
import { UserRightInfo } from "../../components/UserRightInfo";
import styles from './constructor.module.css';
import { NewTaskButtons } from "../../components/newTaskButtons";
import { FrappeGantt } from "frappe-gantt-react";

export const Constructor = () => {

    const tasksList = [
        {
            id: '1',
            name: 'закончить дизайн',
            start: '2024-05-01',
            end: '2024-05-10',
            progress: 80
        },
        {
            id: '2',
            name: 'сделать доклад',
            start: '2024-05-04',
            end: '2024-05-16',
            progress: 10,
            dependencies: '1'
        },
        {
            id: '3',
            name: 'алгоритм хаффмана',
            start: '2024-05-10',
            end: '2024-05-21',
            progress: 0,
            dependencies: '2'
        }
    ];

    const [viewMode, setViewMode] = useState('Day');
    const viewModesList = [ 'Quarter Day', 'Half Day', 'Day', 'Week', 'Month' ];

    const [ modalIsOpen, setModalIsOpen ] = useState(false);

    return (
        <div className={styles.container}>
            <HeaderContainer />
            <div className={styles.main__container}>
                <div className={styles.top_container}>
                    <div className={styles.title}>
                        Гант
                    </div>
                    <UserRightInfo />
                </div>
                <div className={styles.gant_container}>
                    <FrappeGantt
                        tasks={tasksList}
                        viewMode={viewMode}
                        onClick={(task) => console.log(task)}
                        onDateChange={(task, start, end) => console.log(task, start, end)}
                        onProgressChange={(task, progress) => console.log(task, progress)}
                        onTasksChange={(tasks) => console.log(tasks)} />
                </div>
                <div className={styles.change_view__container}>
                    Change View Mode: 
                    {viewModesList.map((mode) => (
                        <button key={mode} className={styles.button_view_mode} onClick={() => setViewMode(mode)}>{mode}</button>
                    ))}
                </div>
                <div className={styles.new_task} onClick={() => setModalIsOpen(true)}>
                    <span>Добавить задачу</span>
                    <img src='src/theme/images/plus.svg' alt='plus-img' 
                        className={styles.plus_img} />
                </div>
            </div>
            {modalIsOpen && (
                <NewTaskButtons modalIsOpen={modalIsOpen} closeModal={() => setModalIsOpen(false)} />
            )}
        </div>
    )
}
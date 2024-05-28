import { useState } from "react";
import { HeaderContainer } from "../../app/Header/HeaderContainer";
import { UserRightInfo } from "../../components/UserRightInfo";
import styles from './constructor.module.css';
import { NewTaskButtons } from "../../components/newTaskButtons";
import { FrappeGantt } from "frappe-gantt-react";
import { ModalTask } from "../../containers/ModalTask";
import { SavePlanContainer } from "../../containers/SavePlanContainer";

export const Constructor = () => {

    // async function

    const [tasksList, setTasksList] = useState([
        {
            id: '1',
            name: 'закончить дизайн',
            start: '2024-05-01',
            end: '2024-05-10',
            description: 'Описание задачиОписание задачиОписание задачиОписание задачиОписание задачиОписание задачиОписание задачиОписание задачиОписание задачиОписание задачиОписание задачиОписание задачиОписание задачиОписание задачиОписание задачи',
            progress: 80
        },
        {
            id: '2',
            name: 'сделать доклад',
            start: '2024-05-04',
            end: '2024-05-16',
            description: 'Описание задачи',
            progress: 10
        },
        {
            id: '3',
            name: 'алгоритм хаффмана',
            start: '2024-05-10',
            end: '2024-05-21',
            description: 'Описание задачи',
            progress: 0
        }
    ]);

    const [viewMode, setViewMode] = useState('Day');
    const viewModesList = [ 'Quarter Day', 'Half Day', 'Day', 'Week', 'Month' ];

    const [ modalIsOpen, setModalIsOpen ] = useState(false);
    const [ modalTask, setModalTask ] = useState(false);
    const [ selectedTask, setSelectedTask ] = useState(null);

    const taskInfo = (task) => {
        setSelectedTask(task);
        setModalTask(true);
    }

    const changeDate = (task, newStart, newEnd) => {
        setTasksList(prevTasksList => {
            const updatedTask = { ...task, start: newStart, end: newEnd };
            return prevTasksList.map(elem => elem.id === updatedTask.id ? updatedTask : elem);
        });
    };

    const changeProgress = (task, newProgress) => {
        setTasksList(prevTasksList => {
            const updatedTask = { ...task, progress: newProgress };
            return prevTasksList.map(elem => elem.id === updatedTask.id ? updatedTask : elem);
        });
    };

    const chageTasks = (tasks) => {
        setTasksList(tasks);
    }

    const [ openModalPlan, setOpenModalPlan ] = useState(false);

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
                        onClick={(task) => taskInfo(task)}
                        onDateChange={(task, start, end) => changeDate(task, start, end)}
                        onProgressChange={(task, progress) => changeProgress(task, progress)}
                        onTasksChange={(tasks) => chageTasks(tasks)} />
                    <ModalTask
                        task={selectedTask}
                        openModal={modalTask}
                        closeModal={() => setModalTask(false)} />
                </div>
                <div className={styles.change_view__container}>
                    Change View Mode: 
                    {viewModesList.map((mode) => (
                        <button key={mode} className={styles.button_view_mode} onClick={() => setViewMode(mode)}>{mode}</button>
                    ))}
                </div>
                <div className={styles.buttons_container}>
                    <button className={styles.new_task} onClick={() => setModalIsOpen(true)}>
                        <span>Добавить задачу</span>
                        <img src='src/theme/images/plus.svg' alt='plus-img' 
                            className={styles.plus_img} />
                    </button>
                    <button className={styles.save_plan} onClick={() => setOpenModalPlan(true)}>
                        Сохранить план
                    </button>
                </div>
            </div>
            {modalIsOpen && (
                <NewTaskButtons 
                    setTasksList={setTasksList} 
                    tasksList={tasksList} 
                    modalIsOpen={modalIsOpen} 
                    closeModal={() => setModalIsOpen(false)} />
            )}
            {openModalPlan && (
                <SavePlanContainer modalOpen={openModalPlan} closeModal={() => setOpenModalPlan(false)} />
            )}
        </div>
    )
}
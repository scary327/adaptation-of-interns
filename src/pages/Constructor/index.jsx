import { useEffect, useState, useContext } from "react";
import { HeaderContainer } from "../../app/Header/HeaderContainer";
import { UserRightInfo } from "../../components/UserRightInfo";
import styles from './constructor.module.css';
import { NewTaskButtons } from "../../components/newTaskButtons";
import { FrappeGantt } from "frappe-gantt-react";
import { ModalTask } from "../../containers/ModalTask";
import { SavePlanContainer } from "../../containers/SavePlanContainer";
import { UserInfoContext } from '../../RootApp';
import { InstructionModal } from "../../components/InstructionModal";
export const Constructor = () => {
    
    const { server } = useContext(UserInfoContext);
    const [tasksList, setTasksList] = useState([ { } ]);

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
        const updatedTask = { ...task, start: new Date(newStart).toISOString().slice(0, 10), end: new Date(newEnd).toISOString().slice(0, 10) };
        const newList = tasksList.map(elem => elem.id === updatedTask.id ? updatedTask : elem);
        setTasksList(newList);
    };

    const changeProgress = (task, newProgress) => {
        const updatedTask = { ...task, progress: newProgress };
        const newList = tasksList.map(elem => elem.id === updatedTask.id ? updatedTask : elem);
        setTasksList(newList);
    };

    useEffect(() => {
        console.log(tasksList);
    }, [tasksList]);

    const [ openModalPlan, setOpenModalPlan ] = useState(false);
    const [ openInstructionModal, setOpenInstructionModal ] = useState(false);

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
                <button className={styles.instruction_btn} type='button' onClick={() => setOpenInstructionModal(true)}>Инструкция пользования конструктором</button>
                <InstructionModal 
                    openModal={openInstructionModal}
                    closeModal={() => setOpenInstructionModal(false)} />
                <div className={styles.gant_container}>
                    <FrappeGantt
                        tasks={tasksList}
                        viewMode={viewMode}
                        onClick={(task) => taskInfo(task)}
                        onDateChange={(task, start, end) => changeDate(task, start, end)}
                        onProgressChange={(task, progress) => changeProgress(task, progress)}
                        onTasksChange={(tasks) => console.log(tasks)} />
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
                <SavePlanContainer 
                    modalOpen={openModalPlan} 
                    closeModal={() => setOpenModalPlan(false)}
                    tasksList={tasksList} />
            )}
        </div>
    )
}
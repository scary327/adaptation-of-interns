import {useState, useEffect, useContext} from "react";
import { HeaderContainer } from "../../app/Header/HeaderContainer";
import { UserRightInfo } from "../../components/UserRightInfo";
import styles from './constructor.module.css';
import { NewTaskButtons } from "../../components/newTaskButtons";
import { FrappeGantt } from "frappe-gantt-react";
import { ModalTask } from "../../containers/ModalTask";
import { InstructionModal } from "../../components/InstructionModal";
import { DeletePlanModal } from "../../containers/DeletePlanModal";
import { SavePlanContainer } from "../../containers/SavePlanContainer";
import DeleteImage from "../../theme/images/deletePlan.svg";
import {UserInfoContext} from "../../RootApp.jsx";
import {DeleteTaskModal} from "../../components/DeleteTaskModal/index.jsx";

export const Constructor = () => {

    const [tasksList, setTasksList] = useState([ { } ]);

    const [viewMode, setViewMode] = useState('Day');
    const viewModesList = [ 'Quarter Day', 'Half Day', 'Day', 'Week', 'Month' ];

    const [ modalIsOpen, setModalIsOpen ] = useState(false);
    const [ modalTask, setModalTask ] = useState(false);
    const [ selectedTask, setSelectedTask ] = useState(null);

    useEffect(() => {
        const newList = localStorage.getItem("tasksList");
        if (newList)
            setTasksList(JSON.parse(newList))
    }, []);

    const taskInfo = (task) => {
        setSelectedTask(task);
        setModalTask(true);
    }

    const formatDate = (date) => {
        const pad = (number) => (number < 10 ? '0' : '') + number;
        return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
    };

    const changeDate = (task, newStart, newEnd) => {
        const updatedTask = { ...task, start: formatDate(new Date(newStart)), end: formatDate(new Date(newEnd)) };
        const newList = tasksList.map(elem => elem.id === updatedTask.id ? updatedTask : elem);
        setTasksList(newList);
    };

    const changeProgress = (task, newProgress) => {
        const updatedTask = { ...task, progress: newProgress };
        const newList = tasksList.map(elem => elem.id === updatedTask.id ? updatedTask : elem);
        setTasksList(newList);
    };

    const [ openModalPlan, setOpenModalPlan ] = useState(false);
    const [ openInstructionModal, setOpenInstructionModal ] = useState(false);
    const [ openDeleteModal, setOpenDeleteModal ] = useState(false);
    const [ openDeleteTaskModal, setOpenDeleteTaskModal ] = useState(false);

    useEffect(() => {
        localStorage.setItem("tasksList", JSON.stringify(tasksList));
    }, [tasksList]);

    return (
        <div className={styles.container}>
            <HeaderContainer />
            <div className={styles.main__container}>
                <div className={styles.top_container}>
                    <div className={styles.title}>
                        Конструктор
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
                        onProgressChange={(task, progress) => changeProgress(task, progress)}/>
                    <ModalTask
                        task={selectedTask}
                        openModal={modalTask}
                        tasksList={tasksList}
                        setTasksList={setTasksList}
                        closeModal={() => setModalTask(false)} />
                </div>
                <div className={styles.change_view__container}>
                    Change View Mode: 
                    {viewModesList.map((mode) => (
                        <button key={mode} className={styles.button_view_mode} onClick={() => setViewMode(mode)}>{mode}</button>
                    ))}
                </div>
                <div className={styles.buttons_container}>
                    <div className={styles.duo_buttons_container}>
                        <button className={styles.new_task} onClick={() => setModalIsOpen(true)}>
                            <span>Добавить задачу</span>
                            <img src='src/theme/images/plus.svg' alt='plus-img'
                                 className={styles.plus_img} />
                        </button>
                        <button className={styles.delete_btn} onClick={() => setOpenDeleteTaskModal(true)}>
                            Удалить шаблонные задачи
                        </button>
                    </div>
                    <div className={styles.duo_buttons_container}>
                        <button className={styles.save_plan} onClick={() => setOpenModalPlan(true)}>
                            Сохранить план
                        </button>
                        <button className={styles.delete_btn} onClick={() => setOpenDeleteModal(true)}>
                            Удалить план
                        </button>
                    </div>
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
            {openDeleteModal && (
                <DeletePlanModal 
                    openModal={openDeleteModal}
                    closeModal={() => setOpenDeleteModal(false)}/>
            )}
            {openDeleteTaskModal && (
                <DeleteTaskModal
                    modalOpen={openDeleteTaskModal}
                    closeModal={() => setOpenDeleteTaskModal(false)}/>
            )}
        </div>
    )
}
import styles from './gantt-container.module.css';
import { useContext, useState, useCallback } from 'react';
import { FrappeGantt } from 'frappe-gantt-react';
import { ModalTask } from '../../containers/ModalTask';
import ImagePlus from '../../theme/images/plus.svg';
import ImageUpdate from '../../theme/images/update.svg';
import { NewTaskButtons } from '../../components/newTaskButtons';
import { ModalPlan } from '../../containers/ModalPlan';
import debounce from 'lodash.debounce';
import { UserInfoContext } from '../../RootApp';

export const GantContainer = (props) => {

    const { tasksList, setTasksList, internId, formatDate, finishedTasks, setFinishedTasks } = props;
    const { userInfo, server } = useContext(UserInfoContext);


    const saveChanges = () => {
        tasksList.forEach(async task => {
            const dataToSend = {
                internId: internId,
                title: task.name,
                description: task.description,
                startDate: new Date(task.start),
                endDate: new Date(task.end),
                competitionDate: null,
                authorId: userInfo.id,
                mentorReview: "",
                progress: task.progress
            }
            await fetch(`${server}/internship/task/${task.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json;charset=utf-8' },
                body: JSON.stringify(dataToSend)
            });
        });
    }

    const [viewMode, setViewMode] = useState('Day');
    const viewModesList = [ 'Quarter Day', 'Half Day', 'Day', 'Week', 'Month' ];

    const [ modalTask, setModalTask ] = useState(false);
    const [ selectedTask, setSelectedTask ] = useState(null);

    const taskInfo = (task) => {
        setSelectedTask(task);
        setModalTask(true);
    }

    const [ modalButtons, setModalButtons ] = useState(false);
    const [ modalPlan, setModalPlan ] = useState(false);

  

    const changeDate = (task, newStart, newEnd) => {
        const updatedTask = { ...task, start: formatDate(new Date(newStart)), end: formatDate(new Date(newEnd)) };
        const newList = tasksList.map(elem => elem.id === updatedTask.id ? updatedTask : elem);
        setTasksList(newList);
    };

    const changeProgress = useCallback(
        debounce((task, newProgress) => {
        const updatedTask = { ...task, progress: newProgress };
        const newList = tasksList.map(elem => elem.id === updatedTask.id ? updatedTask : elem);
        setTasksList(newList);
    }, 300), [tasksList]);

    return (
        <div className={styles.main_container}>
        <div className={styles.gant_container}>
            <FrappeGantt
                    tasks={tasksList}
                    viewMode={viewMode}
                    onClick={(task) => taskInfo(task)}
                    onDateChange={(task, start, end) => changeDate(task, start, end)}
                    onProgressChange={(task, progress) => changeProgress(task, progress)} />
            <ModalTask
                task={selectedTask}
                openModal={modalTask}
                tasksList={tasksList}
                setTasksList={setTasksList}
                finishedTasks={finishedTasks}
                setFinishedTasks={setFinishedTasks}
                internId={internId}
                closeModal={() => setModalTask(false)} />
        </div>
        <div className={styles.change_view__container}>
            Change View Mode: 
            {viewModesList.map((mode) => (
                <button key={mode} className={styles.button_view_mode} onClick={() => setViewMode(mode)}>{mode}</button>
            ))}
        </div>
        <div className={styles.buttons_container}>
            <button className={styles.new_task} onClick={() => setModalButtons(true)}>
                <span>Добавить задачу</span>
                <img src={ImagePlus} alt='plus-img' 
                    className={styles.plus_img} />
            </button>
            <button className={styles.upload_plan_button} onClick={() => setModalPlan(true)} >Загрузить план</button>
            <button className={styles.update_button} onClick={() => saveChanges()}>
                <span>Сохранить изменения</span>
                <img src={ImageUpdate} alt="update-img" className={styles.update_svg} />
            </button>
            {modalButtons && (
                <NewTaskButtons 
                    setTasksList={setTasksList} 
                    tasksList={tasksList} 
                    modalIsOpen={modalButtons} 
                    internId = {internId}
                    closeModal={() => setModalButtons(false)} />
            )}
            {modalPlan && (
                <ModalPlan 
                    internId={internId}
                    tasksList={tasksList}
                    setTasksList={setTasksList}
                    modalOpen={modalPlan}
                    closeModal={() => setModalPlan(false)}/>
            )}
        </div>
    </div>
    )
}
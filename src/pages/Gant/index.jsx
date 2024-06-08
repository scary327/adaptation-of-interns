import { useParams } from 'react-router-dom';
import styles from './gant.module.css';
import { HeaderContainer } from '../../app/Header/HeaderContainer';
import { useState, useContext, useEffect, useCallback } from 'react';
import { FrappeGantt } from 'frappe-gantt-react';
import { ModalTask } from '../../containers/ModalTask';
import ImagePlus from '../../theme/images/plus.svg';
import ImageUpdate from '../../theme/images/update.svg';
import { NewTaskButtons } from '../../components/newTaskButtons';
import { ModalPlan } from '../../containers/ModalPlan';
import { UserInfoContext } from '../../RootApp';
import debounce from 'lodash.debounce';
export const Gant = () => {

    const params = useParams();
    const internId = params.userId;
    const { server, userInfo } = useContext(UserInfoContext);

    const [tasksList, setTasksList] = useState([ { } ]);
    const [intern, setIntern] = useState(null);
    
    const formatDate = (date) => {
        const pad = (number) => (number < 10 ? '0' : '') + number;
        return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
    };

    useEffect(() => {
        const fetchTasks = async () => {
                try {
                    const response = await fetch(`${server}/internship/task/intern/${internId}`, {
                        method: 'GET',
                        headers: { 'Content-Type': 'application/json;charset=utf-8' },
                    });
    
                    if (!response.ok) {
                        throw new Error('HTTP error');
                    }
    
                    let data = await response.json();
                    let newList = [];
                    data.forEach(element => {
                        newList.push({ 
                            id: element.id, 
                            name: element.title, 
                            start:formatDate(new Date(element.startDate)),
                            end: formatDate(new Date(element.endDate)),
                            description: element.description, 
                            progress: element.progress });
                    });
                    setTasksList(newList.length > 0 ? newList : tasksList);

                    const secondResponse = await fetch(`${server}/user/${internId}`, {
                        method: 'GET',
                        headers: { 'Content-Type': 'application/json;charset=utf-8' },
                    });
                    data = await secondResponse.json();
                    setIntern(data);
                } catch (error) {
                    console.error('Error fetching users:', error);
                }
        };
    
        fetchTasks();
    }, []);

    const saveNewTasks = () => {
        tasksList.forEach(async task => {
            const dataToSend = {
                internId: internId,
                title: task.name,
                description: task.description,
                startDate: new Date(task.start),
                endDate: new Date(task.end),
                competitionDate: new Date(),
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
        <div className={styles.container}>
            <HeaderContainer />
            <div className={styles.main_container}>
                <p className={styles.main_title}>Гант пользователя {intern?.name}</p>
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
                    <button className={styles.update_button} onClick={() => saveNewTasks()}>
                        <span>Обновить</span>
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
        </div>
    )
}
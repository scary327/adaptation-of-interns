import styles from './gant.module.css';
import { useState, useEffect, useContext } from 'react';
import { UserInfoContext } from '../../RootApp';
import { useParams } from 'react-router-dom';
import { HeaderContainer } from '../../app/Header/HeaderContainer';
import { GantContainer } from '../../containers/GantContainer';
import { FinishTasksContainer } from '../../containers/FinishTasksContainer';

export const Gant = () => {

    const [intern, setIntern] = useState(null);
    const { server } = useContext(UserInfoContext);
    const params = useParams();
    const internId = params.userId;

    const formatDate = (date) => {
        const pad = (number) => (number < 10 ? '0' : '') + number;
        return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
    };

    const [tasksList, setTasksList] = useState([ { } ]);
    const [finishedTasks, setFinishedTasks] = useState([]);
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
                            progress: element.progress,
                            completionDate: element.completionDate });
                    });

                    console.log(newList);

                    setTasksList(newList.length > 0 ? newList.filter(task => task.completionDate === null) : tasksList);
                    setFinishedTasks(newList.length > 0 ? newList.filter(element => element.completionDate !== null) : finishedTasks);
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

    const [ toggleView, setToggleView ] = useState(false);

    return (
        <div className={styles.container}>
            <HeaderContainer />
            <div className={styles.main_container}>
                <p className={styles.main_title}>Гант пользователя {intern?.name}</p>
                <div className={styles.top_container}>
                    <button className={styles.toggle_btn} onClick={() => setToggleView(false)}>
                        Диаграмма Ганта
                    </button>
                    <button className={styles.toggle_btn} onClick={() => setToggleView(true)}>
                        Список завершенный задач
                    </button>
                </div>
                {toggleView ? (
                    <FinishTasksContainer 
                     tasksList={finishedTasks}
                     formatDate={formatDate} />
                ) : (
                    <GantContainer
                    internId={internId}
                    tasksList={tasksList}
                    setTasksList={setTasksList}
                    formatDate={formatDate}
                    finishedTasks={finishedTasks}
                    setFinishedTasks={setFinishedTasks} />
                )}
            </div>
        </div>
    )
}
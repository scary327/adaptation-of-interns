import { useState, useEffect, useContext } from 'react';
import styles from './select-ready-task.module.css';
import Modal from 'react-modal';
import { TasksList } from '../TasksList';
import { UserInfoContext } from '../../RootApp';

export const SelectReadyTask = (props) => {
    const { server, userInfo } = useContext(UserInfoContext);

    const { setTasksList, tasksList, internId } = props;
    const [ modalIsOpen, setModalIsOpen ] = useState(false);
    const [patternTasksList, setPatternTasksList] = useState([]);

    useEffect(() => {
        const fetchTasks = async () => {
                try {
                    const response = await fetch(`${server}/pattern/task/mentor/${userInfo.id}`, {
                        method: 'GET',
                        headers: { 'Content-Type': 'application/json;charset=utf-8' },
                    });
    
                    if (!response.ok) {
                        throw new Error('HTTP error');
                    }
    
                    const data = await response.json();
                    setPatternTasksList(data.filter(task => task.reusable === true));
                } catch (error) {
                    console.error('Error fetching users:', error);
                }
            }
            fetchTasks();
    }, []);

    const openModal = () => {
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setModalIsOpen(false);
    };

    return (
        <>
            <button className={styles.ready_task_btn} onClick={openModal}>Выбрать готовую задачу</button>
            <Modal
                isOpen={modalIsOpen} 
                onRequestClose={closeModal} 
                closeOnEscape={true} 
                closeOnOutsideClick={true}
                ariaHideApp={false}
                style={{
                    overlay: {
                        backgroundColor: 'rgba(26, 26, 26, 0.75)'
                    }
                }} 
                className={styles.modal_container}>
                    <div className={styles.modal_fixed_container}>
                        <p className={styles.modal_title}>Готовые задачи</p>
                        <input type='text' placeholder='поиск..' className={styles.modal_input} />
                        <TasksList 
                            patternTasksList={patternTasksList}
                            setTasksList={setTasksList}
                            tasksList={tasksList}
                            internId={internId} />
                    </div>
            </Modal>
        </>
    )
}
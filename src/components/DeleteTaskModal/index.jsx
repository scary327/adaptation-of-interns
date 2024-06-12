import styles from './delete-task.module.css';
import Modal from "react-modal";
import {useContext, useEffect, useState} from "react";
import {UserInfoContext} from "../../RootApp.jsx";
import DeleteImg from '../../theme/images/deletePlan.svg';

export const DeleteTaskModal = (props) => {

    const { modalOpen, closeModal } = props;
    const { server, userInfo } = useContext(UserInfoContext);

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

    const deleteTask = async(task) => {
        await fetch(`${server}/pattern/task/${task.id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json;charset=utf-8' },
            body: JSON.stringify({ ...task, reusable: false })
        }).then((response) => {
            if (!response.ok) {
                throw new Error('Ошибка удаления задачи')
            }
        })
        setPatternTasksList(patternTasksList.filter(elem => elem.id !== task.id));
    }

    return (
        <Modal
            isOpen={modalOpen}
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
            <div className={styles.main_container}>
                <p className={styles.modal_title}>Удаление шаблонных задач</p>
                <div className={styles.tasks_container}>
                    {patternTasksList.map((task) => (
                        <div key={task.id} className={styles.task_container}>
                            <span className={styles.task_title}>{task.title}</span>
                            <button className={styles.delete_btn} onClick={() => deleteTask(task)}>
                                <img src={DeleteImg} alt='delete img' className={styles.delete_img} />
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </Modal>
    )
}
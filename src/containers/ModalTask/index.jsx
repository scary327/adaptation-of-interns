import styles from './modal-task.module.css';
import Modal from 'react-modal';
import { UserInfoContext } from '../../RootApp';
import {useContext} from "react";

export const ModalTask = (props) => {

    const { task, openModal, closeModal, setTasksList, tasksList, internId, finishedTasks, setFinishedTasks } = props;
    const { userInfo, server } = useContext(UserInfoContext);
    const page = window.location.pathname.split('/')[1];
    
    const deleteTask = () => {
        const updatedTasksList = tasksList.filter(elem => elem.id !== task.id);
        if (page === 'gantt') {
            fetch(`${server}/internship/task/${task.id}`, {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json;charset=utf-8' },
            });
        } else if (page === 'constructor') {
            if (updatedTasksList.length === 0) {
                localStorage.removeItem("tasksList");
            } else {
                localStorage.setItem("tasksList", JSON.stringify(updatedTasksList));
            }
        }
        setTasksList(updatedTasksList.length === 0 ? [{}] : updatedTasksList);
        closeModal();
    }

    const finishTask = () => {
        const finishedTask = {
            internId: internId,
            title: task.name,
            description: task.description,
            startDate: new Date(task.start),
            endDate: new Date(task.end),
            completionDate: new Date(),
            authorId: userInfo.id,
            mentorReview: "",
            progress: 100
        }
        fetch(`${server}/internship/task/${task.id}`, {
            method: 'PUT',
            headers: {'Content-Type': 'application/json;charset=utf-8'},
            body: JSON.stringify(finishedTask)
        }).then(response =>{
            if (!response.ok) {
                throw new Error('Ошибка завершения задачи');
            }

        });
        const updatedTasksList = tasksList.filter(elem => elem.id !== task.id);
        setTasksList(updatedTasksList.length === 0 ? [{}] : updatedTasksList);
        //console.log({task, completionDate: new Date()});
        setFinishedTasks([...finishedTasks, {...task, completionDate: new Date()}]);
        closeModal();
    }

    return (
        task &&
            <Modal
                isOpen={openModal} 
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
                        <p className={styles.main_title}>{task.name}</p>
                        <p className={styles.main_description}>{task.description}</p>
                        <p className={styles.main_date}>Дата начала: <span>{task.start}</span></p>
                        <p className={styles.main_date}>Дата конца: <span>{task.end}</span></p>
                        <p className={styles.main_progress}>Прогресс: <span>{task.progress}%</span></p>
                        <button 
                            className={styles.delete_btn}
                            type='button'
                            onClick={() => deleteTask()} >
                            Удалить
                        </button>
                        <button
                            type='button'
                            className={styles.end_btn}
                            onClick={() => finishTask()}>
                            Завершить
                        </button>
                        <button 
                            type='button' 
                            onClick={closeModal}
                            className={styles.close_btn}>
                                Закрыть
                        </button>
                    </div>
            </Modal>
    )
}
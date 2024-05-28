import { useState } from 'react';
import styles from './select-ready-task.module.css';
import Modal from 'react-modal';
import { TasksList } from '../TasksList';

export const SelectReadyTask = (props) => {

    const { setTasksList, tasksList } = props;

    const [ modalIsOpen, setModalIsOpen ] = useState(false);

    const openModal = () => {
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setModalIsOpen(false);
    };

    const planList = [
        {
            id: 1,
            name: 'Задача 1'
        },
        {
            id: 2,
            name: 'Задача 2'
        },
        {
            id: 3,
            name: 'Задача 3'
        },
        {
            id: 4,
            name: 'Задача 4'
        },
        {
            id: 5,
            name: 'Задача 5'
        },
        {
            id: 6,
            name: 'Задача 6'
        },
        {
            id: 7,
            name: 'Задача 7 Задача 7 Задача 7 Задача 7 Задача 7'
        },
    ]

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
                            planList={planList}
                            setTasksList={setTasksList}
                            tasksList={tasksList} />
                    </div>
            </Modal>
        </>
    )
}
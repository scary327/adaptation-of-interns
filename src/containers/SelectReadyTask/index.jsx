import { useState } from 'react';
import styles from './select-ready-task.module.css';
import Modal from 'react-modal';
import { TasksList } from '../TasksList';

export const SelectReadyTask = () => {

    const [ modalIsOpen, setModalIsOpen ] = useState(false);

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
                        <TasksList />
                    </div>
            </Modal>
        </>
    )
}
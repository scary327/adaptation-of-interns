import styles from './modal-task.module.css';
import Modal from 'react-modal';

export const ModalTask = (props) => {

    const { task, openModal, closeModal } = props;

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
                            type='button' 
                            onClick={closeModal}
                            className={styles.close_btn}>
                                Закрыть
                        </button>
                    </div>
            </Modal>
    )
}
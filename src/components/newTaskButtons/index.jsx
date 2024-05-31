import { CreateNewTask } from '../../containers/CreateNewTask';
import { SelectReadyTask } from '../../containers/SelectReadyTask';
import styles from './new-task-buttons.module.css';
import Modal from 'react-modal';

export const NewTaskButtons = (props) => {

    const { modalIsOpen, closeModal, setTasksList, tasksList, internId} = props;

    return (
        <Modal 
            isOpen={modalIsOpen}
            onRequestClose={closeModal} 
            closeOnEscape={true} 
            ariaHideApp={false}
            closeOnOutsideClick={true}
            className={styles.container}
            style={{
                overlay: {
                    backgroundColor: 'rgba(26, 26, 26, 0.75)'
                }
            }} >
                <CreateNewTask setTasksList={setTasksList} tasksList={tasksList} internId={internId}/>
                <SelectReadyTask setTasksList={setTasksList} tasksList={tasksList} internId={internId}/>
        </Modal>
    );
}
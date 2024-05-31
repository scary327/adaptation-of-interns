import styles from './instruction-modal.module.css';
import Modal from 'react-modal';

export const InstructionModal = (props) => {

    const { openModal, closeModal } = props;

    return (
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
            <div className={styles.container}>
                <p className={styles.title}>Инструкция пользования конструктором</p>
                <p className={styles.description}>
                    1. Даты задачи будут сохраняться в зависимости от сегодняшней даты (подсвечивается легким желтым светом в таблице Ганта).<br />
                    2. Выгрузка задач из плана в таблице стажера осуществляется тоже в зависимости от сегодняшней даты.<br />
                    3. Из-за разных часовых поясов, <span className={styles.important}>при каждом изменении даты задача сдвигается на один день назад!</span>
                </p>
            </div>
        </Modal>
    )
}
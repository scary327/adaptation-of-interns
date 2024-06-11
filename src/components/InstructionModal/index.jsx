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
                    2. В последующем при выгрузке плана в таблицу стажёра вы сможете выбрать дату начала.
                </p>
            </div>
        </Modal>
    )
}
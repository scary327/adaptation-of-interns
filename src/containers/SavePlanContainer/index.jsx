import Modal from "react-modal";
import styles from './save-plan.module.css';
import { useForm } from "react-hook-form";

export const SavePlanContainer = (props) => {

    const { modalOpen, closeModal } = props;

    const methods = useForm();

    const handleSubmit = (data) => {
        console.log(data);
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
            <form className={styles.form_container} onSubmit={(data) => methods.onSubmit(handleSubmit(data))}>
                <input 
                    type='text' 
                    placeholder="Название плана" 
                    className={styles.form_input}
                    {...methods.register('planName')} />
            </form>
        </Modal>
    )
}
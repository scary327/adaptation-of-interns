import Modal from "react-modal";
import styles from './save-plan.module.css';
import { useContext } from 'react';
import { UserInfoContext } from '../../RootApp';
import { useForm } from "react-hook-form";

export const SavePlanContainer = (props) => {
    const { server, userInfo } = useContext(UserInfoContext);
    const { modalOpen, closeModal, tasksList } = props;

    const methods = useForm();

    const onSubmit = (data) => {

        const dataToSend = {mentorId: userInfo.id, title: data.input, tasks: []};
        tasksList.forEach(task => 
            {  
                dataToSend.tasks.push(
                    {
                        id: task.reusable ? task.id : "785df74c-a0f2-4da1-9054-51c02c8dfe02",
                        title: task.name,
                        description: task.description,
                        reusable: task.reusable,
                        startDate: Math.ceil((new Date(task.start) - new Date()) / (1000 * 3600 * 24)),
                        endDate: Math.ceil((new Date(task.end) - new Date()) / (1000 * 3600 * 24))
                    }
                )
            }
        )
        fetch(`${server}/pattern/plan/assembled`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json;charset=utf-8' },
            body: JSON.stringify(dataToSend)
        }).then((response) => {
            if (!response.ok) 
                throw new Error('Http error!')
        });
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
            <form className={styles.form_container} onSubmit={methods.handleSubmit(onSubmit)}>
                <p className={styles.modal_title}>Сохранение плана</p>
                <input 
                    type='text' 
                    placeholder="название..." 
                    className={styles.form_input}
                    {...methods.register('input')} />
                <div className={styles.tasks_container}>
                    {tasksList.map((task) => (
                        <div key={task.id} className={styles.task_div}>{task.name}</div>
                    ))}
                </div>
                <button className={styles.submit_button} type='submit'>Сохранить</button>
            </form>
        </Modal>
    )
}
import { useState } from 'react';
import styles from './create-new-task.module.css';
import Modal from 'react-modal';
import { FormProvider, useForm, useFormContext } from 'react-hook-form';

function FormCore() {
    const { register, formState: {errors} } = useFormContext();

    const maxLength = 1000;

    return (
        <div className={styles.form_core}>
            <input 
                type='text'
                placeholder='Название...'
                {...register('name', {
                    required: 'Это поле является обязательным!!!'
                })}
                className={styles.form_input}  />
            <textarea 
                className={styles.form_textarea}
                placeholder='Описание...'
                {...register('description', {
                    required: "Это поле является обязательным!!!", 
                    maxLength: {
                        value: maxLength,
                        message: `Слишком много символов! Максимальная длина - ${maxLength} символов.`
                    }
                })} 
                />
            {errors?.description && <p className={styles.error}>{errors.description.message}</p>}
            <div className={styles.file_input_container}>
                <button className={styles.file_input_button}>Загрузить файл</button>
                <input 
                    type='file'
                    className={styles.form_input_file} 
                    {...register('file')} />
            </div>
        </div>
    )
}

function ButtonContainer(props) {
    const { register } = useFormContext();

    return (
        <div className={styles.buttons_container}>
            <button className={styles.create_button} >Создать</button>
            <button className={styles.close_button} onClick={props.onClick}>Закрыть</button>
            <label className={styles.checkbox_container}>
                <input type='checkbox' {...register('plan')} className={styles.checkbox_input} />
                <span>Сохранить&nbsp;как&nbsp;шаблон</span>
            </label>
        </div>
    )
}

export const CreateNewTask = (props) => {

    const { setTasksList, tasksList } = props;
    const methods = useForm();

    const [ modalIsOpen, setModalIsOpen ] = useState(false);

    const openModal = () => {
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setModalIsOpen(false);
    };

    const onSubmit = (data) => {
        const newTask = {
            id: tasksList.length + 1,
            name: data.name,
            start: new Date().toISOString().slice(0, 10),
            end: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10),
            progress: 0
        };
        setTasksList([...tasksList, newTask]);
    };

    return (
        <div>
            <button onClick={openModal} className={styles.new_task_btn}>Создать новую задачу</button>
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
                    <p className={styles.modal_title}>Новая задача</p>
                    <FormProvider {...methods} >
                        <form className={styles.form_container} onSubmit={methods.handleSubmit(onSubmit)}>
                            <FormCore />
                            <ButtonContainer onClick={closeModal} />
                        </form>
                    </FormProvider>
            </Modal>
        </div>
    )
}
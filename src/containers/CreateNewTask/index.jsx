import { useState, useEffect, useContext } from 'react';
import styles from './create-new-task.module.css';
import Modal from 'react-modal';
import { FormProvider, useForm, useFormContext } from 'react-hook-form';
import { UserInfoContext } from '../../RootApp';
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
                <input type='checkbox' {...register('pattern')} className={styles.checkbox_input} />
                <span>Сохранить&nbsp;как&nbsp;шаблон</span>
            </label>
        </div>
    )
}

export const CreateNewTask = (props) => {

    const { setTasksList, tasksList, internId} = props;
    const { server, userInfo } = useContext(UserInfoContext);
    const methods = useForm();

    const [ modalIsOpen, setModalIsOpen ] = useState(false);

    const [ currentPage, setCurrentPage ] = useState(null);

    useEffect(() => {
        const page = window.location.pathname.split('/')[1];
        setCurrentPage(page);
    }, []);

    const openModal = () => {
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setModalIsOpen(false);
    };

    const onSubmit = (data) => {
        if (currentPage == "gantt") {
            const taskToSend = {
                internId: internId,
                title: data.name,
                description: data.description,
                startDate: new Date(),
                endDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
                competitionDate: new Date(),
                authorId: userInfo.id,
                mentorReview: "",
                progress: 0
            }
            fetch(`${server}/internship/task`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json;charset=utf-8' },
                body: JSON.stringify(taskToSend)
            }).then((response) => {
                if (!response.ok) 
                    throw new Error("Post error")
                return response.json()
            }).then((data) => {
                const newTask = {
                    id: data.id,
                    name: data.title,
                    start: new Date().toISOString().slice(0, 10),
                    end: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10),
                    progress: 0,
                    description: data.description
                };
                setTasksList([...tasksList, newTask]);
            })
            if (data.pattern) 
            {
                const taskToSend = {
                   mentorId: userInfo.id,
                   title: data.name,
                   description: data.description,
                   reusable: true
                }
                fetch(`${server}/pattern/task`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json;charset=utf-8' },
                    body: JSON.stringify(taskToSend)
                }).then((response) => {
                    if (!response.ok) 
                        throw new Error("Post error")
                    return response.json()
                }).then((receiveData) => {
                    const newTask = {
                        id: receiveData.id,
                        name: receiveData.title,
                        start: new Date().toISOString().slice(0, 10),
                        end: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10),
                        reusable: true,
                        progress: 0,
                        description: receiveData.description
                    };
                    const newList = JSON.stringify(tasksList[0]) !== '{}' ? [...tasksList, newTask] : [ newTask ]; 
                    setTasksList(newList);
            })
        }

        } else if (currentPage == "constructor") {
            if (!data.pattern) {
                const newTask = {
                    id: data.name,
                    name: data.name,
                    start: new Date().toISOString().slice(0, 10),
                    end: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10),
                    reusable: false,
                    progress: 0,
                    description: data.description
                };
                const newList = JSON.stringify(tasksList[0]) !== '{}' ? [...tasksList, newTask] : [ newTask ]; 
                setTasksList(newList);
            } else {
                const taskToSend = {
                   mentorId: userInfo.id,
                   title: data.name,
                   description: data.description,
                   reusable: true
                }
                fetch(`${server}/pattern/task`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json;charset=utf-8' },
                    body: JSON.stringify(taskToSend)
                }).then((response) => {
                    if (!response.ok) 
                        throw new Error("Post error")
                    return response.json()
                }).then((receiveData) => {
                    const newTask = {
                        id: receiveData.id,
                        name: receiveData.title,
                        start: new Date().toISOString().slice(0, 10),
                        end: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10),
                        reusable: true,
                        progress: 0,
                        description: receiveData.description
                    };
                    const newList = JSON.stringify(tasksList[0]) !== '{}' ? [...tasksList, newTask] : [ newTask ]; 
                    setTasksList(newList);
            })
        }
    }};

   

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
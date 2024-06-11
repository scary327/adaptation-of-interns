import { useState } from 'react';
import styles from './finish-tasks.module.css';
import Modal from 'react-modal';
import { InputDate } from '../../components/CustomInputDate';

export const FinishTasksContainer = ({ tasksList, formatDate }) => {

    const [ startModal, setStartModal ] = useState(false);
    const [ startFirstDate, setStartFirstDate ] = useState(null);
    const [ startSecondDate, setStartSecondDate ] = useState(null);

    const [ finishModal, setFinishModal ] = useState(false);
    const [ finishFirstDate, setFinishFirstDate ] = useState(null);
    const [ finishSecondDate, setFinishSecondDate ] = useState(null);

    const [filteredList, setFilteredList] = useState(tasksList);

    const filterList = (firstDate, secondDate, type) => {
        let updatedList = tasksList;
        if (type === 'start') {
            updatedList = tasksList.filter(elem =>
                new Date(elem.start).getTime() >= new Date(firstDate).getTime() &&
                new Date(elem.start).getTime() <= new Date(secondDate).getTime()
            );
            setStartModal(false);
        } else if (type === 'finish') {
            updatedList = tasksList.filter(elem =>
                new Date(elem.completionDate).getTime() >= new Date(firstDate).getTime() &&
                new Date(elem.completionDate).getTime() <= new Date(secondDate).getTime()
            );
            setFinishModal(false);
        } else {
            throw new Error('Ошибка фильтрации');
        }
        setFilteredList(updatedList);
    };

    const fallFilter = () => {
        setFilteredList(tasksList);
    }


    return (
        <div className={styles.container}>
            <button
            className={styles.fall_filter_btn}
            onClick={() => fallFilter()}>Сбросить фильтры</button>
            <div className={styles.header_container}>
                <div className={styles.header_div}>Название</div>
                <button className={styles.header_button} onClick={() => setStartModal(true)}>Дата начала</button>
                { startModal && (
                <Modal
                    isOpen={startModal} 
                    onRequestClose={() => setStartModal(false)} 
                    closeOnEscape={true} 
                    closeOnOutsideClick={true}
                    ariaHideApp={false}
                    style={{
                        overlay: {
                            backgroundColor: 'rgba(26, 26, 26, 0.75)'
                        }
                    }} 
                    className={styles.modal_container}>
                        <div className={styles.modal_main_container}>
                            <p className={styles.modal_title}>Выбрать диапозон дат <span className={styles.modal_important}>начала задач</span></p>
                            <div className={styles.modal_input_container}>
                                <span className={styles.modal_input_span}>от</span>
                                <InputDate onChange={setStartFirstDate} />
                            </div>
                            <div className={styles.modal_input_container}>
                                <span className={styles.modal_input_span}>до</span>
                                <InputDate onChange={setStartSecondDate} />
                            </div>
                            <button className={styles.mobal_btn} onClick={() => filterList(startFirstDate, startSecondDate, 'start')}>Применить</button>
                        </div>
                </Modal>
                )}
                <button className={styles.header_button} onClick={() => setFinishModal(true)}>Дата завершения</button>
                { finishModal && (
                <Modal
                    isOpen={finishModal} 
                    onRequestClose={() => setFinishModal(false)} 
                    closeOnEscape={true} 
                    closeOnOutsideClick={true}
                    ariaHideApp={false}
                    style={{
                        overlay: {
                            backgroundColor: 'rgba(26, 26, 26, 0.75)'
                        }
                    }} 
                    className={styles.modal_container}>
                        <div className={styles.modal_main_container}>
                            <p className={styles.modal_title}>Выбрать диапозон дат <span className={styles.modal_important}>завершения задач</span></p>
                            <div className={styles.modal_input_container}>
                                <span className={styles.modal_input_span}>от</span>
                                <InputDate onChange={setFinishFirstDate} />
                            </div>
                            <div className={styles.modal_input_container}>
                                <span className={styles.modal_input_span}>до</span>
                                <InputDate onChange={setFinishSecondDate} />
                            </div>
                            <button className={styles.mobal_btn} onClick={() => filterList(finishFirstDate, finishSecondDate, 'finish')}>Применить</button>
                        </div>
                </Modal>
                )}
                <div className={styles.header_div}>Описание</div>
            </div>
            {filteredList.map((task) => (
                <div key={task.id} className={styles.task_container}>
                    <div className={styles.table_div}>
                        {task.name}
                    </div>
                    <div className={styles.table_div}>
                        {task.start}
                    </div>
                    <div className={styles.table_div}>
                        {formatDate( new Date(task.completionDate))}
                    </div>
                    <div className={styles.table_div}>
                        {task.description}
                    </div>
                </div>
            ))}
        </div>
    )
}
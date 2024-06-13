import {useState, useEffect, useContext} from 'react';
import styles from './modal-plan.module.css';
import Modal from 'react-modal';
import { UserInfoContext } from '../../RootApp';
import { InputDate } from '../../components/CustomInputDate';

export const ModalPlan = (props) => {

    const { server, userInfo } = useContext(UserInfoContext);
    const { modalOpen, closeModal, tasksList, setTasksList, internId } = props;
    const [ planMentorList, setPlanMentorList ] = useState([]);
    const [ planAdminList, setPlanAdminList ] = useState([]);
    
    const formatDate = (date) => {
        const pad = (number) => (number < 10 ? '0' : '') + number;
        return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
    };

    useEffect(() => {
        const fetchPlans = async () => {
                try {
                    const response = await fetch(`${server}/pattern/plan/mentor/${userInfo.id}`, {
                        method: 'GET',
                        headers: { 'Content-Type': 'application/json;charset=utf-8' },
                    });
    
                    if (!response.ok) {
                        throw new Error('Ошибка загрузки планов ментора');
                    }
    
                    const data = await response.json();
                    setPlanMentorList(data);
                } catch (error) {
                    console.error('Error fetching plans:', error);
                }
                try {
                    const response = await fetch(`${server}/pattern/plan/Admin`, {
                        method: 'GET',
                        header: { 'Content-Type': 'application/json;charset=utf-8' },
                    })

                    if (!response.ok) {
                        throw new Error('Ошибка загрузки общих планов');
                    }
                    const data = await response.json();
                    setPlanAdminList(data);
                } catch (error) {
                    console.error('Error fetching plans:', error);
                }
        }
        fetchPlans();
    }, []);

    const [ planDate, setPlanDate ] = useState('');

    const openPlan = async (id) => {
        try {
            await fetch(`${server}/pattern/plan/assembled/${id}?internId=${internId}&StartDateInternship=${planDate ? planDate : formatDate(new Date())}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json;charset=utf-8' },
            }).then(async () => {
                const response = await fetch(`${server}/internship/task/intern/${internId}`, {
                    method: 'GET',
                    headers: { 'Content-Type': 'application/json;charset=utf-8' },
                });
    
                if (!response.ok) {
                    throw new Error('HTTP error');
                }
    
                let data = await response.json();
                let newList = [];
                data.forEach(element => {
                    newList.push({ 
                        id: element.id, 
                        name: element.title, 
                        start:formatDate(new Date(element.startDate)),
                        end: formatDate(new Date(element.endDate)),
                        description: element.description, 
                        completionDate: element.completionDate,
                        progress: element.progress });
                });
                setTasksList(newList.length > 0 ? newList.filter(elem => elem.completionDate === null) : tasksList);
            });
        } catch (error) {
            console.error('Error fetching plans:', error);
        }
    }

    const [ openMentorList, setOpenMentorList ] = useState(false);
    const [ openAdminList, setOpenAdminList ] = useState(false);

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
                <div className={styles.main_container}>
                    <p className={styles.title}>Выбор плана</p>
                    <input type='text' placeholder='поиск...' className={styles.modal_input} />
                    <div className={styles.date_container}>
                        <InputDate value={formatDate(new Date())} min={ formatDate(new Date()) } onChange={setPlanDate} />
                    </div>
                    { !openMentorList && !openAdminList && (
                        <div className={styles.buttons_container}>
                            <button
                                className={styles.button_plan}
                                onClick={() => setOpenMentorList(true)}>
                                Мои планы
                            </button>
                            <button
                                className={styles.button_plan}
                                onClick={() => setOpenAdminList(true)}>
                                Общие планы
                            </button>
                        </div>
                    )}
                    { openMentorList && (
                        <div className={styles.pivo_container}>
                            <div className={styles.list_container}>
                                {planMentorList.map((plan) =>
                                    <div key={plan.id} onClick={() => openPlan(plan.id)} className={styles.plan_div}>{plan.title}</div>
                                )}
                            </div>
                            <button className={styles.back_button} onClick={() => setOpenMentorList(false)}>Назад</button>
                        </div>
                    )}
                    { openAdminList && (
                        <div className={styles.pivo_container}>
                            <div className={styles.list_container}>
                                {planAdminList.map((plan) =>
                                    <div key={plan.id} onClick={() => openPlan(plan.id)} className={styles.plan_div}>{plan.title}</div>
                                )}
                            </div>
                            <button className={styles.back_button} onClick={() => setOpenAdminList(false)}>Назад</button>
                        </div>
                    )}
                    <div>

                    </div>
                </div>
        </Modal>
    )
}
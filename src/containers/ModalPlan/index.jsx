import { useState, useEffect, useContext } from 'react';
import styles from './modal-plan.module.css';
import Modal from 'react-modal';
import { UserInfoContext } from '../../RootApp';

export const ModalPlan = (props) => {

    const { server, userInfo } = useContext(UserInfoContext);
    const { modalOpen, closeModal, tasksList, setTasksList, internId } = props;
    const [planList, setPlanList] = useState([]);
    
    useEffect(() => {
        const fetchPlans = async () => {
                try {
                    const response = await fetch(`${server}/pattern/plan/mentor/${userInfo.id}`, {
                        method: 'GET',
                        headers: { 'Content-Type': 'application/json;charset=utf-8' },
                    });
    
                    if (!response.ok) {
                        throw new Error('HTTP error');
                    }
    
                    const data = await response.json();
                    setPlanList(data);
                } catch (error) {
                    console.error('Error fetching plans:', error);
                }
            }
            fetchPlans();
    }, []);

    const openPlan = (id) => {
        try {
            fetch(`${server}/pattern/plan/assembled/${id}?internId=${internId}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json;charset=utf-8' },
            });
        } catch (error) {
            console.error('Error fetching plans:', error);
        }
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
                <div className={styles.main_container}>
                    <p className={styles.title}>Выбор плана</p>
                    <input type='text' placeholder='поиск...' className={styles.modal_input} />
                    <div className={styles.list_container}>
                        {planList.map((plan) => 
                            <div key={plan.id} onClick={() => openPlan(plan.id)} className={styles.plan_div}>{plan.title}</div>
                        )}
                    </div>
                </div>
        </Modal>
    )
}
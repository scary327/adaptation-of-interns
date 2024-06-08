import { useState, useEffect, useContext } from 'react';
import styles from './delete.module.css';
import Modal from 'react-modal';
import { UserInfoContext } from '../../RootApp';
import DeleteImage from '../../theme/images/deletePlan.svg';

export const DeletePlanModal = (props) => {

    const { openModal, closeModal } = props;
    const { server, userInfo } = useContext(UserInfoContext);

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

    const deletePlan = (id) => {
        fetch(`${server}/pattern/plan/${id}`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json;charset=utf-8' },
        });
        closeModal();
        alert('План успешно удален');
    };

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
                    <p className={styles.title}>Удаление планов</p>
                    <div className={styles.main_container}>
                        {planList.map((plan) => (
                            <div key={plan.id} className={styles.plan_container} >
                                <span className={styles.plan_title}>{plan.title}</span>
                                <button className={styles.delete_btn} onClick={() => deletePlan(plan.id)}>
                                    <img src={DeleteImage} alt='delete image' className={styles.delete_image} />
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
        </Modal>
    )
}
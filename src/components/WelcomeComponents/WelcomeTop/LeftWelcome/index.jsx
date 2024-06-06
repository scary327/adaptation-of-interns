import { useEffect } from "react";
import { useSpring, a } from 'react-spring';
import { Button } from "../../../Button";
import styles from './welcome-left.module.css';

export const LeftWelcome = (props) => {
    const fadeIn = useSpring({
        from: { opacity: 0, transform: 'translateX(-100px)' },
        to: { opacity: 1, transform: 'translateX(0)' },
        config: { duration: 600 },
    });

    const { setOpenModal } = props;

    useEffect(() => {
        setTimeout(() => {
          fadeIn.start;
        }, 200);
      }, [fadeIn]);

    return (
        <a.div style={fadeIn} className={styles.container}>
            <h1 className={styles.title}>Сервис для адаптации стажёров</h1>
            <span className={styles.description}>Планирование шаблонных задач на диаграмме Ганта. Удобное отслеживание и&nbsp;распределние по&nbsp;проектам</span>
            <Button title={"Начать"} color={"black-button"} onClick={() => setOpenModal(true)} />
        </a.div>
    );
}
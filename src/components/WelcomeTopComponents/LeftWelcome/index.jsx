import { useEffect } from "react";
import { useSpring, a } from 'react-spring';
import { Button } from "../../Button";

export const LeftWelcome = () => {
    const fadeIn = useSpring({
        from: { opacity: 0, transform: 'translateX(-100px)' },
        to: { opacity: 1, transform: 'translateX(0)' },
        config: { duration: 600 },
    });

    useEffect(() => {
        setTimeout(() => {
          fadeIn.start;
        }, 200);
      }, [fadeIn]);

    return (
        <a.div style={fadeIn} className="welcome-left__container">
            <h1 className="welcome-left__title">Сервис для адаптации стажёров</h1>
            <span className="welcome-left__description">Планирование задач на диаграмме Ганта. Удобное отслеживание и&nbsp;распределние по&nbsp;проектам</span>
            <Button title={"Начать"} color={"black-button"} />
        </a.div>
    );
}
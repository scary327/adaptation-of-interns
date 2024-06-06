import { useEffect, useState } from "react";
import { Button } from "../../../Button";
import { useSpring, animated, useTransition } from "react-spring";
import styles from './welcome-right.module.css';
import ChangePlanImage from '../../../../theme/images/changeplan.png';
import SavePlanImage from '../../../../theme/images/save-plan.png';
import GantImage from '../../../../theme/images/gant.png';

export const RightWelcome = ({setOpenModal}) => {
    const images = [GantImage, SavePlanImage, ChangePlanImage];
    const [currentIndex, setCurrentIndex] = useState(0);

    const fadeIn = useSpring({
        from: { opacity: 0, transform: 'translateY(-50px)' },
        to: { opacity: 1, transform: 'translateY(0px)' },
        config: { duration: 600 },
    });

    const transitions = useTransition(currentIndex, {
        from: { opacity: 0, transform: 'translateX(100%)' },
        enter: { opacity: 1, transform: 'translateX(0%)' },
        leave: { opacity: 0, transform: 'translateX(-100%)' },
        config: { duration: 500 },
      });

    useEffect(() => {
        setTimeout(() => {
          fadeIn.start;
        }, 200);
      }, [fadeIn]);

      const nextImage = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
      };
    
      const prevImage = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
      };
    
      useEffect(() => {
        const interval = setInterval(nextImage, 5000);
        return () => clearInterval(interval);
      }, []);
    
    return (
        <div className={styles.container}>
            <animated.ul style={fadeIn} className={styles.buttons_list}>
                <Button title={"Разработка"} color={"empty-button"} />
                <Button title={"О проекте"} color={"empty-button"} />
                <Button title={"Войти"} color={"orange-button"} onClick={() => setOpenModal(true)} />
            </animated.ul>
            <div className={styles.image_slider}>
                <button onClick={prevImage} className={styles.arrow}>‹</button>
                <div className={styles.image_container}>
                    {transitions((style, index) => (
                        <animated.img
                        src={images[index]}
                        alt="current"
                        style={style}
                        className={styles.image}
                        />
                    ))}
                </div>
                <button onClick={nextImage} className={styles.arrow}>›</button>
            </div>
        </div>
    )
}
import { useEffect } from "react";
import { Button } from "../../Button";
import { useSpring, animated } from "react-spring";

export const RightWelcome = () => {

    const fadeIn = useSpring({
        from: { opacity: 0, transform: 'translateY(-50px)' },
        to: { opacity: 1, transform: 'translateY(0px)' },
        config: { duration: 600 },
    });

    useEffect(() => {
        setTimeout(() => {
          fadeIn.start;
        }, 200);
      }, [fadeIn]);
    
    return (
        <div className="welcome-right__container">
            <animated.ul style={fadeIn} className="welcome-right__buttons-list">
                <Button title={"Разработка"} color={"empty-button"} />
                <Button title={"О проекте"} color={"empty-button"} />
                <Button title={"Войти"} color={"orange-button"} />
            </animated.ul>
        </div>
    )
}
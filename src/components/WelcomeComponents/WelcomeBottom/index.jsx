import styles from './welcome-bottom.module.css';

export const WelcomeBottomComponent = () => {

    return (
        <div className={styles.container}>
            <div className={styles.top_container}>
                <span className={styles.small_title}>Адаптация&nbsp;стажёров</span>
                <div className={styles.hr} />
            </div>
            <div className={styles.main_container}>
                <div className={styles.title}>Инструменты планирования</div>
                <div className={styles.description}>
                    Благодаря возможности отслеживания и&nbsp;распределения задач по&nbsp;проектам, наши пользователи могут легко контролировать прогресс работы и&nbsp;оперативно реагировать на&nbsp;изменения в&nbsp;приоритетах.
                </div>
            </div>
            <div className={styles.footer_text}>
                @ProphecyLabs
            </div>
        </div>
    )
}
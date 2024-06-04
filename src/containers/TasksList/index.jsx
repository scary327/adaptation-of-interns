import styles from './tasks-list.module.css';
import { UserInfoContext } from '../../RootApp';
import { useState, useEffect, useContext } from 'react';
export const TasksList = (props) => {
    const { server, userInfo } = useContext(UserInfoContext);
    const {patternTasksList, tasksList, setTasksList, internId} = props;

    const formatDate = (date) => {
        const pad = (number) => (number < 10 ? '0' : '') + number;
        return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
    };

    const addTask = (task) => {
        const taskToSend = {
            internId: internId,
            title: task.title,
            description: task.description,
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
                start: formatDate(new Date()),
                end: formatDate(new Date(Date.now() + 5 * 24 * 60 * 60 * 1000)),
                progress: 0,
                description: data.description
            };
        const newList = JSON.stringify(tasksList[0]) !== '{}' ? [...tasksList, newTask] : [ newTask ]; 
        setTasksList(newList);
    });
    }

    return (
        <div className={styles.container}>
            {patternTasksList.map((task) => {
                return (
                    <div key={task.id} onClick={() => addTask(task)} className={styles.task_container}>
                        {task.title}
                    </div>
                )
            })}
        </div>
    )
}
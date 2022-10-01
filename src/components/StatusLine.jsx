import "../../styles/statusLine.scss";
import Task from "./Task";
import { useState } from "react";

export default function StatusLine(props) {
    const { status, tasks, addTask, deleteTask, addEmptyTask, moveTask } = props;
    const [show, setShow] = useState(false);

    let taskList, tasksForStatus;

    function handleAddEmpty() {
        addEmptyTask(status);
    }

    if (tasks) {
        tasksForStatus = tasks.filter((task) => {
            return task.status === status;
        });
    }

    function showHide() {
        setShow(!show);
    }
    if (tasksForStatus) {
        taskList = tasksForStatus.map((task) => {
            return (
                <Task
                    addTask={(task) => addTask(task)}
                    deleteTask={(id) => deleteTask(id)}
                    moveTask={(id, status) => moveTask(id, status)}
                    key={task.id}
                    task={task}
                    show={show}
                    showHide={showHide}
                />
            );
        });
    }

    return (
        <div className="statusLine">
            <h3>{status}</h3>
            {taskList}
            <button onClick={() => { handleAddEmpty(); setShow(!show)}} className="button addTask">
                +
            </button>
        </div>
    );
}

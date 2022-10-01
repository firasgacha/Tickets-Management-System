import "../../styles/statusLine.scss";
import Task from "./Task";
import { useState } from "react";

export default function StatusLine(props) {
    const { status, tasks, addTask, deleteTask, addEmptyTask, moveTask, editTask } = props;
    const [showAdd, setshowAdd] = useState(false);
    const [showEdit, setshowEdit] = useState(false);

    let taskList, tasksForStatus;

    function handleAddEmpty() {
        addEmptyTask(status);
    }

    if (tasks) {
        tasksForStatus = tasks.filter((task) => {
            return task.status === status;
        });
    }
    
    function showHideAdd() {
        setshowAdd(!showAdd);
    }
    function showHideEdit() {
        setshowEdit(!showEdit);
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
                    editTask={(task) => editTask(task)}
                    showAdd={showAdd}
                    showEdit={showEdit}
                    showHideAdd={showHideAdd}
                    showHideEdit={showHideEdit}
                />
            );
        });
    }

    return (
        <div className="statusLine">
            <h3>{status}</h3>
            {taskList}
            <button onClick={() => { handleAddEmpty(); setshowAdd(!showAdd) }} className="button addTask">
                +
            </button>
        </div>
    );
}

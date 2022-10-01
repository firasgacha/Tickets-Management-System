import "../../styles/task.scss";
import { useState } from "react";

export default function Task(props) {
    const { addTask, deleteTask, moveTask, task, show, showHide } = props;

    const [urgencyLevel, setUrgencyLevel] = useState(task.urgency);
    const [collapsed, setCollapsed] = useState(task.isCollapsed);
    const [formAction, setFormAction] = useState("");

    function setUrgency(event) {
        setUrgencyLevel(event.target.attributes.urgency.value);
    }

    function handleSubmit(event) {
        event.preventDefault();

        if (formAction === "save") {
            if (collapsed) {
                setCollapsed(false);
            } else {
                let newTask = {
                    id: task.id,
                    title: event.target.elements.title.value,
                    description: event.target.elements.description.value,
                    urgency: urgencyLevel,
                    status: task.status,
                    isCollapsed: true,
                };

                addTask(newTask);
                setCollapsed(true);
            }
        }

        if (formAction === "delete") {
            deleteTask(task.id);
        }
    }

    function handleMoveLeft() {
        let newStatus = "";

        if (task.status === "In Progress") {
            newStatus = "To Do";
        } else if (task.status === "Code Review") {
            newStatus = "In Progress";
        } else if (task.status === "Done") {
            newStatus = "Code Review";
        }

        if (newStatus !== "") {
            moveTask(task.id, newStatus);
        }
    }

    function handleMoveRight() {
        let newStatus = "";

        if (task.status === "To Do") {
            newStatus = "In Progress";
        } else if (task.status === "In Progress") {
            newStatus = "Code Review";
        } else if (task.status === "Code Review") {
            newStatus = "Done";
        }

        if (newStatus !== "") {
            moveTask(task.id, newStatus);
        }
    }

    return (
        <div className="task">
            {task.status != "To Do" && (
                <button onClick={handleMoveLeft} className="button moveTask">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M18.75 19.5l-7.5-7.5 7.5-7.5m-6 15L5.25 12l7.5-7.5" />
                    </svg>
                </button>
            )}
            {task.title}
            {task.description}
            {show && (
                <form onSubmit={handleSubmit}>
                    <div>
                        <div className="py-12 bg-gray-700 transition duration-150 ease-in-out z-10 absolute top-0 right-0 bottom-0 left-0" id="modal">
                            <div role="alert" className="container mx-auto w-11/12 md:w-2/3 max-w-lg">
                                <div className="relative py-8 px-5 md:px-10 bg-white shadow-md rounded border border-gray-400">
                                    <h1 className="text-gray-800 font-lg font-bold tracking-normal leading-tight mb-4">Add New Task</h1>
                                    <label htmlFor="name" className="text-gray-800 text-sm font-bold leading-tight tracking-normal">
                                        Title
                                    </label>
                                    <input
                                        type="text"
                                        className="mb-5 mt-2 text-gray-600 focus:outline-none focus:border focus:border-indigo-700 font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border"
                                        name="title"
                                        placeholder="Enter Title"
                                        disabled={collapsed}
                                        defaultValue={task.title}
                                    />
                                    <label htmlFor="email2" className="text-gray-800 text-sm font-bold leading-tight tracking-normal">
                                        Description
                                    </label>
                                    <textarea
                                        rows="5" cols="100"
                                        className="mb-5 mt-2  text-gray-600 focus:outline-none focus:border focus:border-indigo-700 font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border"
                                        name="description"
                                        placeholder="Enter Description"
                                        defaultValue={task.description}
                                    />
                                    <div className="urgencyLabels">
                                        <label className={`low ${urgencyLevel === "low" ? "selected" : ""}`}>
                                            <input
                                                urgency="low"
                                                onChange={setUrgency}
                                                type="radio"
                                                name="urgency"
                                            />
                                            low
                                        </label>
                                        <label
                                            className={`medium ${urgencyLevel === "medium" ? "selected" : ""}`}
                                        >
                                            <input
                                                urgency="medium"
                                                onChange={setUrgency}
                                                type="radio"
                                                name="urgency"
                                            />
                                            medium
                                        </label>
                                        <label
                                            className={`high ${urgencyLevel === "high" ? "selected" : ""}`}
                                        >
                                            <input
                                                urgency="high"
                                                onChange={setUrgency}
                                                type="radio"
                                                name="urgency"
                                            />
                                            high
                                        </label>
                                    </div>
                                    <div className="flex items-center justify-start w-full">
                                        <button className="focus:outline-none transition duration-150 ease-in-out hover:bg-indigo-600 bg-indigo-700 rounded text-white px-8 py-2 text-sm"
                                            onClick={() => {
                                                setFormAction("save");
                                            }}>Submit</button>
                                        <button onClick={() => { showHide() }} className="focus:outline-none ml-3 bg-gray-100 transition duration-150 text-gray-600 ease-in-out hover:border-gray-400 hover:bg-gray-300 border rounded px-8 py-2 text-sm">
                                            Cancel
                                        </button>
                                    </div>
                                    <div className="cursor-pointer absolute top-0 right-0 mt-4 mr-5 text-gray-400 hover:text-gray-600 transition duration-150 ease-in-out">
                                        <svg onClick={() => {showHide() }} xmlns="http://www.w3.org/2000/svg" aria-label="Close" className="icon icon-tabler icon-tabler-x" width={20} height={20} viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                            <path stroke="none" d="M0 0h24v24H0z" />
                                            <line x1={18} y1={6} x2={6} y2={18} />
                                            <line x1={6} y1={6} x2={18} y2={18} />
                                        </svg>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                </form>
            )}
            {/* {task.title} */}
            <button
                onClick={() => {
                    deleteTask(task.id);
                }}
                className="button delete"
            >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                </svg>
            </button>
            {task.status != "Done" && (
                <button onClick={handleMoveRight} className="button moveTask">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 4.5l7.5 7.5-7.5 7.5m-6-15l7.5 7.5-7.5 7.5" />
                    </svg>
                </button>
            )}
        </div>
    );
}

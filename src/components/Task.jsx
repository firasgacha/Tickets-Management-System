import "../../styles/task.scss";
import { useState } from "react";

export default function Task(props) {
    const { editTask, addTask, deleteTask, moveTask, task, showAdd, showHideAdd, showEdit, showHideEdit } = props;

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [deadLine, setDeadLine] = useState("");


    const [view, setView] = useState(false);


    function handleSubmit() {
        let newTask = {
            id: task.id,
            title: title,
            description: description,
            deadLine: deadLine,
            created: new Date().toLocaleDateString(),
            status: task.status,
        };
        if (title != "" || description != "") {
            addTask(newTask);
        }
        showHideAdd();
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

    function EditFunction() {
        setTitle(task.title);
        setDescription(task.description);
        setDeadLine(task.date);
    }
    function handleEdit() {
        const t = {
            id: task.id,
            title: title,
            description: description,
            status: task.status,
        };
        editTask(t);
        showHideEdit();
    }

    return (
        <>
            <div className="task">
                <div className="flex-col justify-center">
                    <div className="mb-2 text-xl">
                        {task.title}
                    </div>
                    <div>
                        {task.status != "To Do" && (
                            <button onClick={handleMoveLeft} className="button moveTask">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M18.75 19.5l-7.5-7.5 7.5-7.5m-6 15L5.25 12l7.5-7.5" />
                                </svg>
                            </button>
                        )}
                        <button
                            onClick={() => {
                                setView(!view);
                            }}
                            className="button moveTask"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-4">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                        </button>
                        <button
                            onClick={() => {
                                EditFunction(); showHideEdit();
                            }}
                            className="button moveTask"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-4">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                            </svg>
                        </button>
                        <button
                            onClick={() => {
                                deleteTask(task.id);
                            }}
                            className="button moveTask"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-4">
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
                </div>
            </div>

            {view && (
                < div id="view" className="z-50 fixed w-full flex justify-center inset-0">
                    <div className="w-full h-full bg-gray-500 bg-opacity-75 transition-opacity z-0 absolute inset-0" />
                    <div className="mx-auto container">
                        <div className="flex items-center justify-center h-full w-full">
                            <div className="bg-white rounded-md shadow fixed overflow-y-auto sm:h-auto w-10/12 md:w-8/12 lg:w-1/2 2xl:w-2/5">
                                <div className="bg-gray-100 rounded-tl-md rounded-tr-md px-4 md:px-8 md:py-4 py-7 flex items-center justify-between">
                                    <p className="text-black font-semibold">Title: {task.title}</p>
                                    <p className="text-black font-semibold">Created at: {task.created}</p>
                                    <button className="focus:outline-none">
                                        <svg onClick={() => setView(!view)} width={20} height={20} viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M21 7L7 21" stroke="#A1A1AA" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
                                            <path d="M7 7L21 21" stroke="#A1A1AA" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    </button>
                                </div>
                                <div className="flex-col px-4 md:px-10 pt-6 md:pt-12 md:pb-4 pb-7">
                                    <label className="text-gray-800 text-sm font-bold leading-tight tracking-normal text-start">
                                        Deadline : {task.deadLine}
                                    </label>
                                    <br />
                                    <label className="text-gray-800 text-sm font-bold leading-tight tracking-normal text-start">
                                        Description
                                    </label>
                                    <p className="text-slate-800 text-center">{task.description}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )
            }

            {showEdit && (

                <div name="EDIT">
                    < div id="Add" className="z-50 fixed w-full flex justify-center inset-0">
                        <div className="w-full h-full bg-gray-500 bg-opacity-75 transition-opacity z-0 absolute inset-0" />
                        <div className="mx-auto container">
                            <div className="flex items-center justify-center h-full w-full">
                                <div className="bg-white rounded-md shadow fixed overflow-y-auto sm:h-auto w-10/12 md:w-8/12 lg:w-1/2 2xl:w-2/5">
                                    <div className="bg-gray-100 rounded-tl-md rounded-tr-md px-4 md:px-8 md:py-4 py-7 flex items-center justify-between">
                                        <p className="text-black font-semibold">Edit Task</p>
                                        <button className="focus:outline-none">
                                            <svg onClick={() => { showHideEdit() }} width={20} height={20} viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M21 7L7 21" stroke="#A1A1AA" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
                                                <path d="M7 7L21 21" stroke="#A1A1AA" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
                                        </button>
                                    </div>
                                    <div className="relative py-8 px-5 md:px-10 shadow-md rounded border">
                                        <label htmlFor="name" className="text-gray-800 text-sm font-bold leading-tight tracking-normal">
                                            Title
                                        </label>
                                        <input
                                            type="text"
                                            className="mb-5 mt-2 text-gray-600 focus:outline-none focus:border focus:border-indigo-700 font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border"
                                            name="title"
                                            placeholder="Enter Title"
                                            defaultValue={task.title}
                                            onChange={(e) => setTitle(e.target.value)}
                                        />
                                        <label className="text-gray-800 text-sm font-bold leading-tight tracking-normal text-start">
                                            Deadline
                                        </label>
                                        <input
                                            type="date"
                                            className="text-center mb-5 mt-2 text-gray-600 focus:outline-none focus:border focus:border-indigo-700 font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border"
                                            name="date"
                                            defaultValue={deadLine}
                                            onChange={(e) => setDeadLine(e.target.value)}
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
                                            onChange={(e) => setDescription(e.target.value)}
                                        />
                                        <div className="flex items-center justify-center w-full">
                                            <button onClick={() => handleEdit()} className="focus:outline-none transition duration-150 ease-in-out hover:bg-indigo-600 bg-indigo-700 rounded text-white px-8 py-2 text-sm">Save changes</button>
                                            <button onClick={() => { showHideEdit() }} className="focus:outline-none ml-3 bg-gray-100 transition duration-150 text-gray-600 ease-in-out hover:border-gray-400 hover:bg-gray-300 border rounded px-8 py-2 text-sm">
                                                Cancel
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )
            }

            {showAdd && (
                <div name="ADD">
                    < div id="Add" className="z-50 fixed w-full flex justify-center inset-0">
                        <div className="w-full h-full bg-gray-500 bg-opacity-75 transition-opacity z-0 absolute inset-0" />
                        <div className="mx-auto container">
                            <div className="flex items-center justify-center h-full w-full">
                                <div className="bg-white rounded-md shadow fixed overflow-y-auto sm:h-auto w-10/12 md:w-8/12 lg:w-1/2 2xl:w-2/5">
                                    <div className="bg-gray-100 rounded-tl-md rounded-tr-md px-4 md:px-8 md:py-4 py-7 flex items-center justify-between">
                                        <p className="text-black font-semibold">Add New Task</p>
                                        <button className="focus:outline-none">
                                            <svg onClick={() => { showHideAdd() }} width={20} height={20} viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M21 7L7 21" stroke="#A1A1AA" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
                                                <path d="M7 7L21 21" stroke="#A1A1AA" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
                                        </button>
                                    </div>
                                    <div className="relative py-8 px-5 md:px-10 shadow-md rounded border">
                                        <label className="text-gray-800 text-sm font-bold leading-tight tracking-normal text-start">
                                            Title
                                        </label>
                                        <input
                                            type="text"
                                            className="text-center mb-5 mt-2 text-gray-600 focus:outline-none focus:border focus:border-indigo-700 font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border"
                                            name="title"
                                            placeholder="Ex. Edit issue"
                                            onChange={(e) => setTitle(e.target.value)}
                                        />
                                        <label className="text-gray-800 text-sm font-bold leading-tight tracking-normal text-start">
                                            Deadline
                                        </label>
                                        <input
                                            type="date"
                                            className="text-center mb-5 mt-2 text-gray-600 focus:outline-none focus:border focus:border-indigo-700 font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border"
                                            name="date"
                                            onChange={(e) => setDeadLine(e.target.value)}
                                        />
                                        <label className="text-gray-800 text-sm font-bold leading-tight tracking-normal">
                                            Description
                                        </label>
                                        <textarea
                                            rows="5" cols="100"
                                            className="text-center mb-5 mt-2 text-gray-600 focus:outline-none focus:border focus:border-indigo-700 font-normal w-full h-100 flex items-center pl-3 text-sm border-gray-300 rounded border"
                                            name="description"
                                            placeholder="Ex. there is an issue with the date parameter"
                                            onChange={(e) => setDescription(e.target.value)}
                                        />
                                        <div className="flex items-center justify-center w-full">
                                            <button onClick={() => handleSubmit()} className="focus:outline-none transition duration-150 ease-in-out hover:bg-indigo-600 bg-indigo-700 rounded text-white px-8 py-2 text-sm">Add</button>
                                            <button onClick={() => { showHideAdd(); deleteTask(task.id) }} className="focus:outline-none ml-3 bg-gray-100 transition duration-150 text-gray-600 ease-in-out hover:border-gray-400 hover:bg-gray-300 border rounded px-8 py-2 text-sm">
                                                Cancel
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )
            }
        </>
    );
}

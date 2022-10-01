import React from 'react'

export default function AddTask(props) {
    const { addTask, deleteTask } = props;

    function handleSubmit() {
        let newTask = {
            id: "1",
            title: "yhgjj",
            description: "fghjkl",
            status: "To Do",
        };
        addTask(newTask);
    }
    return (
        < div id="Add" className="z-50 fixed w-full flex justify-center inset-0">
            <div className="w-full h-full bg-gray-500 bg-opacity-75 transition-opacity z-0 absolute inset-0" />
            <div className="mx-auto container">
                <div className="flex items-center justify-center h-full w-full">
                    <div className="bg-white rounded-md shadow fixed overflow-y-auto sm:h-auto w-10/12 md:w-8/12 lg:w-1/2 2xl:w-2/5">
                        <div className="bg-gray-100 rounded-tl-md rounded-tr-md px-4 md:px-8 md:py-4 py-7 flex items-center justify-between">
                            <p className="text-black font-semibold">Add New Task</p>
                            <button className="focus:outline-none">
                                <svg width={20} height={20} viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M21 7L7 21" stroke="#A1A1AA" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M7 7L21 21" stroke="#A1A1AA" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </button>
                        </div>
                        <div className="px-4 md:px-10 pt-6 md:pt-12 md:pb-4 pb-7">
                            <form onSubmit={handleSubmit}>
                                <label className='text-black'>Task title</label>
                                <div className="flex-row justify-center text-center items-center space-x-9">
                                    <input type="text" placeholder='ex. Button Bug' className="w-1/2 mb-8 text-center focus:outline-none placeholder-gray-500 py-3 px-3 text-sm leading-none text-gray-800 bg-white border rounded border-gray-200" />
                                </div>
                                <label className='text-black'>Description</label>
                                <div className="flex items-center space-x-9">
                                    <textarea placeholder="ex When user on this button the page stay the same" className="text-center bg-transparent border border-gray-300  pl-3 py-3 shadow-sm rounded text-sm focus:outline-none focus:border-indigo-700 resize-none placeholder-gray-500 text-gray-500 " rows={5} cols={100} defaultValue={""} />
                                </div>
                            </form>
                            <div className="flex items-center justify-between mt-9">
                                <button className="px-6 py-3 bg-gray-400 hover:bg-gray-500 shadow rounded text-sm text-white">
                                    Cancel
                                </button>
                                <button onClick={()=>handleSubmit()} className="px-6 py-3 bg-indigo-700 hover:bg-opacity-80 shadow rounded text-sm text-white">Confirm</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

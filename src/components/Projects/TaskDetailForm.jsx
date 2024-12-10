import { React, useState, useEffect } from "react";


export default function TaskDetailForm({ onChange }) {

    const [tasks, setTasks] = useState([]);
    const [data, setData] = useState({
        taskName: '',
        description: '',
        dueDate: '',
        priority: 'Medium',
    });

    const handleInputChange = (e) => {
        setData({
            ...data,
            [e.target.name]: e.target.value,
        });
    };

    const handleAddTask = () => {
        if (taskInput.taskName.trim() === '' || taskInput.description.trim() === '') {
        alert('Please fill in the task name and description');
        return;
        }
        setTasks([...tasks, data]);
        setData({ taskName: '', description: '', dueDate: '', priority: 'Medium' });
    };

    useEffect(() => {
        onChange(data);
    }, [data, onChange]);

    return (
        <div className="flex flex-col md:flex-row justify-between w-full p-5 mt-16">
            {/* Left Side Form */}
            <div className="w-full md:w-1/2 bg-gray-100 p-5 rounded-lg shadow-lg">
                {/* <h2 className="text-2xl font-semibold mb-4">Add Task</h2> */}
                <div className="text-left mb-4">
                    <label htmlFor="TaskName" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Task Name</label>
                    <input 
                        type="text" 
                        id="TaskName" 
                        name="taskName" 
                        value={data.taskName} 
                        onChange={handleInputChange} 
                        aria-describedby="helper-text-explanation" 
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter the name of your Task"
                    />
                </div>

                <div className="text-left mb-4">
                <label htmlFor="TaskDesc" className="block mb-2 mt-8 text-sm font-medium text-gray-900 dark:text-white">Task Description</label>
                <textarea 
                    rows="3" 
                    name="description"
                    value={data.description}
                    onChange={handleInputChange}
                    id="TaskDesc" 
                    aria-describedby="helper-text-explanation" 
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Decribe the Task"
                />
                </div>

                <div className="text-left mb-4">
                    <label htmlFor="TaskDeadline" className="block mb-2 mt-8 text-sm font-medium text-gray-900 dark:text-white">Project Deadline</label>
                    <input
                        type="date"
                        name="dueDate"
                        value={data.dueDate}
                        onChange={handleInputChange}
                        className="w-full p-2 border border-gray-300 rounded-lg"
                    />
                </div>

                <div className="text-left mb-4">
                    <label htmlFor="priority" className="block mb-2 mt-8 text-sm font-medium text-gray-900 dark:text-white">Task Priority</label>
                    <select 
                        id="priority" 
                        name="priority"
                        value={data.priority}
                        onChange={handleInputChange}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    >
                        <option value="Medium">Medium</option>
                        <option value="High">High</option>
                        <option value="Low">Low</option>
                    </select>
                </div>

                {/* <button
                className="bg-blue-500 text-white px-4 py-2 rounded-lg w-full hover:bg-blue-600 transition duration-200"
                onClick={handleAddTask}
                >
                    Add Task
                </button> */}
                <button onClick={handleAddTask} className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 mt-8 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800">
                    <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                        Add Task
                    </span>
                </button>
            </div>

            {/* Right Side Task List */}
            <div className="w-full md:w-1/2 mt-8 md:mt-0 bg-white p-5 rounded-lg shadow-lg">
                <h2 className="text-xl font-semibold mb-4">Project Tasks</h2>
                {tasks.length === 0 ? (
                    <p className="text-gray-500">No tasks added yet.</p>
                ) : (
                    <ul className="text-left pl-5">
                        {tasks.map((task, index) => (
                        <li key={index} className="w-full bg-gray-50 shadow rounded-md mb-4 mt-5 p-2">
                            <p className="font-medium break-words">{task.taskName} - {task.description}</p>
                            <p className="text-sm mt-2 text-gray-500">Due Date: {task.dueDate || 'N/A'} &emsp; Priority: {task.priority}</p>
                        </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    )
}
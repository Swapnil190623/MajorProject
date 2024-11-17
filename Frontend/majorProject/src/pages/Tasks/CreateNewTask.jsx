import { React, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { startLoading, stopLoading } from "@/store/loadingSlice";
import api from "@/api/api";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { createTask } from "@/store/taskSlice";
import { toast } from "react-toastify";


export default function CreateNewTask() {

    const darkMode = useSelector((state) => state.theme.isDarkMode);
    const navigate = useNavigate();
    
    const user = JSON.parse(localStorage.getItem('user'));
    // console.log(user);
    

    const dispatch = useDispatch();
    const { projectId } = useParams();

    const [tasks, setTasks] = useState([]);
    const [data, setData] = useState({
        name: '',
        description: '',
        dueDate: '',
        taskStatus: 'pending',
        priority: 'medium',
        // assignedTo: '66d803c9eaffbfc139fb3fae',
    });

    // console.log(projectId)
    // console.log(tasks);
    

    const handleInputChange = (e) => {
        setData({
            ...data,
            [e.target.name]: e.target.value,
        });
    };

    const handleAddTask = async() => {
        // if (taskInput.taskName.trim() === '' || taskInput.description.trim() === '') {
        // alert('Please fill in the task name and description');
        // return;
        // }
        // setTasks([...tasks, data]);
        // setData({ name: '', description: '', dueDate: '', priority: 'Medium', assignedTo: '66d803c9eaffbfc139fb3fae' });
        dispatch(startLoading());
        // console.log(data);

        const notify = {
            userId : user._id,
            title : 'Task created successfully',
            message : 'task created'
        }
        // console.log(notify);

        try {
            const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/task/${projectId}`, data, { withCredentials: true });
            // console.log("Task created:", response.data.data);
            setTasks([...tasks, data]);
            setData({ name: '', description: '', dueDate: '', priority: 'Medium', assignedTo: '66d803c9eaffbfc139fb3fae' });

            // Toast notification
            toast.success("Task created successfully!");

            try {
                const notification = await api.post('/notification/', notify , {withCredentials: true});
                // console.log(notification.data.data);
                return notification.data.data;
            } catch (error) {
                // console.log(`Error: ${error}`);
            }

            return response.data.data;
        } catch (error) {
            // console.error('Error creating task:', error);
            // alert("Error in creating task")
            toast.error("Error creating task");
        }
        finally {
            dispatch(stopLoading());
        }
    };

    const handleSubmit = async () => {
        setTimeout(() => {
            navigate('/task/all-tasks');
        }, 2000); 
    }

    return (
        <>
        <div className={`absolute left-[300px] top-[64px] w-[80%] h-fit flex flex-col md:flex-row justify-between p-5 ${darkMode ? 'bg-gray-800 text-white' : 'bg-gray-50'}`}>
            {/* Left Side Form */}
            <div className={`w-[500px] p-5 rounded-lg shadow-lg ${darkMode ? 'bg-gray-700 text-white' : 'bg-gray-100'}`}>
                {/* <h2 className="text-2xl font-semibold mb-4">Add Task</h2> */}
                <div className="text-left mb-4">
                    <label htmlFor="name" className={`block mb-2 text-sm font-medium dark:text-white ${darkMode ? 'text-white' : 'text-gray-900'}`}>Task Name</label>
                    <input 
                        type="text" 
                        id="name" 
                        name="name" 
                        value={data.name} 
                        onChange={handleInputChange} 
                        aria-describedby="helper-text-explanation" 
                        className={`border text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${darkMode ? 'bg-gray-600 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500' : 'bg-gray-50 text-gray-900 border-gray-300'}`}
                    />
                </div>

                <div className="text-left mb-4">
                <label htmlFor="TaskDesc" className={`block mb-2 mt-8 text-sm font-medium dark:text-white ${darkMode ? 'text-white' : 'text-gray-900'}`}>Task Description</label>
                <textarea 
                    rows="3" 
                    name="description"
                    value={data.description}
                    onChange={handleInputChange}
                    id="TaskDesc" 
                    aria-describedby="helper-text-explanation" 
                    className={`border text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${darkMode ? 'bg-gray-600 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500' : 'bg-gray-50 text-gray-900 border-gray-300'}`}
                />
                </div>

                {/* <div className="text-left mb-4">
                    <label htmlFor="ProjectName" className="block mb-2 mt-8 text-sm font-medium text-gray-900 dark:text-white">Project Name</label>
                    <input 
                        type="text" 
                        id="ProjectName" 
                        name="projectName" 
                        value={data.projectName} 
                        onChange={handleInputChange} 
                        aria-describedby="helper-text-explanation" 
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                        placeholder="Enter the name of your Project"
                    />
                </div> */}

                <div className="text-left mb-4">
                    <label htmlFor="TaskDeadline" className={`block mb-2 mt-8 text-sm font-medium dark:text-white ${darkMode ? 'text-white' : 'text-gray-900'}`}>Project Deadline</label>
                    <input
                        type="date"
                        name="dueDate"
                        value={data.dueDate}
                        onChange={handleInputChange}
                        className={`w-full p-2 border rounded-lg ${darkMode ? 'bg-gray-600 border-gray-500' : 'border-gray-300'}`}
                    />
                </div>

                <div className="text-left mb-4">
                    <label htmlFor="status" className={`block mb-2 mt-8 text-sm font-medium dark:text-white ${darkMode ? 'text-white' : 'text-gray-900'}`}>Task Status</label>
                    <select 
                        id="status" 
                        name="taskStatus"
                        value={data.taskStatus}
                        onChange={handleInputChange}
                        className={`border text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${darkMode ? 'bg-gray-600 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500' : 'bg-gray-50 text-gray-900 border-gray-300'}`}
                    >
                        <option value="pending">Pending</option>
                        <option value="in-progress">In-progress</option>
                        <option value="completed">Completed</option>
                    </select>
                </div>

                <div className="text-left mb-4">
                    <label htmlFor="priority" className={`block mb-2 mt-8 text-sm font-medium dark:text-white ${darkMode ? 'text-white' : 'text-gray-900'}`}>Task Priority</label>
                    <select 
                        id="priority" 
                        name="priority"
                        value={data.priority}
                        onChange={handleInputChange}
                        className={`border text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${darkMode ? 'bg-gray-600 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500' : 'bg-gray-50 text-gray-900 border-gray-300'}`}
                    >
                        <option value="medium">Medium</option>
                        <option value="high">High</option>
                        <option value="low">Low</option>
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
            <div className={`absolute left-[600px] w-[500px] h-[560px] p-5 rounded-lg shadow-lg ${darkMode ? 'bg-gray-600' : 'bg-white'}`}>
                <h2 className="text-xl font-semibold mb-4">Project Tasks</h2>
                {tasks.length === 0 ? (
                    <p className={`${darkMode ? 'text-gray-300' : 'text-gray-500'}`}>No tasks added yet.</p>
                ) : (
                    <ul className="text-left pl-5">
                        {tasks.map((task, index) => (
                        <li key={index} className="w-full bg-gray-50 shadow rounded-md mb-4 mt-5 p-2">
                            <p className="font-medium break-words">{task.name} - {task.description}</p>
                            <p className="text-sm mt-2 text-gray-500">Due Date: {task.dueDate || 'N/A'} &emsp; Priority: {task.priority}</p>
                        </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
        <button onClick={handleSubmit} className="absolute bottom-[10px] right-[50px] inline-flex items-center justify-center p-0.5 mb-2 me-2 mt-8 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800">
            <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                Submit
            </span>
        </button>
        </>
    )
}
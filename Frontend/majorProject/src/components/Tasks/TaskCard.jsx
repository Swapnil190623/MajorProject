import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Button from '@mui/material/Button';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import AvatarCircles from "../ui/avatar-circles";
import api from "@/api/api";
import { Navigate, useNavigate } from "react-router-dom";
import formatDate from "@/lib/FormatDate";


export default function TaskCard({ task }) {

    const darkMode = useSelector((state) => state.theme.isDarkMode);
    const [projectName, setProjectName] = useState('');
    const navigate = useNavigate();
    // console.log(task)

    const formattedDeadline = formatDate(task.dueDate)

    const handleDeleteTask = async () => {
        const isConfirmed = window.confirm('Are you sure you want to delete this task?');
        if (!isConfirmed) return;

        try {
            const response = await api.delete(`/task/${task._id}`, { withCredentials : true});
            console.log(response.data.data);
            navigate('/dashboard');
            alert("Task deleted successfully");
            return response.data.data;
        }
        catch (error) {
            console.log(`Error : ${error}`);
        }
    }

    useEffect(() => {
        const getProjectName = async() => {
            try {
            const response = await api.get(`/project/${task.projectId}`, { withCredentials: true });
            // console.log(response.data.data.name);
            setProjectName(response.data.data.name);
            }
            catch (error) {
                console.log(`Error: ${error}`);
            }
        }
        getProjectName();
    },[]);

    return (
        <div className={`w-[350px] h-[250px] text-left p-5 rounded-xl ${darkMode ? 'bg-gray-700 hover:shadow-lg' : 'bg-gray-100 hover:shadow-md'}`}>
            {/* Display project name */}
            <p className="text-xl font-semibold">{task.name || 'Untitled Task'}</p>
            
            {/* Display project type, priority, and deadline */}
            <div className="flex justify-between mt-4">
                <Button variant="outlined" size="small">{task.type || 'General'}</Button>
                <Button variant="outlined" size="small">{task.priority || 'Medium'}</Button>
                <Button variant="outlined" size="small">
                    <AccessTimeIcon className="pr-2" />{formattedDeadline || 'No Deadline'}
                </Button>
            </div>
            
            {/* Display project description */}
            <p className="text-sm mt-5 text-gray-400">
                {task.description || 'No description available.'}
            </p>

            <p className="text-sm mt-2 text-gray-400">
                Project : {projectName}
            </p>
            
            {/* Display avatar circles if relevant */}
            {/* <AvatarCircles className="mt-5" /> */}
            <button onClick={handleDeleteTask} className="mt-8 py-1 px-2 bg-red-400 text-white rounded-lg">
                Delete Task
            </button>
        </div>
    );
}
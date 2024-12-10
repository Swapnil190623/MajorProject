import React from "react";
import { useSelector } from "react-redux";
import Button from '@mui/material/Button';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import AvatarCircles from "../ui/avatar-circles";
import formatDate from "@/lib/FormatDate";


export default function TaskMiniCard({ task }) {

    const darkMode = useSelector((state) => state.theme.isDarkMode);
    
    const formattedDate = formatDate(task.dueDate);

    return (
        <div className={`w-[500px] h-[80px] text-left rounded-lg p-3 ${darkMode ? 'bg-gray-700 hover:shadow-lg' : 'bg-gray-100 hover:shadow-md'}`}>
            <p className="font-medium break-words">{task.name} - {task.description}</p>
            <p className="text-sm mt-2 text-gray-500">Due Date: {formattedDate || 'N/A'} &emsp; Priority: {task.priority}</p>
        </div>
    );
}
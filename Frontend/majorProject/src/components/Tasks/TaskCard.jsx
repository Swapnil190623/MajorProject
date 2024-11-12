import React from "react";
import { useSelector } from "react-redux";
import Button from '@mui/material/Button';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import AvatarCircles from "../ui/avatar-circles";


export default function TaskCard({ task }) {

    const darkMode = useSelector((state) => state.theme.isDarkMode);

    return (
        <div className={`w-[300px] h-[250px] text-left p-5 rounded-xl ${darkMode ? 'bg-gray-700 hover:shadow-lg' : 'bg-gray-100 hover:shadow-md'}`}>
            {/* Display project name */}
            <p className="text-xl font-semibold">{task.name || 'Untitled Project'}</p>
            
            {/* Display project type, priority, and deadline */}
            <div className="flex justify-between mt-4">
                <Button variant="outlined" size="small">{task.type || 'General'}</Button>
                <Button variant="outlined" size="small">{task.priority || 'Medium'}</Button>
                <Button variant="outlined" size="small">
                    <AccessTimeIcon className="pr-2" />{task.deadline || 'No Deadline'}
                </Button>
            </div>
            
            {/* Display project description */}
            <p className="text-sm mt-5 text-gray-400">
                {task.description || 'No description available.'}
            </p>
            
            {/* Display avatar circles if relevant */}
            <AvatarCircles className="mt-5" />
        </div>
    );
}
import React from "react";
import { useSelector } from "react-redux";
import Button from '@mui/material/Button';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import AvatarCircles from "../ui/avatar-circles";
import { Link } from "react-router-dom";
import formatDate from "@/lib/FormatDate";


export default function ProjectCard({ project }) {
    
    const darkMode = useSelector((state) => state.theme.isDarkMode);
    // console.log(project._id);
    
    const formattedDeadline = formatDate(project.deadline);

    const avatarUrls = project.teamMembers.map((member) => member.avatar);

    return (
        <Link to={`/project/${project._id}`}>
        <div className={`w-[350px] min-h-[200px] text-left p-5 rounded-xl ${darkMode ? 'bg-gray-700 hover:shadow-lg' : 'bg-gray-100 hover:shadow-md'}`}>
            {/* Display project name */}
            <p className="text-xl font-semibold">{project.name || 'Untitled Project'}</p>
            
            {/* Display project type, priority, and deadline */}
            <div className="flex justify-between mt-4">
                <Button variant="outlined" size="small">{project.type || 'General'}</Button>
                <Button variant="outlined" size="small">{project.priority || 'Medium'}</Button>
                <Button variant="outlined" size="small">
                    <AccessTimeIcon className="pr-2" />{formattedDeadline || 'No Deadline'}
                </Button>
            </div>
            
            {/* Display project description */}
            <p className="text-sm mt-5 text-gray-400">
                {project.description || 'No description available.'}
            </p>

            {project.teamMembers.length === 0 ? <p className="text-sm text-gray-400 mt-4">No TeamMembers</p> : 
            (
            <AvatarCircles avatarUrls={avatarUrls} className="mt-5" />
            )}
        </div>
        </Link>
    );
}
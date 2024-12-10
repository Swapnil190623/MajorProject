import React from "react";
import { useSelector } from 'react-redux';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import formatDate from "@/lib/FormatDate";
import { Link } from "react-router-dom";


export default function DailyTaskCards({ task }) {

    const darkMode = useSelector((state) => state.theme.isDarkMode);
    const formattedDate = formatDate(task.dueDate);
    // console.log(task)

    return (
        <Link to="/task/all-tasks">
            <div className={`w-full h-[100px] rounded-md ${darkMode ? 'bg-gray-600 hover:shadow-lg hover:bg-gray-500' : 'bg-gray-100 hover:shadow-md'}`}>
                <div className="text-left pl-4">
                    <p className={`text-[16px] font-semibold overflow-hidden pt-2 ${darkMode ? 'text-white' : 'text-black'}`}>{task.name}</p>
                    <p className="text-[12px] font-medium overflow-hidden text-gray-400">{task.description}</p>
                    <p className={`text-[12px] font-semibold overflow-hidden mt-3 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        <AccessTimeIcon className="pr-1 pb-1"/>
                        Updated at {formattedDate}
                    </p>
                </div>
            </div>
        </Link>
    )
}
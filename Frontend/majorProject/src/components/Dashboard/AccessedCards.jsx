import React from "react";
import { useSelector } from 'react-redux';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import AccessTimeIcon from '@mui/icons-material/AccessTime';


export default function AccessedCards() {

    const darkMode = useSelector((state) => state.theme.isDarkMode);

    return (
        <div className={`w-[250px] h-[100px] flex justify-between rounded-lg ${darkMode ? 'bg-gray-700 hover:shadow-lg' : 'bg-gray-100 hover:shadow-md'}`}>
            <div className="text-left pl-4">
                <p className={`text-[20px] font-semibold overflow-hidden pt-2 ${darkMode ? 'text-white' : 'text-black'}`}>New Task</p>
                <p className="text-[13px] font-medium overflow-hidden text-gray-400">To design the Dashboard</p>
                <p className={`text-[13px] font-semibold overflow-hidden mt-3 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    <AccessTimeIcon className="pr-1 pb-1"/>
                    Updated 5 hours ago
                </p>
            </div>
            <KeyboardArrowRightIcon className="mt-9 mr-4"/>
        </div>
    )
}
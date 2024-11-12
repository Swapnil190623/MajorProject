import React from "react";
import { useSelector } from 'react-redux';
import Avatar from '@mui/material/Avatar'


export default function TeamMembersCards() {

    const darkMode = useSelector((state) => state.theme.isDarkMode);

    return (
        <div className={`flex items-center w-[300px] h-[60px] shadow-md mb-4 pl-3 rounded ${darkMode ? 'bg-gray-600 hover:bg-gray-500' : 'bg-gray-100 hover:bg-gray-200'}`}>
            <Avatar alt="Remy Sharp" src="https://png.pngtree.com/element_our/20190524/ourmid/pngtree-cute-girl-avatar-element-icon-image_1104606.jpg" />
            <div className="ml-5 text-left">
                <p className="text-[16px] font-semibold">User name</p>
                <p className="text-[13px] text-gray-400">Role</p>
            </div>
        </div>
    )
}
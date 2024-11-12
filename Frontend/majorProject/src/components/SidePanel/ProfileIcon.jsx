import React from "react";
import { useSelector } from "react-redux";
import Avatar from '@mui/material/Avatar'


export default function ProfileIcon() {

  const user = useSelector((state) => state.user.currentUser);
  const darkMode = useSelector((state) => state.theme.isDarkMode);

  return (
    <div>
      <div className={`flex items-center justify-around w-[300px] h-[60px] border-t-2 rounded ${darkMode ? 'hover:bg-gray-500' : 'hover:bg-gray-100'}`}>
            <div className="text-left">
                <p className="text-[16px] font-semibold">{user.fullName}</p>
                <p className="text-[13px] text-gray-400">{user.email}</p>
            </div>
            <Avatar className="" alt="Remy Sharp" src={user.avatar} />
        </div>
    </div>
  )
}
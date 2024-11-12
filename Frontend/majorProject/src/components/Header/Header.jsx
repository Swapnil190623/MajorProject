import React from 'react';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import SmsOutlinedIcon from '@mui/icons-material/SmsOutlined';
import { useSelector, useDispatch } from 'react-redux';
import { toggleDarkMode } from '@/store/themeSlice';
// import SendOutlinedIcon from '@mui/icons-material/SendOutlined';


export default function Header() {

  const darkMode = useSelector((state) => state.theme.isDarkMode); // Access state from Redux
  const dispatch = useDispatch();

  const handleToggleDarkMode = () => {
    dispatch(toggleDarkMode()); // Dispatch action to toggle dark mode
  };

  
  return (
    <header className={`fixed top-0 left-[20%] right-0 h-16 z-10 flex justify-between items-center p-4 ${darkMode ? 'bg-gray-800 text-white' : 'bg-gray-50'}`}>

      {/* Search Bar */}

      <div className={`flex w-1/2 rounded-lg ${darkMode ? 'bg-gray-700 text-white' : 'bg-white'}`}>
        <SearchOutlinedIcon className="mt-2 ml-2 text-gray-500"/>
        <input type="text" placeholder="Search here" className={`w-full p-2 outline-none rounded-lg ${darkMode ? 'bg-gray-700 text-white' : 'bg-white'}`}/>
      </div>

      {/* Right Side: Notifications, Dark/Light mode, Profile */}

      <div className="flex items-center space-x-4">
        <SmsOutlinedIcon className="cursor-pointer text-gray-500 hover:text-gray-700" />

        <NotificationsOutlinedIcon className="cursor-pointer text-gray-500 hover:text-gray-700" />

        <div onClick={handleToggleDarkMode} className="cursor-pointer">
          {darkMode ? (
            <LightModeOutlinedIcon className="text-yellow-500 hover:text-yellow-400" />
          ) : (
            <DarkModeOutlinedIcon className="text-gray-500 hover:text-gray-700" />
          )}
        </div>
      </div>
    </header>
  );
};
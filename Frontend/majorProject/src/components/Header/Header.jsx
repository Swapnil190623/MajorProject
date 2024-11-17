import {React, useState} from 'react';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import SmsOutlinedIcon from '@mui/icons-material/SmsOutlined';
import VideocamOutlinedIcon from '@mui/icons-material/VideocamOutlined';
import { useSelector, useDispatch } from 'react-redux';
import { toggleDarkMode } from '@/store/themeSlice';
// import SendOutlinedIcon from '@mui/icons-material/SendOutlined';
import NotificationCard from '../Notification/NotificationCard';
import { useNavigate } from 'react-router-dom';


export default function Header() {

  const darkMode = useSelector((state) => state.theme.isDarkMode); // Access state from Redux
  const dispatch = useDispatch();
  const [showNotifications, setShowNotifications] = useState(false);

  // Meeting
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const navigate = useNavigate();


  const handleToggleDarkMode = () => {
    dispatch(toggleDarkMode()); // Dispatch action to toggle dark mode
  };

  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
  };

  // Meeting
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const submitHandler = () => {
    if (inputValue.trim() === "") {
      alert("Please enter a room ID.");
      return;
    }
    alert("Meeting will start.");
    setIsOpen(false);
    navigate(`/room/${inputValue}`);
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
        {/* <SmsOutlinedIcon className="cursor-pointer text-gray-500 hover:text-gray-700" /> */}
        <VideocamOutlinedIcon onClick={toggleDropdown} className="cursor-pointer text-gray-500 hover:text-gray-700" />
        {isOpen && (
          <div className="absolute right-24 top-10 mt-2 w-64 p-4 bg-white border border-gray-300 rounded-lg shadow-lg">
            <input 
              type="text" 
              value={inputValue} 
              onChange={handleInputChange} 
              placeholder="Enter Room ID"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
            />
            <button 
              onClick={submitHandler}
              className="w-full px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition"
            >
              Join
            </button>
          </div>
        )}

        <div className="relative">
        <NotificationsOutlinedIcon onClick={toggleNotifications} className="cursor-pointer text-gray-500 hover:text-gray-700" />
        {showNotifications && (
            <div
              className={`absolute right-0 mt-2 w-80 max-h-96 p-2 ${
                darkMode ? "bg-gray-700 text-white" : "bg-white text-black"
              } border-gray-200 rounded-lg shadow-lg overflow-y-auto`}
            >
              <NotificationCard />
            </div>
          )}
        </div>

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
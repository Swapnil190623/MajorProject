import React from 'react';
import { Link } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import ProfileIcon from '../SidePanel/ProfileIcon'
import GridViewOutlinedIcon from '@mui/icons-material/GridView';
import FolderCopyOutlinedIcon from '@mui/icons-material/FolderCopyOutlined';
import TaskOutlinedIcon from '@mui/icons-material/TaskOutlined';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import FeedOutlinedIcon from '@mui/icons-material/FeedOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import ContactSupportOutlinedIcon from '@mui/icons-material/ContactSupportOutlined';
import LoginOutlinedIcon from '@mui/icons-material/LoginOutlined';


export default function SidePanel({ darkMode }) {

  return (
    <div className={`fixed flex flex-col top-0 left-0 w-[20%] h-full z-10 ${darkMode ? 'bg-gray-900' : 'bg-white'}`}>
      
      <div>
        <img src="" alt="" />
        <h1 className={`text-2xl font-bold ml-2 mt-5 mb-10 ${darkMode ? 'bg-gray-900' : 'bg-white'}`}>Freelby</h1>
      </div>

      <nav>
        <NavLink
          to="/dashboard"
          className={({ isActive }) =>
              isActive
                  ? `${darkMode ? 'text-white hover:bg-gray-200' : 'text-purple-700 bg-purple-100 rounded-md'} block py-2 px-4 pl-7 mt-4 text-lg text-left font-medium`
                  : `${darkMode ? 'text-gray-400 hover:bg-gray-700' : 'text-gray-600 hover:bg-gray-200'} block py-2 px-4 pl-7 mt-4 text-lg text-left font-medium rounded-md`
          }
        >
          <GridViewOutlinedIcon className="mr-3"/>
          Dashboard
        </NavLink>

        <NavLink
          to="/project/all-projects"
          className={({ isActive }) =>
              isActive
                  ? `${darkMode ? 'text-white hover:bg-gray-200' : 'text-purple-700 bg-purple-100 rounded-md'} block py-2 px-4 pl-7 mt-4 text-lg text-left font-medium`
                  : `${darkMode ? 'text-gray-400 hover:bg-gray-700' : 'text-gray-600 hover:bg-gray-200'} block py-2 px-4 pl-7 mt-4 text-lg text-left font-medium rounded-md`
          }
        >
          <FeedOutlinedIcon className="mr-3"/>
          Projects
        </NavLink>

        <NavLink
          to="/task/all-tasks"
          className={({ isActive }) =>
              isActive
                  ? `${darkMode ? 'text-white hover:bg-gray-200' : 'text-purple-700 bg-purple-100 rounded-md'} block py-2 px-4 pl-7 mt-4 text-lg text-left font-medium`
                  : `${darkMode ? 'text-gray-400 hover:bg-gray-700' : 'text-gray-600 hover:bg-gray-200'} block py-2 px-4 pl-7 mt-4 text-lg text-left font-medium rounded-md`
          }
        >
          <TaskOutlinedIcon className="mr-3"/>
          Tasks
        </NavLink>

        <NavLink
          to="/document/all-documents"
          className={({ isActive }) =>
              isActive
                  ? `${darkMode ? 'text-white hover:bg-gray-200' : 'text-purple-700 bg-purple-100 rounded-md'} block py-2 px-4 pl-7 mt-4 text-lg text-left font-medium`
                  : `${darkMode ? 'text-gray-400 hover:bg-gray-700' : 'text-gray-600 hover:bg-gray-200'} block py-2 px-4 pl-7 mt-4 text-lg text-left font-medium rounded-md`
          }
        >
          <FolderCopyOutlinedIcon className="mr-3"/>
          Documents
        </NavLink>

        <NavLink
          to="/calender"
          className={({ isActive }) =>
              isActive
                  ? `${darkMode ? 'text-white hover:bg-gray-200' : 'text-purple-700 bg-purple-100 rounded-md'} block py-2 px-4 pl-7 mt-4 text-lg text-left font-medium`
                  : `${darkMode ? 'text-gray-400 hover:bg-gray-700' : 'text-gray-600 hover:bg-gray-200'} block py-2 px-4 pl-7 mt-4 text-lg text-left font-medium rounded-md`
          }
        >
          <CalendarMonthOutlinedIcon className="mr-3"/>
          Calendar
        </NavLink>

        <NavLink
          to="/settings"
          className={({ isActive }) =>
              isActive
                  ? `${darkMode ? 'text-white hover:bg-gray-200' : 'text-purple-700 bg-purple-100 rounded-md'} block py-2 px-4 pl-7 mt-4 text-lg text-left font-medium`
                  : `${darkMode ? 'text-gray-400 hover:bg-gray-700' : 'text-gray-600 hover:bg-gray-200'} block py-2 px-4 pl-7 mt-4 text-lg text-left font-medium rounded-md`
          }
        >
          <SettingsOutlinedIcon className="mr-3"/>
          Settings
        </NavLink>

        <NavLink
          to="/support"
          className={({ isActive }) =>
              isActive
                  ? `${darkMode ? 'text-white hover:bg-gray-200' : 'text-purple-700 bg-purple-100 rounded-md'} block py-2 px-4 pl-7 mt-4 text-lg text-left font-medium`
                  : `${darkMode ? 'text-gray-400 hover:bg-gray-700' : 'text-gray-600 hover:bg-gray-200'} block py-2 px-4 pl-7 mt-4 text-lg text-left font-medium rounded-md`
          }
        >
          <ContactSupportOutlinedIcon className="mr-3"/>
          Support
        </NavLink>

        <NavLink
          to="/logout"
          className={({ isActive }) =>
              isActive
                  ? `${darkMode ? 'text-white hover:bg-gray-200' : 'text-purple-700 bg-purple-100 rounded-md'} block py-2 px-4 pl-7 mt-4 text-lg text-left font-medium`
                  : `${darkMode ? 'text-gray-400 hover:bg-gray-700' : 'text-gray-600 hover:bg-gray-200'} block py-2 px-4 pl-7 mt-4 text-lg text-left font-medium rounded-md`
          }
        >
          <LoginOutlinedIcon className="mr-3"/>
          Log out
        </NavLink>
      </nav>

      <div className="mt-28">
        <ProfileIcon/>
      </div>
    </div>
  );
};
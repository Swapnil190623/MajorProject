import { Outlet } from 'react-router-dom';
import './App.css'
import { useDispatch, useSelector } from 'react-redux';
import { toggleDarkMode } from './store/themeSlice';
import SidePanel from "./components/SidePanel/SidePanel"
import Header from './components/Header/Header';
import { useEffect, useState } from 'react';
import { currentUser } from './store/userSlice';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const App = () => {
  const dispatch = useDispatch();
  const isDarkMode = useSelector((state) => state.theme.isDarkMode);
  // State to track authentication status
  // const isAuthenticated = localStorage.getItem('isAuthenticated')
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  // console.log(isAuthenticated);


  const handleToggleDarkMode = () => {
    dispatch(toggleDarkMode());
  };

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) {
      dispatch(currentUser(storedUser));
    }
  }, [])
  // const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/v1/users/current-user`)

  return (
    <>
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'}`}>
      {/* Show SidePanel and Header only if the user is logged in */}
      {/* {isAuthenticated && (
        <>
          <SidePanel darkMode={isDarkMode} />
          <Header darkMode={isDarkMode} toggleDarkMode={handleToggleDarkMode} />
        </>
      )} */}
      {/* Main Content */}
      <ToastContainer />
      <Outlet/>
    </div>
    </>
  );
};


export default App

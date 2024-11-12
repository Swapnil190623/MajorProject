import { Outlet } from 'react-router-dom';
import './App.css'
import { useDispatch, useSelector } from 'react-redux';
import { toggleDarkMode } from './store/themeSlice';
import SidePanel from "./components/SidePanel/SidePanel"
import Header from './components/Header/Header';
import { useEffect } from 'react';
import { currentUser } from './store/userSlice';


const App = () => {
  const dispatch = useDispatch();
  const isDarkMode = useSelector((state) => state.theme.isDarkMode);

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
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'}`}>
      {/* Sidebar */}
      <SidePanel darkMode={isDarkMode} />

      {/* Header */}
      <Header darkMode={isDarkMode} toggleDarkMode={handleToggleDarkMode} />

      {/* Main Content */}
      <Outlet/>
    </div>
  );
};


export default App

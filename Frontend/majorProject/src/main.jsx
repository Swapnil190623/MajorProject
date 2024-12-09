import React from 'react';
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux';
import store from './store/store.js';
import Dashboard from './pages/Dashboard/Dashboard.jsx';
import AllProject from './pages/Projects/AllProject.jsx'
import SingleProject from './pages/Projects/SingleProject.jsx';
import CreateNewProject from './pages/Projects/CreateNewProject.jsx';
import Login from './pages/Login and Register/Login.jsx';
import Register from './pages/Login and Register/Register.jsx';
import LandingPage from './pages/Landing/LandingPage.jsx';
import AllTask from './pages/Tasks/AllTask.jsx'
import CreateNewTask from './pages/Tasks/CreateNewTask.jsx';
import AllDocument from './pages/Documents/AllDocument.jsx';
import Profile from './pages/Profile/Profile.jsx';
import Calender from './pages/Calender/Calender.jsx';
// import VideoPage from './pages/Meeting/VideoPage.jsx';
import LinksPage from './pages/Links/LinksPage.jsx';


const router = createBrowserRouter([
  {
    path : "/",
    element : <App/>,
    children : 
    [
      {
        path : "",
        // element : <Dashboard/>
        element : <LandingPage/>
      },
      {
        path : "/user/login",
        element : <Login/>
      },
      {
        path : "/user/register",
        element : <Register/>
      },
      {
        path : "/dashboard",
        element : <Dashboard/>
      },
      {
        path : "/project/:projectId",
        element : <SingleProject/>
      },
      {
        path : "/project/all-projects",
        element : <AllProject/>
      },
      {
        path : "/project/create-new-project",
        element : <CreateNewProject/>
      },
      {
        path : "/task/all-tasks",
        element : <AllTask/>
      },
      {
        path : "/task/:projectId/create-new-task",
        element : <CreateNewTask/>
      },
      {
        path : "/document/all-documents",
        element : <AllDocument/>
      },
      {
        path : "/profile",
        element : <Profile/>
      },
      {
        path : "/schedule",
        element : <Calender/>
      },
      {
        path : "/room/:id",
        element : <VideoPage/>
      },
      {
        path : "/links",
        element : <LinksPage/>
      }
    ]
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router}/>
    </Provider>
  </React.StrictMode>,
);
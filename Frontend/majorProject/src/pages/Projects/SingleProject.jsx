import { React, useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from "react-router-dom";
import { startLoading, stopLoading } from '@/store/loadingSlice';
// import { addTask, deleteTask, updateTask, toggleComplete } from "../../store/taskSlice";
import TaskForm from "@/components/Tasks/TaskForm";
import TaskItem from "@/components/Tasks/TaskItem";
import { Skeleton } from '@mui/material';
import BlurFade from '@/components/ui/blur-fade';
import ShimmerButton from '@/components/ui/shimmer-button';
import GradualSpacing from "@/components/ui/gradual-spacing";
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import AttachMoneyOutlinedIcon from '@mui/icons-material/AttachMoneyOutlined';
import TeamMembersCards from "@/components/Dashboard/TeamMembersCards";
import DocumentCard from "@/components/Dashboard/DocumentCard";
import ShinyButton from "@/components/ui/shiny-button";
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import ProjectDetailForm from "@/components/Projects/ProjectDetailForm";
import { fetchProjectById, updateProject } from "@/store/projectSlice";
import axios from "axios";
import api from "@/api/api";
import formatDate from "@/lib/FormatDate";
import { useNavigate } from "react-router-dom";
import TaskMiniCard from "@/components/Tasks/TaskMiniCard";
import { NavLink } from "react-router-dom";
import { toast } from "react-toastify";


export default function SingleProject() {

    const darkMode = useSelector((state) => state.theme.isDarkMode);
    const isLoading = useSelector((state) => state.loading.isLoading);

    const [tasks, setTasks] = useState([]);

    const dispatch = useDispatch();
    const [status, setStatus] = useState('');

    // const [isModalOpen, setIsModalOpen] = useState(false);
    const [activeDropdown, setActiveDropdown] = useState(null);

    const { projectId } = useParams(); 
    const [project, setProject] = useState(null);

    const [file, setFile] = useState(null);
    const navigate = useNavigate();
    const [fetchedFiles, setFetchedFiles] = useState([]);

    const [users, setUsers] = useState([]); // All users fetched from the backend
    const [selectedUsers, setSelectedUsers] = useState([]); // Selected team members for the dropdown
    const [dropdownOpen, setDropdownOpen] = useState(false); // drop down of team members


    // console.log(projectId)
    // Toggle function to handle opening/closing of dropdowns
    const handleDropdown = (dropdownName) => {
        setActiveDropdown(activeDropdown === dropdownName ? null : dropdownName);
    };

    // // Function to close dropdown when clicking outside
    // const handleClickOutside = (event) => {
    //     if (!event.target.closest('.dropdown') && !event.target.closest('.btn-action')) {
    //     setActiveDropdown(null);
    //     }
    // };
 
    
    // Status
    const handleChange = (event) => {
        setStatus(event.target.value);
    };

    const handleFileInputChange = (e) => {
        setFile(e.target.files[0]); // Storing the selected file in state
    };

    // Expanded page
    // const handleOpenModal = () => {
    //   setIsModalOpen(true);  
    // };

    // const handleCloseModal = () => {
    //     setIsModalOpen(false);
    // }

    useEffect(() => {
        const fetchProjectById = async () => {
            try {
                // Start loading when component mounts
                dispatch(startLoading());
                // Fetch project
                const response = await api.get(`/project/${projectId}`, { withCredentials: true });
                // console.log(response.data.data);
                setProject(response.data.data);
                // dispatch(updateRecentlyAccessedProject(response.data.data));
                localStorage.setItem('recentlyAccessedProject', JSON.stringify(response.data.data));
            }
            catch (error) {
                // console.log(`Error : ${error}`);
                alert("Project is unavailable");
            }
            finally {
                dispatch(stopLoading());
            }
        }

        fetchProjectById();

        const fetchFilesByProject = async () => {
            try {
                const response = await api.get(`/file/get-file/${projectId}`, { withCredentials : true});
                // console.log(response.data.data);
                setFetchedFiles(response.data.data);
                return response.data.data; 
            } catch (error) {
                // console.log(`Error : ${error}`) 
                setFetchedFiles([]);  
            }
        }

        fetchFilesByProject();

        const fetchTasksByProject = async () => {
            try {
                const response = await api.get(`/task/get-task/${projectId}`, { withCredentials : true});
                // console.log(response.data.data);
                setTasks(response.data.data);
                return response.data.data; 
            } catch (error) {
                // console.log(`Error : ${error}`)  
                setTasks([]); 
            }
        }
      
        fetchTasksByProject();
    }, [projectId]);

    const handleUploadDocs = async(e) => {
            e.preventDefault();

            if (!file) {
                alert('No file selected');
                return;
            }

            const formData = new FormData();
            formData.append("file", file); // Append the file to FormData  
            
            const token = localStorage.getItem('token');
 
        try {
            const response = await api.post(`/file/upload-file/${project._id}`, formData, {headers: {Authorization: `Bearer ${token}`, "Content-Type": "multipart/form-data",}}, { withCredentials : true })
            // console.log(response.data.data);
            // alert("File Uploaded successfully!")
            toast.success("File uploaded successfully!");
            return response.data.data;
        }
        catch (error) {
            // console.log(`Error : ${error}`)
            toast.error("Error uploading file");
        }
    }

    // console.log(project._id)

    const handleProjectDelete = async () => {
        const isConfirmed = window.confirm('Are you sure you want to delete this project?');
        if (!isConfirmed) return;

        try {
            const response = await api.delete(`/project/${project._id}`, { withCredentials : true});
            // console.log(response.data.data);
            navigate('/project/all-projects');
            // alert("Project deleted successfully");
            toast.success("Project deleted successfully");
            return response.data.data;
        }
        catch (error) {
            // console.log(`Error : ${error}`);
            toast.error("Error deleting project");
        }

        try {
            const response = await api.delete(`/task/delete-by-project-id/${project._id}`, { withCredentials : true});
            // console.log(response.data.data);
            return response.data.data;
        }
        catch (error) {
            console.log(`Error : ${error}`);
        }

        try {
            const response = await api.delete(`/file/delete-by-project-id/${project._id}`, { withCredentials : true});
            // console.log(response.data.data);
            return response.data.data;
        }
        catch (error) {
            console.log(`Error : ${error}`);
        }
    }

    const handleProjectUpdate = async (e) => {
        e.preventDefault();

        try {
            const response = await api.patch(`/project/${project._id}`, project, { withCredentials : true});
            // console.log(response.data.data);
            // alert("Project updated successfully")
            toast.success("Project updated successfully!");
            setProject(response.data.data)

            // const assignTeamMembers = async () => {

                console.log(selectedUsers);
                
                try {
                    const response = await api.patch(`/project/assign/team-members/${projectId}`, {teamMembers: selectedUsers}, { withCredentials: true });
                    console.log(response.data.data);
                    toast.success("Team members assigned successfully!");
                    setSelectedUsers([]); // Clear selection after successful submission
                    setDropdownOpen(false); // Close dropdown
                    return response.data.data;
                } catch (error) {
                    toast.error("Error assigning team members");
                }
            // };

            return response.data.data;
        } catch (error) {
            // console.log(`Error : ${error}`);
            toast.error("Error updating project");
        }
        // dispatch(updateProject(project._id, project))
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setProject((prevProject) => ({
            ...prevProject,
            [name]: value,
        }));
    }

     // Fetch users for dropdown
     useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await api.get("/users", { withCredentials: true });
                // console.log(response.data.data);
                setUsers(response.data.data); // Assuming the backend returns a `data` array
            } catch (error) {
                toast.error("Error fetching users");
            }
        };

        fetchUsers();
    }, []);

    // Handle dropdown toggle
    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };

    // Handle user selection
    const handleUserSelection = (email) => {
        if (selectedUsers.includes(email)) {
          setSelectedUsers(selectedUsers.filter((selectedEmail) => selectedEmail !== email));
        } else {
          setSelectedUsers([...selectedUsers, email]);
        }
    };

    // Submit selected team members
    

    const handleAddTask = async() => {
        navigate(`/task/${projectId}/create-new-task`)
    }

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (!project) {
        return <h1>Project not found</h1>;
    }

    // if(tasks.length === 0) {
    //     return <h1>No Tasks!</h1>
    // }

    // if(fetchedFiles.length === 0) {
    //     return <h1>No Files!</h1>
    // }

    const formattedDeadline = formatDate(project.deadline);
    const formattedStartDate = formatDate(project.createdAt)
    // console.log(project.deadline);
    // console.log(formattedDeadline)

    return (
        <>
            <div className={`absolute left-[304px] top-[64px] w-[80%] h-fit p-5 z-0 ${darkMode ? 'bg-gray-800 text-white' : 'bg-gray-50'}`}>
                {isLoading ? (
                    <div className="skeleton-container">
                        <div>
                            <div className="flex justify-between p-4">
                                <Skeleton variant="text" width="60%" /> 

                                <div className="flex gap-4"> 
                                    <Skeleton variant="rounded" width={120} height={40} />
                                    <Skeleton variant="rounded" width={120} height={40} />
                                </div>
                            </div>

                            <div className="w-full flex">
                                <div className="w-8/12 mr-12">
                                    <Skeleton variant="text" width="30%" /> 

                                    <div className="w-[600px] flex mt-4 just justify-between">
                                        {/* Budget */}
                                        <div className="flex items-center">
                                            <div className="w-[40px] h-[40px] mr-3 rounded-lg">
                                                <Skeleton variant="rounded" height="100%"/>
                                            </div>
                                            <div className="text-left w-[80px]">
                                                <Skeleton variant="text" width="100%"/>
                                                <Skeleton variant="text" width="100%"/>
                                            </div>
                                        </div>

                                        {/* Start Date */}
                                        <div className="flex items-center">
                                            <div className="w-[40px] h-[40px] mr-3 rounded-lg">
                                                <Skeleton variant="rounded" height="100%"/>
                                            </div>
                                            <div className="text-left w-[80px] ">
                                                <Skeleton variant="text" width="100%"/>
                                                <Skeleton variant="text" width="100%"/>
                                            </div>
                                        </div>

                                        {/* End Date */}
                                        <div className="flex items-center">
                                            <div className="w-[40px] h-[40px] mr-3 rounded-lg">
                                                <Skeleton variant="rounded" height="100%"/>
                                            </div>
                                            <div className="text-left w-[80px]">
                                                <Skeleton variant="text" width="100%"/>
                                                <Skeleton variant="text" width="100%"/>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Description */}
                                    <div className="mt-10">
                                        <Skeleton variant="text" width="30%" /> 
                                        <Skeleton variant="rectangular" width="500px" height="100px" />
                                    </div>

                                    {/* Tasks */}
                                    <div className="mt-20">
                                        <Skeleton variant="text" width="30%" /> 
                                        <Skeleton variant="text" width="60%" />
                                        <Skeleton variant="text" width="60%" />
                                        <Skeleton variant="text" width="60%" />
                                        <Skeleton variant="text" width="60%" />
                                        <Skeleton variant="text" width="60%" />
                                    </div>

                                    {/* Buttons */}
                                    <div className="mt-20">
                                        <div className="flex justify-around items-end">
                                            <Skeleton variant="rounded" width={200} height={30} />
                                            <Skeleton variant="rounded" width={200} height={30} />
                                            <Skeleton variant="rounded" width={200} height={30} />
                                        </div>
                                    </div>
                                </div>

                                {/* Team members and Documents */}
                                <div className="w-1/12 mt-5">
                                    {/* <Skeleton variant="rounded" width={330} height={350} className="mb-5"/> */}
                                    <Skeleton variant="rounded" width={330} height={350}/>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <BlurFade>
                        <div className="mt-5">
                            <div className="flex justify-between p-4">
                                <GradualSpacing className="text-left text-2xl font-semibold" text={project.name}/>

                                <div className="flex gap-4"> 

                                    {/* <div className="flex items-center gap-4">
                                        <div className="relative">
                                            <button
                                                onClick={toggleDropdown}
                                                className={`text-white px-3 py-1 rounded hover ${darkMode ? 'bg-sky-900 hover:bg-sky-950' : 'bg-sky-600 hover:bg-sky-700'}`}
                                            >
                                                Assign Team Members
                                            </button>

                                            {dropdownOpen && (
                                                <div
                                                    className={`absolute right-0 mt-2 w-64 bg-white shadow-lg rounded-md p-4 z-10 ${
                                                        darkMode ? "bg-gray-800 text-white" : "bg-white"
                                                    }`}
                                                >
                                                    <p className="font-semibold mb-2">Select Team Members</p>
                                                    <div className="max-h-48 overflow-y-auto">
                                                        {users.map((user) => (
                                                            <div key={user._id} className="flex items-center mb-2">
                                                                <input
                                                                    type="checkbox"
                                                                    id={user._id}
                                                                    value={user._id}
                                                                    checked={selectedUsers.includes(user.email)}
                                                                    onChange={() => handleUserSelection(user.email)}
                                                                    className="mr-2"
                                                                />
                                                                <label htmlFor={user._id}>
                                                                    {user.name} ({user.email})
                                                                </label>
                                                            </div>
                                                        ))}
                                                    </div>
                                                    <button
                                                        onClick={assignTeamMembers}
                                                        className="mt-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                                                    >
                                                        Assign
                                                    </button>
                                                </div>
                                            )}
                                        </div> 
                                    </div> */}

                                    <Box sx={{ minWidth: 100 }}> 
                                        <FormControl fullWidth>
                                            <InputLabel id="demo-simple-select-label">Status</InputLabel>
                                            <Select
                                            sx={{}}
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            value={status}
                                            label="Status"
                                            onChange={handleChange}
                                            >
                                            <MenuItem value={10}>Pending</MenuItem>
                                            <MenuItem value={20}>In-progress</MenuItem>
                                            <MenuItem value={30}>Completed</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </Box>

                                    <Link to="/project/create-new-project">
                                        <ShimmerButton className="w-[120px] h-[40px] text-sm">Add Project</ShimmerButton>  
                                    </Link>
                                </div>
                            </div>
                            <div className="w-full flex">
                                <div className="w-8/12 mr-12">
                                    <p className="text-gray-500 text-left mt-4">DETAILS</p>
                                    <div className="w-[600px] flex mt-4 just justify-between">

                                        {/* Budget */}
                                        <div className="flex items-center">
                                            <div className="w-[40px] h-[40px] bg-green-100 mr-3 rounded-lg">
                                                <AttachMoneyOutlinedIcon className="text-green-700 mt-2"/>
                                            </div>
                                            <div className="text-left ">
                                                <p className="font-medium text-sm text-gray-500 mb-1">Budget</p>
                                                <p className="text-[15px] font-medium">{project.budget}</p>
                                            </div>
                                        </div>

                                        {/* Start Date */}
                                        <div className="flex items-center">
                                            <div className="w-[40px] h-[40px] bg-blue-100 mr-3 rounded-lg">
                                                <AttachMoneyOutlinedIcon className="text-blue-600 mt-2"/>
                                            </div>
                                            <div className="text-left ">
                                                <p className="font-medium text-sm text-gray-500 mb-1">Start Date</p>
                                                <p className="text-[15px] font-medium">{formattedStartDate}</p>
                                            </div>
                                        </div>

                                        {/* End Date */}
                                        <div className="flex items-center">
                                            <div className="w-[40px] h-[40px] bg-orange-100 mr-3 rounded-lg">
                                                <AttachMoneyOutlinedIcon className="text-orange-500 mt-2"/>
                                            </div>
                                            <div className="text-left ">
                                                <p className="font-medium text-sm text-gray-500 mb-1">End Date</p>
                                                <p className="text-[15px] font-medium">{formattedDeadline}</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div>
                                        <p className="text-gray-500 text-left mt-10 mb-4">DESCRIPTION</p>
                                        <p className="text-justify text-sm">{project.description}</p>
                                    </div>

                                    <div className="mt-10">
                                        <div className="flex items-center justify-between">
                                            <p className="text-gray-500 text-left mt-10">TASKS</p>
                                            <Link to={`/task/${projectId}/create-new-task`}>
                                                <ShimmerButton className="w-[100px] h-[30px] text-sm">Add Task</ShimmerButton>  
                                            </Link>
                                        </div>
                                        <div className="py-8">
                                            <div className={`w-full max-w-xl shadow-md rounded-lg px-4 py-3 ${darkMode ? 'bg-gray-600 text-white' : 'bg-blue-100'}`}>
                                                {/* <div className="mb-4">
                                                     Task form goes here 
                                                    <TaskForm />
                                                </div> */}

                                                {tasks.length === 0 ? <p>No Tasks</p> :
                                                    (<div className="flex flex-wrap gap-y-3">
                                                        {/* Loop and display TaskItem */}
                                                        {tasks.map((task) => (
                                                            <div key={task._id} className="w-full">
                                                                <TaskMiniCard
                                                                    task={task}
                                                                />
                                                            </div>
                                                        ))}
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                    {/* <div className="mt-20">
                                        <div className="flex justify-around items-end">
                                            <Button variant="contained" onClick={handleOpenModal}>
                                                Update Project
                                            </Button>
                                        
                                            <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-60">
                                                <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-xl md:w-2/3 lg:w-1/2">
                                                    <p>Update Project</p>
                                                </div>
                                            </div> 

                                            <Button variant="outlined" startIcon={<DeleteIcon />}>
                                                Delete Project
                                            </Button>
                                        </div>
                                    </div> */}

                                    <hr className="mt-8 mb-16"/>

                                    {/* Buttons - update, upload, delete */}
                                    <div className="flex justify-around">
                                        <button 
                                            className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-cyan-500 to-blue-500 group-hover:from-cyan-500 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-cyan-200 dark:focus:ring-cyan-800"
                                            onClick={() => handleDropdown('update')}
                                        >
                                            <span className="relative px-14 py-2 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                                                Update Project
                                            </span>
                                        </button>

                                        <button 
                                            className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-cyan-500 to-blue-500 group-hover:from-cyan-500 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-cyan-200 dark:focus:ring-cyan-800"
                                            onClick={() => handleDropdown('upload')}
                                        >
                                            <span className="relative px-14 py-2 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                                                Upload Documents
                                            </span>
                                        </button>

                                        <button
                                            className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-cyan-500 to-blue-500 group-hover:from-cyan-500 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-cyan-200 dark:focus:ring-cyan-800"
                                            onClick={handleProjectDelete}
                                        >
                                            <span className="relative px-14 py-2 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                                                Delete Project
                                            </span>
                                        </button>
                                    </div>

                                        {/* Dropdown for Update */}
                                        {activeDropdown === 'update' && (
                                            <div className="dropdown max-w-lg mx-auto mt-10 bg-white rounded-lg shadow-lg p-4 z-10">
                                                {/* <ProjectDetailForm/> */}
                                                <form onSubmit={handleProjectUpdate} className="text-left">
                                                    <label htmlFor="projectName" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Project Name</label>
                                                    <input 
                                                        type="text" 
                                                        id="projectName" 
                                                        name="name"
                                                        value={project.name}
                                                        onChange={handleInputChange}
                                                        disabled
                                                        aria-describedby="helper-text-explanation" 
                                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                                                        placeholder="Enter the name of your project"
                                                    />

                                                    <label htmlFor="projectDesc" className="block mb-2 mt-8 text-sm font-medium text-gray-900 dark:text-white">Project Description</label>
                                                    <textarea 
                                                        rows="3" 
                                                        id="projectDesc" 
                                                        name="description"
                                                        value={project.description}
                                                        required
                                                        onChange={handleInputChange}
                                                        aria-describedby="helper-text-explanation" 
                                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                                                        placeholder="Decribe the Project"
                                                    />

                                                    <label htmlFor="projectType" className="block mb-2 mt-8 text-sm font-medium text-gray-900 dark:text-white">Project Type</label>
                                                    <input 
                                                        type="text" 
                                                        id="projectType" 
                                                        name="projectType"
                                                        value={project.projectType}
                                                        onChange={handleInputChange}
                                                        required 
                                                        aria-describedby="helper-text-explanation" 
                                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                                                        placeholder="Type of the Project"
                                                    />

                                                    <label htmlFor="projectBudget" className="block mb-2 mt-8 text-sm font-medium text-gray-900 dark:text-white">Project Budget</label>
                                                    <input 
                                                        type="text" 
                                                        id="projectBudget" 
                                                        name="budget"
                                                        value={project.budget}
                                                        onChange={handleInputChange}
                                                        required
                                                        aria-describedby="helper-text-explanation" 
                                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                                                        placeholder="Budget of the Project"
                                                    />

                                                    <label htmlFor="TaskDeadline" className="block mb-2 mt-8 text-sm font-medium text-gray-900 dark:text-white">Project Deadline</label>
                                                    <input
                                                        type="date"
                                                        name="deadline"
                                                        value={formattedDeadline}
                                                        required
                                                        onChange={handleInputChange}
                                                        className="w-full p-2 border border-gray-300 rounded-lg"
                                                    />

                                                    {/* Assign Team Members */}
                                                    <label htmlFor="assignTeamMembers" className="block mb-2 mt-8 text-sm font-medium text-gray-900 dark:text-white">
                                                        Assign Team Members
                                                    </label>
                                                    <div className="bg-gray-50 border border-gray-300 p-3 rounded-lg">
                                                        {users.map((user) => (
                                                        <div key={user._id} className="flex items-center mb-2">
                                                            <input
                                                            type="checkbox"
                                                            id={`user-${user.id}`}
                                                            value={user.email}
                                                            checked={selectedUsers.includes(user.email)}
                                                            onChange={() => handleUserSelection(user.email)}
                                                            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                                                            />
                                                            <label
                                                            htmlFor={`user-${user.id}`}
                                                            className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                                                            >
                                                            {user.name} ({user.email})
                                                            </label>
                                                        </div>
                                                        ))}
                                                    </div>

                                                    <button
                                                    type="submit"
                                                    className="w-full bg-green-500 text-white py-2 px-4 mt-7 rounded-md hover:bg-green-600"
                                                    >
                                                    Save Changes
                                                    </button>
                                                </form> 
                                            </div> 
                                        )}

                                        {/* Dropdown for Upload Docs */}
                                        {activeDropdown === 'upload' && (
                                            <div className="dropdown max-w-lg mx-auto mt-10 bg-white rounded-lg shadow-lg p-4 z-10">
                                            <form onSubmit={handleUploadDocs}>
                                                
                                                <label className="block mb-4 text-sm text-left font-medium text-gray-900 dark:text-white" htmlFor="file_input">Upload file</label>
                                                <input 
                                                    className="block w-full text-sm mb-6 text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" 
                                                    id="file_input" 
                                                    type="file"
                                                    onChange={handleFileInputChange}
                                                />

                                                <hr />

                                                <div className="flex items-center justify-center w-full mt-6">
                                                    <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500">
                                                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                                            {/* <svg class="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                                                            </svg> */}
                                                            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                                                            <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
                                                        </div>
                                                        <input id="dropzone-file" onChange={handleFileInputChange} type="file" className="hidden" />
                                                    </label>
                                                </div> 

                                                <button
                                                type="submit"
                                                className="w-full mt-10 bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600"
                                                >
                                                Upload Files
                                                </button>
                                            </form>
                                            </div>
                                        )}
                                </div>

                                {/* Team Members */}
                                <div className="w-1/12 mt-5">
                                    <div className={`w-[330px] h-[350px] p-4 overflow-y-scroll rounded-xl ${darkMode ? 'bg-gray-700 hover:shadow-lg' : 'bg-white hover:shadow-md'}`} 
                                    style={{scrollbarWidth: 'none'}}
                                    >
                                        <p className="text-left text-xl font-semibold mb-5">Team Members</p>

                                        <div className="flex flex-col items-center">
                                            {project.teamMembers.map((member) => (
                                                <TeamMembersCards key={member._id} teamMember={member}/>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Documents */}
                                    <div className={`w-[330px] h-full p-4 mt-5 overflow-y-scroll rounded-xl ${darkMode ? 'bg-gray-700 hover:shadow-lg' : 'bg-white hover:shadow-md'}`} 
                                    style={{scrollbarWidth: 'none'}}
                                    >
                                        <p className="text-left text-xl font-semibold mb-5">Documents</p>

                                        {fetchedFiles.length === 0 ? <h1>No Documents</h1> : 
                                            <div className="flex flex-col items-center">
                                                {fetchedFiles.map((file) => (
                                                    <DocumentCard key={file._id} document={file}/>
                                                ))}
                                            </div>
                                        }  
                                    </div>
                                </div>
                            </div>
                        </div>
                    </BlurFade>
                )}
            </div>
        </>
    )
}
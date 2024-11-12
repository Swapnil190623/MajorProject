import { React, useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from "react-router-dom";
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
import { fetchProjectById } from "@/store/projectSlice";
import api from "@/api/api";


export default function SingleProject() {

    const darkMode = useSelector((state) => state.theme.isDarkMode);
    const isLoading = useSelector((state) => state.loading.isLoading);
    const tasks = useSelector((state) => state.task.tasks);
    const dispatch = useDispatch();
    const [status, setStatus] = useState('');
    // const [isModalOpen, setIsModalOpen] = useState(false);
    const [activeDropdown, setActiveDropdown] = useState(null);
    const { id } = useParams(); 
    const [project, setProject] = useState(null);


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
                const response = await api.get(`/project/${id}`, { withCredentials: true });
                console.log(response.data.data);
                setProject(response.data.data);
            }
            catch (error) {
                console.log(`Error : ${error}`);
            }
            finally {
                dispatch(stopLoading());
            }
        }

        fetchProjectById();
    }, [id]);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (!project) {
        return <div>Project not found</div>;
    }


    return (
        <>
            <div className={`absolute left-[300px] top-[64px] w-[80%] h-fit p-5 z-0 ${darkMode ? 'bg-gray-800 text-white' : 'bg-gray-50'}`}>
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
                                    <Skeleton variant="rounded" width={330} height={350} className="mb-5"/>
                                    <Skeleton variant="rounded" width={330} height={350}/>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <BlurFade>
                        <div className="">
                            <div className="flex justify-between p-4">
                                <GradualSpacing className="text-left text-2xl font-semibold" text={project.name}/>

                                <div className="flex gap-4"> 
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

                                    <ShimmerButton className="w-[120px] h-[40px] text-sm">Add Project</ShimmerButton>  
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
                                                <p className="text-[15px] font-medium">dd month, yyyy</p>
                                            </div>
                                        </div>

                                        {/* End Date */}
                                        <div className="flex items-center">
                                            <div className="w-[40px] h-[40px] bg-orange-100 mr-3 rounded-lg">
                                                <AttachMoneyOutlinedIcon className="text-orange-500 mt-2"/>
                                            </div>
                                            <div className="text-left ">
                                                <p className="font-medium text-sm text-gray-500 mb-1">End Date</p>
                                                <p className="text-[15px] font-medium">{project.deadline}</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div>
                                        <p className="text-gray-500 text-left mt-10 mb-4">DESCRIPTION</p>
                                        <p className="text-justify text-sm">{project.description}</p>
                                    </div>

                                    <div className="mt-10">
                                        <p className="text-gray-500 text-left mt-10">TASKS</p>
                                        <div className="py-8">
                                            <div className="w-full max-w-2xl shadow-md rounded-lg px-4 py-3 bg-blue-100">
                                                <div className="mb-4">
                                                    {/* Task form goes here */}
                                                    <TaskForm />
                                                </div>

                                                <div className="flex flex-wrap gap-y-3">
                                                    {/* Loop and display TaskItem */}
                                                    {tasks.map((task) => (
                                                        <div key={task.id} className="w-full">
                                                            <TaskItem
                                                                task={task}
                                                            />
                                                        </div>
                                                    ))}
                                                </div>
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
                                            onClick={() => alert("Are you sure, you want to delete this project!")}
                                        >
                                            <span className="relative px-14 py-2 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                                                Delete Project
                                            </span>
                                        </button>
                                    </div>

                                        {/* Dropdown for Update */}
                                        {activeDropdown === 'update' && (
                                            <div className="dropdown max-w-lg mx-auto mt-10 bg-white rounded-lg shadow-lg p-4 z-10">
                                                <ProjectDetailForm/>
                                                <button
                                                type="submit"
                                                className="w-full bg-green-500 text-white py-2 px-4 mt-7 rounded-md hover:bg-green-600"
                                                >
                                                Save Changes
                                                </button>
                                            </div> 
                                        )}

                                        {/* Dropdown for Upload Docs */}
                                        {activeDropdown === 'upload' && (
                                            <div className="dropdown max-w-lg mx-auto mt-10 bg-white rounded-lg shadow-lg p-4 z-10">
                                            <form>
                                                
                                                <label className="block mb-4 text-sm text-left font-medium text-gray-900 dark:text-white" for="file_input">Upload file</label>
                                                <input 
                                                    className="block w-full text-sm mb-6 text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" 
                                                    id="file_input" 
                                                    type="file"
                                                />

                                                <hr />

                                                <div class="flex items-center justify-center w-full mt-6">
                                                    <label for="dropzone-file" class="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500">
                                                        <div class="flex flex-col items-center justify-center pt-5 pb-6">
                                                            {/* <svg class="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                                                            </svg> */}
                                                            <p class="mb-2 text-sm text-gray-500 dark:text-gray-400"><span class="font-semibold">Click to upload</span> or drag and drop</p>
                                                            <p class="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
                                                        </div>
                                                        <input id="dropzone-file" type="file" class="hidden" />
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
                                            <TeamMembersCards/>
                                            <TeamMembersCards/>
                                            <TeamMembersCards/>
                                            <TeamMembersCards/>
                                            <TeamMembersCards/>
                                        </div>
                                    </div>

                                    {/* Documents */}
                                    <div className={`w-[330px] h-[350px] p-4 mt-5 overflow-y-scroll rounded-xl ${darkMode ? 'bg-gray-700 hover:shadow-lg' : 'bg-white hover:shadow-md'}`} 
                                    style={{scrollbarWidth: 'none'}}
                                    >
                                        <p className="text-left text-xl font-semibold mb-5">Documents</p>

                                        <div className="flex flex-col items-center">
                                            <DocumentCard/>
                                            <DocumentCard/>
                                            <DocumentCard/>
                                            <DocumentCard/>
                                        </div>
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
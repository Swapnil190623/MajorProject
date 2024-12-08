import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import TaskCard from '@/components/Tasks/TaskCard.jsx';
import { startLoading, stopLoading } from "@/store/loadingSlice";
import { Skeleton } from '@mui/material';
import BlurFade from '@/components/ui/blur-fade';
import ShimmerButton from '@/components/ui/shimmer-button';
import GradualSpacing from "@/components/ui/gradual-spacing";
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { NavLink } from "react-router-dom";
import { addTask, fetchTasks } from "@/store/taskSlice";
import api from "@/api/api";
import toLowerCaseString from "@/lib/toLowerCaseString";
import NotfoundAnimation from "@/components/NotFoundAnimation";
import SidePanel from "@/components/SidePanel/SidePanel"
import Header from '@/components/Header/Header';


export default function AllTask() {

    const dispatch = useDispatch();
    const darkMode = useSelector((state) => state.theme.isDarkMode);
    const isLoading = useSelector((state) => state.loading.isLoading);
    // const tasks = useSelector((state) => state.tasks.tasks);
    const [tasks, setTasks] = useState([]);
    const [filter, setFilter] = useState('');

    const handleChange = (event) => {
        setFilter(event.target.value);
    };

    const filteredTasks = filter
        ? tasks.filter((task) => toLowerCaseString(task.taskStatus) === toLowerCaseString(filter))
        : tasks;

    useEffect(() => {
        dispatch(startLoading());
        // dispatch(fetchTasks()).finally(() => dispatch(stopLoading())); // Fetch projects from backend
        const fetchTasks = async() => {
            try {
                const response = await api.get('/task/', { withCredentials: true });
                // console.log(response.data.data)
                dispatch(addTask(response.data.data));
                setTasks(response.data.data);
                return response.data.data;
            } catch (error) {
                console.log(`Error : ${error}`)
            }
            finally {
                dispatch(stopLoading());
            }
        }
        fetchTasks()
    }, [dispatch]);


    if(tasks.length === 0) {
        return (
            <div>
                <NotfoundAnimation/>
                <h1 className="mx-auto text-lg ">No Tasks found!</h1>
            </div>
        )
    }

    const handleToggleDarkMode = () => {
        dispatch(toggleDarkMode());
    };
    
    
    return (
    <>
        <SidePanel darkMode={darkMode} />
        <Header darkMode={darkMode} toggleDarkMode={handleToggleDarkMode} />

        <div className={`absolute left-[300px] top-[64px] w-[80%] h-fit p-5 z-0 ${darkMode ? 'bg-gray-800 text-white' : 'bg-gray-50'}`}>
            {isLoading ? (
                <div className="skeleton-container">
                    <Skeleton variant="text" width="60%" />
                </div>
            ) : (
                <BlurFade delay={0.25} inView>
                    <div className="flex justify-between mt-8">
                        <GradualSpacing className="text-left text-3xl font-semibold" text="Tasks" />
                        <div className="flex gap-20 p-4">
                            <Box sx={{ minWidth: 100 }}>
                                <FormControl fullWidth>
                                    <InputLabel id="filter-label">Filter</InputLabel>
                                    <Select
                                        labelId="filter-label"
                                        id="filter"
                                        value={filter}
                                        label="Filter"
                                        onChange={handleChange}
                                    >
                                        <MenuItem value="Pending">Pending</MenuItem>
                                        <MenuItem value="In-progress">In-progress</MenuItem>
                                        <MenuItem value="Completed">Completed</MenuItem>
                                    </Select>
                                </FormControl>
                            </Box>
                            {/* <NavLink to="/task/create-new-task">
                                <ShimmerButton className="w-[120px] h-[40px] text-sm">Add Task</ShimmerButton>  
                            </NavLink> */}
                        </div>
                    </div>

                    <div className="flex flex-wrap gap-10 mt-10">
                        {filteredTasks.map((task) => (
                            <TaskCard key={task._id} task={task} />
                        ))}
                    </div>
                </BlurFade>
            )}
        </div>
        </>
    );
}

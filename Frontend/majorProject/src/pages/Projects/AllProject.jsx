import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchProjects } from "@/store/projectSlice"; // import action for fetching projects
import { addProject } from "@/store/projectSlice";
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
import ProjectCard from "@/components/Projects/ProjectCard";
import { NavLink, useNavigate } from "react-router-dom";
import api from "@/api/api";


export default function AllProject() {

    const dispatch = useDispatch();
    const darkMode = useSelector((state) => state.theme.isDarkMode);
    const isLoading = useSelector((state) => state.loading.isLoading);
    const projects = useSelector((state) => state.projects.projects); // get projects from Redux
    const [filter, setFilter] = useState('');
    // const [projects, setProjects] = useState([]);
    const navigate = useNavigate();

    const handleChange = (event) => {
        setFilter(event.target.value);
    };

    useEffect(() => {
        dispatch(startLoading());
        dispatch(fetchProjects()).finally(() => dispatch(stopLoading())); // Fetch projects from backend
    }, [dispatch]);


    // useEffect(() => {
    //     async function fetchAllProjects() {
    //         try {
    //             const response = await api.get('/project/', { withCredentials: true });
    //             console.log(response.data.data);
    //             setProjects(response.data.data)
    //             dispatch(addProject(response.data.data))
    //         }
    //         catch(error) {
    //             console.log('Error : ', error)
    //         }
    //     }
    //     fetchAllProjects()
    // }, [])

    const filteredProjects = filter
        ? projects.filter((project) => project.status === filter)
        : projects;

    // console.log(projects)

    const handleProjectClick = (projectId) => {
        navigate(`/project/${projectId}`);
    };


    return (
        <div className={`absolute left-[300px] top-[64px] w-[80%] h-auto p-5 z-0 ${darkMode ? 'bg-gray-800 text-white' : 'bg-gray-50'}`}>
            {isLoading ? (
                <div className="skeleton-container">
                    {/* Loading skeleton */}
                    <Skeleton variant="text" width="60%" />
                </div>
            ) : (
                <BlurFade delay={0.25} inView>
                    <div className="flex justify-between mt-8">
                        <GradualSpacing className="text-left text-3xl font-semibold" text="Projects" />
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
                            <NavLink to="/project/create-new-project">
                                <ShimmerButton className="w-[120px] h-[40px] text-sm">Add Project</ShimmerButton>  
                            </NavLink>
                        </div>
                    </div>

                    <div className="flex flex-wrap gap-10 mt-10">
                        {filteredProjects.map((project) => (
                            <ProjectCard 
                                key={project._id} 
                                onClick={() => handleProjectClick(project._id)}
                                project={project} 
                            />
                        ))}
                    </div>
                </BlurFade>
            )}
        </div>
    );
}

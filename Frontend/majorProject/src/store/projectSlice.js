import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import api from '@/api/api';

const initialState = {
    projects: [],
    loading: false,
    error: null,
};

// Async actions to interact with the backend API
export const fetchProjects = createAsyncThunk(
    'projects/fetchProjects',
    async () => {
        try {
            const response = await api.get('/project/', { withCredentials: true });
            // console.log(response.data.data)
            return response.data.data; // Assuming your API returns an array in `data.data`
        } catch (error) {
            throw new Error(error.response?.data || 'Failed to fetch projects');
        }
    }
); // working

export const fetchProjectById = createAsyncThunk(
    'projects/fetchProjectsById',
    async (projectId) => {
        try {
            const response = await api.get(`/${projectId}`, { withCredentials: true });
            console.log(response.data.data);
            return response.data.data;
        } catch (error) {
            throw new Error(error.response?.data || 'Failed to fetch project');
        }
    }
);

export const createProject = createAsyncThunk(
    'projects/createProject',
    async (newProject) => {
        try {
            const response = await api.post('/project/', newProject, { withCredentials: true });
            // console.log(response.data.data);
            return response.data.data;
        } catch (error) {
            throw new Error(error.response?.data || 'Failed to create project');
        }
    }
); // working

export const updateProject = createAsyncThunk(
    'projects/updateProject',
    async ({ projectId, updatedProject }) => {
        try {
            const response = await axios.patch(`${process.env.REACT_APP_API_URL}/projects/${projectId}`, updatedProject);
            return response.data;
        } catch (error) {
            throw new Error(error.response?.data || 'Failed to update project');
        }
    }
);

export const deleteProject = createAsyncThunk(
    'projects/deleteProject',
    async (projectId) => {
        try {
            await axios.delete(`${process.env.REACT_APP_API_URL}/projects/${projectId}`);
            return projectId;
        } catch (error) {
            throw new Error(error.response?.data || 'Failed to delete project');
        }
    }
);

const projectSlice = createSlice({
    name: 'projects',
    initialState,
    reducers: {
        addProject: (state, action) => {
            state.projects.push(action.payload);
        },
    },
    extraReducers: (builder) => {
        builder
            // Fetch all projects
            .addCase(fetchProjects.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchProjects.fulfilled, (state, action) => {
                state.loading = false;
                state.projects = action.payload;
            })
            .addCase(fetchProjects.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })

            // Create project
            .addCase(createProject.pending, (state) => {
                state.loading = true;
            })
            .addCase(createProject.fulfilled, (state, action) => {
                state.loading = false;
                state.projects.push(action.payload);
            })
            .addCase(createProject.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })

            // Update project
            .addCase(updateProject.pending, (state) => {
                state.loading = true;
            })
            .addCase(updateProject.fulfilled, (state, action) => {
                state.loading = false;
                const index = state.projects.findIndex((p) => p.id === action.payload.id);
                if (index !== -1) {
                    state.projects[index] = action.payload;
                }
            })
            .addCase(updateProject.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })

            // Delete project
            .addCase(deleteProject.pending, (state) => {
                state.loading = true;
            })
            .addCase(deleteProject.fulfilled, (state, action) => {
                state.loading = false;
                state.projects = state.projects.filter((p) => p.id !== action.payload);
            })
            .addCase(deleteProject.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    },
});

export const { addProject } = projectSlice.actions;
export default projectSlice.reducer;
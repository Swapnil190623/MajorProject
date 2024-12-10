import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import api from '@/api/api';

const initialState = {
    tasks: [],
    loading: false,
    error: null,
};

// Async actions to interact with the backend API
export const fetchTasks = createAsyncThunk(
    'tasks/fetchTasks',
    async () => {
        try {
            const response = await api.get('/task/', { withCredentials: true });
            console.log(response.data.data);
            return response;
        } catch (error) {
            throw new Error(error.response?.data || 'Failed to fetch tasks');
        }
    }
);

export const createTask = createAsyncThunk(
    'tasks/createTask',
    async (projectId, newTask) => {
        try {
            const response = await api.post(`/task/${projectId}`, newTask, {withCredentials: true});
            return response.data.data;
        } catch (error) {
            throw new Error(error.response?.data || 'Failed to create task');
        }
    }
);

export const updateTask = createAsyncThunk(
    'tasks/updateTask',
    async ({ taskId, updatedTask }) => {
        try {
            const response = await axios.patch(`/api/tasks/${taskId}`, updatedTask);
            return response.data;
        } catch (error) {
            throw new Error(error.response?.data || 'Failed to update task');
        }
    }
);

export const deleteTask = createAsyncThunk(
    'tasks/deleteTask',
    async (taskId) => {
        try {
            await axios.delete(`/api/tasks/${taskId}`);
            return taskId;
        } catch (error) {
            throw new Error(error.response?.data || 'Failed to delete task');
        }
    }
);

export const toggleTaskStatus = createAsyncThunk(
    'tasks/toggleTaskStatus',
    async (taskId) => {
        try {
            const response = await axios.patch(`/api/tasks/update/task-status/${taskId}`);
            return response.data;
        } catch (error) {
            throw new Error(error.response?.data || 'Failed to toggle task status');
        }
    }
);

const taskSlice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {
        addTask: (state, action) => {
            state.tasks.push(action.payload);
        },
    },
    extraReducers: (builder) => {
        builder
            // Fetch all tasks
            .addCase(fetchTasks.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchTasks.fulfilled, (state, action) => {
                state.loading = false;
                state.tasks = action.payload;
            })
            .addCase(fetchTasks.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })

            // Create task
            .addCase(createTask.pending, (state) => {
                state.loading = true;
            })
            .addCase(createTask.fulfilled, (state, action) => {
                state.loading = false;
                state.tasks.push(action.payload);
            })
            .addCase(createTask.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })

            // Update task
            .addCase(updateTask.pending, (state) => {
                state.loading = true;
            })
            .addCase(updateTask.fulfilled, (state, action) => {
                state.loading = false;
                const index = state.tasks.findIndex((t) => t.id === action.payload.id);
                if (index !== -1) {
                    state.tasks[index] = action.payload;
                }
            })
            .addCase(updateTask.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })

            // Delete task
            .addCase(deleteTask.pending, (state) => {
                state.loading = true;
            })
            .addCase(deleteTask.fulfilled, (state, action) => {
                state.loading = false;
                state.tasks = state.tasks.filter((t) => t.id !== action.payload);
            })
            .addCase(deleteTask.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })

            // Toggle task completion status
            .addCase(toggleTaskStatus.pending, (state) => {
                state.loading = true;
            })
            .addCase(toggleTaskStatus.fulfilled, (state, action) => {
                state.loading = false;
                const index = state.tasks.findIndex((t) => t.id === action.payload.id);
                if (index !== -1) {
                    state.tasks[index].isDone = action.payload.isDone;
                }
            })
            .addCase(toggleTaskStatus.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    },
});

export const { addTask } = taskSlice.actions;
export default taskSlice.reducer;
// src/store.js
import { configureStore } from '@reduxjs/toolkit';
import themeReducer from './themeSlice';
import loadingSlice from './loadingSlice';
import projectSlice from './projectSlice'
import taskSlice from './taskSlice';
import fileSlice from './fileSlice';
import invoiceSlice from './invoiceSlice';
import userSlice from './userSlice';

const store = configureStore({
  reducer: {
    theme: themeReducer,
    loading: loadingSlice,
    projects: projectSlice,
    tasks: taskSlice,
    files: fileSlice,
    invoice: invoiceSlice,
    user: userSlice
  },
});

export default store;

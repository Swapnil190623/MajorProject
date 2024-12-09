import { React, useState, useEffect } from "react";
import { useSelector } from "react-redux";

export default function ProjectDetailForm({ onChange }) {

    const darkMode = useSelector((state) => state.theme.isDarkMode);

    const [data, setData] = useState({
        name : '',
        description : '',
        projectType : '',
        assignedBy : '66d803c9eaffbfc139fb3fae',
        budget : '',
        deadline : '',
    });

    // Update parent whenever data changes
    useEffect(() => {
        onChange(data);
    }, [data, onChange]);

    const handleInputChange = (e) => {
        setData({
            ...data,
            [e.target.name]: e.target.value,
        });
    };

    return(
        <form className="max-w-lg mx-auto mt-20 text-left"> 
            <label htmlFor="projectName" className={`block mb-2 text-sm font-medium  dark:text-white ${darkMode ? 'text-white' : 'text-gray-900'}`}>Project Name</label>
            <input 
                type="text" 
                id="projectName" 
                name="name"
                onChange={handleInputChange}
                required 
                aria-describedby="helper-text-explanation" 
                className={`border text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${darkMode ? 'bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500' : 'bg-gray-50 text-gray-900 border-gray-300'}`} 
                placeholder="Enter the name of your project"
            />

            <label htmlFor="projectDesc" className={`block mb-2 mt-8 text-sm font-medium dark:text-white ${darkMode ? 'text-white' : 'text-gray-900'}`}>Project Description</label>
            <textarea 
                rows="3" 
                id="projectDesc" 
                name="description"
                required
                onChange={handleInputChange}
                aria-describedby="helper-text-explanation" 
                className={`border text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${darkMode ? 'bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500' : 'bg-gray-50 text-gray-900 border-gray-300'}`}
                placeholder="Decribe the Project"
            />

            <label htmlFor="projectType" className={`block mb-2 mt-8 text-sm font-medium dark:text-white ${darkMode ? 'text-white' : 'text-gray-900'}`}>Project Type</label>
            <input 
                type="text" 
                id="projectType" 
                name="projectType"
                onChange={handleInputChange}
                required 
                aria-describedby="helper-text-explanation" 
                className={`border text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${darkMode ? 'bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500' : 'bg-gray-50 text-gray-900 border-gray-300'}`}
                placeholder="Type of the Project"
            />

            <label htmlFor="projectBudget" className={`block mb-2 mt-8 text-sm font-medium dark:text-white ${darkMode ? 'text-white' : 'text-gray-900'}`}>Project Budget</label>
            <input 
                type="text" 
                id="projectBudget" 
                name="budget"
                onChange={handleInputChange}
                required
                aria-describedby="helper-text-explanation" 
                className={`border text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${darkMode ? 'bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500' : 'bg-gray-50 text-gray-900 border-gray-300'}`}
                placeholder="Budget of the Project"
            />

            <label htmlFor="TaskDeadline" className={`block mb-2 mt-8 text-sm font-medium dark:text-white ${darkMode ? 'text-white' : 'text-gray-900'}`}>Project Deadline</label>
            <input
                type="date"
                name="deadline"
                required
                onChange={handleInputChange}
                className={`w-full p-2 border rounded-lg ${darkMode ? 'bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500' : 'bg-gray-50 text-gray-900 border-gray-300'}`}
            />
        </form>
    )
}
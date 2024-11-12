import { React, useState, useEffect } from "react";


export default function ClientDetailForm({ onChange }) {
    const [data, setData] = useState({
        name : '',
        userName : '',
        email : '',
    });

    const handleInputChange = (e) => {
        setData({
            ...data,
            [e.target.name]: e.target.value,
        });
    };

    useEffect(() => {
        onChange(data);
    }, [data, onChange]);

    return (
        <>
        <form className="max-w-lg mt-16 mx-auto text-left"> 
            <label htmlFor="clientFullName" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Client Full Name</label>
            <input 
                type="text" 
                id="clientFullName"
                name="name" 
                onChange={handleInputChange}
                required aria-describedby="helper-text-explanation" 
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                placeholder="Enter client's full name"
            />

            <label htmlFor="clientUsername" className="block mb-2 mt-8 text-sm font-medium text-gray-900 dark:text-white">Client Username</label>
            <input 
                type="text" 
                id="clientUsername" 
                name="userName"
                onChange={handleInputChange}
                required aria-describedby="helper-text-explanation" 
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                placeholder="Enter client's username"
            />

            <label htmlFor="projectType" className="block mb-2 mt-8 text-sm font-medium text-gray-900 dark:text-white">Client Email</label>
            <input 
                type="email" 
                id="clientEmail" 
                name="email"
                onChange={handleInputChange}
                required aria-describedby="helper-text-explanation" 
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                placeholder="Enter client's email"
            />
        </form>
        </>
    )
}
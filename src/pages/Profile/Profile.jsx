import React, { useState } from "react";
import { useSelector } from "react-redux";
import GradualSpacing from "@/components/ui/gradual-spacing";
import api from "@/api/api";
import Avatar from '@mui/material/Avatar'
import { toast } from "react-toastify";
import SidePanel from "@/components/SidePanel/SidePanel"
import Header from '@/components/Header/Header';


export default function Profile() {

    const darkMode = useSelector((state) => state.theme.isDarkMode);
    const user = JSON.parse(localStorage.getItem('user'));
    // console.log(user);

    const [updateUser, setUpdatedUser] = useState({
        fullName: user.fullName,
        email: user.email,
    });
    
    const handleProfileUpdate = async (e) => {
        e.preventDefault();
        try {
            const response = await api.patch('/users/update-account', updateUser, { withCredentials: true });
            // console.log(response.data.data);
            toast.success("Profile updated successfully!");
            localStorage.setItem('user', JSON.stringify(response.data.data));
            return response.data.data;
        } catch (error) {
            // console.log(`Error: ${error}`);
            toast.error("Error updating profile");
        }
    };

    const handleChange = async (e) => {
        const { name, value } = e.target;
        setUpdatedUser((prevValue) => ({
            ...prevValue,
            [name]: value,
        }));
    };

    const handleAvatarUpdate = async (file) => {
        try {
            const formData = new FormData();
            formData.append('avatar', file);
            
            const response = await api.patch('/users/avatar', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            localStorage.setItem('user', JSON.stringify(response.data.data));
            // console.log(response.data.data);
            toast.success("Avatar updated successfully!");
            return response.data.data;
        } catch (error) {
            // console.log(`Error: ${error}`);
            toast.error("Error updating avatar");
        }
    };

    const handleToggleDarkMode = () => {
        dispatch(toggleDarkMode());
    };


    return (
        <>
        <SidePanel darkMode={darkMode} />
        <Header darkMode={darkMode} toggleDarkMode={handleToggleDarkMode} />

        <div className={`absolute left-[304px] top-[64px] w-[80%] h-full p-5 z-0 ${darkMode ? 'bg-gray-800 text-white' : 'bg-gray-50'}`}>
            <div className="flex items-start w-full text-left">
                <GradualSpacing className="text-3xl font-semibold mt-10" text="Profile" />
                <div>
                    <Avatar 
                    className="" 
                    sx={{ 
                        width: 150, 
                        height: 150, 
                        display: 'fixed',
                        left: 800,
                        top: -20,
                        border: '4px solid #e8ebe9',
                        boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.4)'
                    }}
                    alt={user.username} 
                    src={user.avatar} 
                    />
                </div>
            </div>
            
            <form
                onSubmit={handleProfileUpdate}
                className="absolute w-[80%] h-full z-0 text-left"
            >
                <div className="w-[50%] mb-5">
                <label
                    htmlFor="fullname"
                    className={`block mb-2 text-sm font-medium dark:text-white ${darkMode ? 'text-white' : 'text-gray-900'}`}
                >
                    Your Full name
                </label>
                <input
                    type="text"
                    id="fullname"
                    name="fullName"
                    value={updateUser.fullName}
                    onChange={handleChange}
                    required
                    className={`border text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${darkMode ? 'bg-gray-600 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500' : 'bg-gray-50 text-gray-900 border-gray-300'}`}
                    placeholder="Enter your full name"
                />
                </div>

                <div className="w-[50%] text-left mb-5 mt-10">
                <label
                    htmlFor="Email"
                    className={`block mb-2 mt-8 text-sm font-medium dark:text-white ${darkMode ? 'text-white' : 'text-gray-900'}`}
                >
                    Your email
                </label>
                <input
                    type="email"
                    id="Email"
                    name="email"
                    value={updateUser.email}
                    onChange={handleChange}
                    required
                    className={`border text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${darkMode ? 'bg-gray-600 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500' : 'bg-gray-50 text-gray-900 border-gray-300'}`}
                    placeholder="name@flowbite.com"
                />
                </div>

                <div className="w-[50%] mb-5 mt-10 text-left">
                <label 
                htmlFor='role' 
                className={`mr-5 ${darkMode ? 'text-white' : ''}`}>Role
                </label>
                <select name="role" id="role" disabled className={`p-2 border rounded-lg ${darkMode ? 'border-gray-500 bg-gray-600' : 'border-gray-300 bg-gray-50'}`}>
                    {/* <option value="client">Client</option>
                    <option value="freelancer">Freelancer</option> */}
                    <option value={user.role}>{user.role}</option>
                </select>
                </div>

                <div className="w-[50%] text-left mb-5 mt-10">
                <label
                    htmlFor="username"
                    className={`block mb-2 mt-8 text-sm font-medium dark:text-white ${darkMode ? 'text-white' : 'text-gray-900'}`}
                >
                    Your username
                </label>
                <input
                    type="text"
                    id="username"
                    name="username"
                    value={user.username}
                    onChange={handleChange}
                    disabled
                    className={`border text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${darkMode ? 'bg-gray-600 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500' : 'bg-gray-50 text-gray-900 border-gray-300'}`}
                    placeholder="Enter your username"
                />
                </div>

                <div className="w-[50%] mb-5 mt-10 text-left">
                <label htmlFor="avatar" className={`block mb-2 mt-8 text-sm font-medium dark:text-white ${darkMode ? 'text-white' : 'text-gray-900'}`}>Your Avatar</label>
                <input 
                    type="file" 
                    name="avatar" 
                    id="avatar" 
                    className={`rounded-lg ${darkMode ? 'bg-gray-600' : ''}`}
                    onChange={(e) => handleAvatarUpdate(e.target.files[0])}
                />
                </div>

                {/* <div className="w-[50%] m-auto mb-5 mt-10">
                <label
                    htmlFor="password"
                    className="block mb-2 text-left text-sm font-medium text-gray-900 dark:text-white"
                >
                    Your password
                </label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    value={f.password}
                    onChange={handleChange}
                    required
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                /> 
                </div> */}
                <button
                type="submit"
                className="text-white mt-10 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                Save Changes
                </button>
            </form>
        </div>
        </>
    )
}
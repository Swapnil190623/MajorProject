import React, { useState } from 'react';
import axios from 'axios';

export default function Register() {
  const [formData, setFormData] = useState({
    fullName: '',
    username: '',
    email: '',
    password: '',
    role: 'client', // Default role
    avatar: null,
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      avatar: e.target.files[0],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    for (const key in formData) {
      data.append(key, formData[key]);
    }
    
    try {
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/users/register`, data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('Registration Successful:', response);
    } catch (error) {
      console.error('Registration Failed:', error.response);
    }
  };

  return (
    <form
    onSubmit={handleSubmit}
    className="absolute left-[300px] top-[64px] w-[80%] h-full p-5 z-0 bg-gray-50"
  >
     <div className="w-[50%] m-auto mb-5 mt-10">
      <label
        htmlFor="fullname"
        className="block mb-2 text-left text-sm font-medium text-gray-900 dark:text-white"
      >
        Your Full name
      </label>
      <input
        type="text"
        id="fullname"
        name="fullName"
        value={formData.fullName}
        onChange={handleChange}
        required
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder="Enter your full name"
      />
    </div>

    <div className="w-[50%] m-auto mb-5 mt-10">
      <label
        htmlFor="Email"
        className="block mb-2 text-left text-sm font-medium text-gray-900 dark:text-white"
      >
        Your email
      </label>
      <input
        type="email"
        id="Email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        required
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder="name@flowbite.com"
      />
    </div>

    <div className="w-[50%] m-auto mb-5 mt-10 text-left">
      <label 
      htmlFor='role' 
      className='mr-5'>Role
      </label>
      <select name="role" id="role" className='p-2 bg-gray-50 border border-gray-300 rounded-lg'>
        <option value="client">Client</option>
        <option value="freelancer">Freelancer</option>
      </select>
    </div>

    <div className="w-[50%] m-auto mb-5 mt-10">
      <label
        htmlFor="username"
        className="block mb-2 text-left text-sm font-medium text-gray-900 dark:text-white"
      >
        Your username
      </label>
      <input
        type="text"
        id="username"
        name="username"
        value={formData.username}
        onChange={handleChange}
        required
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder="Enter your username"
      />
    </div>

    <div className="w-[50%] m-auto mb-5 mt-10 text-left">
      <label htmlFor="avatar" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your Avatar</label>
      <input 
        type="file" 
        name="avatar" 
        id="avatar" 
        className=""
        onChange={handleFileChange}
        />
    </div>

    <div className="w-[50%] m-auto mb-5 mt-10">
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
        value={formData.password}
        onChange={handleChange}
        required
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      />
    </div>
    <button
      type="submit"
      className="text-white text-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
    >
      Register
    </button>
  </form>
  );
};
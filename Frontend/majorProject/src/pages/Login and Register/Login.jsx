import React, { useState } from 'react';
import axios from 'axios';
import api from '@/api/api';
import { useNavigate, NavLink } from 'react-router-dom';
import { currentUser } from '../../store/userSlice'
import { useDispatch } from 'react-redux';


export default function Login() {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('/users/login', formData, { withCredentials: true });
      const user = response.data.data.user;
      // console.log('Login Successful:', user);
      localStorage.setItem('user', JSON.stringify(response.data.data.user));
      localStorage.setItem('token', response.data.data.accessToken); // Store token
      dispatch(currentUser(user)); // not working
      navigate("/dashboard");
    } catch (error) {
      alert(`Login Failed : ${error}`);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="absolute left-[300px] top-[64px] w-[80%] h-full p-5 z-0 bg-gray-50"
    >
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

      <div className="flex items-start w-[50%] m-auto mb-5">
        <div className="flex items-center h-5">
          <input
            id="remember"
            type="checkbox"
            className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800"
          />
        </div>
        <label
          htmlFor="remember"
          className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
        >
          Remember me
        </label>
      </div>

        <button
          type="submit"
          className="text-white text-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Login
        </button>
    </form>
  );
}
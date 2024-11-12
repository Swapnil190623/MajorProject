import { React, useState } from "react";
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import LanguageOutlinedIcon from '@mui/icons-material/LanguageOutlined';
import LowPriorityOutlinedIcon from '@mui/icons-material/LowPriorityOutlined';


export default function SettingsForm({ onChange }) {
    const [formData, setFormData] = useState({});

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        onChange({ ...formData, [name]: value });
    };

    return (
        <div className="max-w-lg mt-16 mx-auto text-left rounded-xl shadow p-5">

            <ul>
                {/* Private */}
                <li className="has-[:checked]:border-blue-700 flex items-center hover:shadow border p-3 rounded-xl">
                    <div className="w-[40px] h-[40px] bg-gray-200 mr-4 rounded-3xl">
                        <LockOutlinedIcon className="text-gray-600 m-2 border"/>
                    </div>
                    <label htmlFor="private" className="text-left">
                        <p className="text-[17px] font-medium text-sm mb-1">Private</p>
                        <p className="text-[14px] text-gray-500">Only users you choose can access</p>
                    </label>
                    <input 
                        id="private" 
                        type="radio" 
                        onChange={handleInputChange}
                        name="project-access" 
                        className="checked:border-blue-500 ml-32 hidden peer" 
                    />
                </li>

                {/* Public */}
                <li className="has-[:checked]:border-blue-700 flex items-center hover:shadow border p-3 mt-5 rounded-xl">
                    <div className="w-[40px] h-[40px] bg-green-100 mr-4 rounded-3xl">
                        <LanguageOutlinedIcon className="text-green-600 m-2"/>
                    </div>
                    <label htmlFor="public" className="text-left">
                        <p className="text-[17px] font-medium text-sm mb-1">Public</p>
                        <p className="text-[14px] text-gray-500">Anyone with the link can access</p>
                    </label>
                    <input 
                        id="public" 
                        type="radio"
                        onChange={handleInputChange} 
                        name="project-access" 
                        className="checked:border-blue-500 ml-36 hidden peer" 
                    />
                </li>
            </ul>

            <div className="text-left mb-4 mt-10">
                    <label htmlFor="priority" className="block mb-2 text-sm font-medium dark:text-white">Project Priority</label>
                    <select 
                        id="priority" 
                        name="priority"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    >
                        <option value="Medium">Medium</option>
                        <option value="High">High</option>
                        <option value="Low">Low</option>
                    </select>
            </div>
        </div>
    )
};
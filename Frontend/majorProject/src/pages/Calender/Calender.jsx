import { React, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import GradualSpacing from "@/components/ui/gradual-spacing";
import api from "@/api/api";
import { toast } from "react-toastify";
import ScheduleCard from "@/components/Schedules/ScheduleCard";
import NotfoundAnimation from "@/components/NotFoundAnimation";


export default function Calender() {

    const darkMode = useSelector((state) => state.theme.darkMode);

    const [schedules, setSchedules] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState({
        title: "",
        date: "",
        time: "",
        description: "",
    });

    const user = JSON.parse(localStorage.getItem('user'));

    const toggleForm = () => setShowForm(!showForm);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async(e) => {
        e.preventDefault();

        const notify = {
            userId : user._id,
            title : 'Schedule added successfully',
            message : 'schedule created'
        }
    
        try {
            const response = await api.post('/schedule/', formData, {withCredentials: true});
            // console.log(response.data.data);
            setFormData({ title: "", date: "", time: "", description: "" });
            setShowForm(false);
            toast.success("Schedule added successfully");
            try {
                const notification = await api.post('/notification/', notify , {withCredentials: true});
                // console.log(notification.data.data);
                return notification.data.data;
            } catch (error) {
                // console.log(`Error: ${error}`);
            }
            // setSchedules([...schedules, formData]);
            return response.data.data;
        } catch (error) {
            console.log(`Error: ${error}`);
            alert("Error creating schedule");
        }    
    };

    useEffect(() => {
        const fetchSchedules = async () => {
            try {
                const response = await api.get('/schedule/', {withCredentials: true});
                // console.log(response.data.data);
                setSchedules(response.data.data);
                return response.data.data;
            } catch (error) {
                
            }
        }
        fetchSchedules();
    }, []);

    // if(schedules.length === 0) {
    //     return (
    //         <div>
    //             <NotfoundAnimation/>
    //             <h1 className="mx-auto text-lg ">No Schedules found!</h1>
    //         </div>
    //     )
    // }

    return (
        <div className={`absolute left-[304px] top-[64px] w-[80%] h-full p-5 z-0 ${darkMode ? 'bg-gray-800 text-white' : 'bg-gray-50'}`}>
            <div className="flex justify-between items-center w-full mt-7 text-left">
                <GradualSpacing className="text-3xl font-semibold" text="Schedule" />
                <button
                    className="bg-blue-500 text-white px-4 py-2 rounded-md shadow hover:bg-blue-600"
                    onClick={toggleForm}
                >
                    {showForm ? "Close Form" : "Add Schedule"}
                </button>
            </div>

                {showForm && (
                <div className="absolute right-0 mt-2 w-96 text-left bg-white border border-gray-200 rounded-lg shadow-lg p-4">
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label
                                htmlFor="title"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Title
                            </label>
                            <input
                                type="text"
                                id="title"
                                name="title"
                                value={formData.title}
                                onChange={handleChange}
                                className="w-full mt-1 p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
                                placeholder="Enter title"
                                required
                            />
                        </div>

                        <div>
                            <label
                                htmlFor="date"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Date
                            </label>
                            <input
                                type="date"
                                id="date"
                                name="date"
                                value={formData.date}
                                onChange={handleChange}
                                className="w-full mt-1 p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
                                required
                            />
                        </div>

                        <div>
                            <label
                                htmlFor="time"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Time
                            </label>
                            <input
                                type="time"
                                id="time"
                                name="time"
                                value={formData.time}
                                onChange={handleChange}
                                className="w-full mt-1 p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
                                required
                            />
                        </div>

                        <div>
                            <label
                                htmlFor="description"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Description
                            </label>
                            <textarea
                                id="description"
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                className="w-full mt-1 p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
                                placeholder="Enter description"
                                rows="3"
                                required
                            ></textarea>
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-green-500 text-white px-4 py-2 rounded-md shadow hover:bg-green-600"
                        >
                            Save Schedule
                        </button>
                    </form>
                </div>
            )}

            {schedules.length === 0 ? 
                <div>
                    <NotfoundAnimation/>
                    <h1 className="mx-auto text-lg ">No Schedules found!</h1>
                </div> : 

                <div className="flex flex-wrap gap-16 mt-16">
                    {/* <div className="mt-6"> */}
                        {schedules.map((schedule) => (
                        <ScheduleCard key={schedule._id} schedule={schedule} />
                        ))}
                    {/* </div> */}
                </div>
            }
        </div>
    )
}
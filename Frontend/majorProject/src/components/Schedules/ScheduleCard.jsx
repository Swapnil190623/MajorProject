import React from "react";
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import formatDate from "@/lib/FormatDate";
import api from "@/api/api";
import { toast } from "react-toastify";

export default function ScheduleCard({ schedule }) {

    // console.log(schedule.date.toString())
    // console.log(formatDate(schedule.date));

    const handleDelete = async (scheduleId) => {
        const isConfirmed = window.confirm('Are you sure you want to delete this schedule?');
        if (!isConfirmed) return;

        try {
          const response = await api.delete(`/schedule/${scheduleId}`, {withCredentials: true});
        //   console.log(response.data.data);
            toast.success("Schedule deleted successfully");
          return response.data.data
        } catch (error) {
          console.error("Error deleting notification:", error);
        }
    };

    return (
        <div className="w-80 bg-white border text-left border-gray-200 rounded-lg shadow-lg p-4 mb-4">
            <h2 className="text-xl font-medium text-sky-500">{schedule.title}</h2>
            <p className="text-gray-700 text-sm mt-1">{schedule.description}</p>
            <div className="flex justify-start items-center mt-4">
                <CalendarMonthOutlinedIcon className="mr-3"/>
                <p className="text-sm text-gray-800">
                    {formatDate(schedule.date)} at {schedule.time}
                </p>
            </div>
            <button
                className="bg-red-500 text-white rounded-lg text-[12px] w-full sm:w-auto px-3 py-1 mt-5"
                onClick={() => handleDelete(schedule._id)}
            >
                Delete Schedule
            </button>
        </div>
    );
}
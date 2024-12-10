import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import api from "@/api/api";


export default function NotificationCard() {

    const darkMode = useSelector((state) => state.theme.isDarkMode);

    const [notifications, setNotifications] = useState([]);
    const user = JSON.parse(localStorage.getItem('user'));

    useEffect(() => {
        const fetchNotifications = async () => {
            try {
                const response = await api.get(`/notification/${user._id}`, {withCredentials: true});
                // console.log(response.data.data);
                setNotifications(response.data.data);
                return response.data.data;
            } catch (error) {
                console.log(`Error: ${error}`);
            }
        }

        fetchNotifications();
    }, [user._id]);

    const handleMarkAsRead = async (notificationId) => {
        try {
          const response = await api.patch(`/notification/${notificationId}`, {withCredentials: true});
          console.log(response.data.data);
          setNotifications((prev) =>
            prev.map((notif) =>
              notif._id === notificationId ? { ...notif, isRead: true } : notif
            )
          );
        } catch (error) {
          console.error(`Error marking as read: ${error}`);
        }
      };
    
      const handleDelete = async (notificationId) => {
        try {
          const response = await api.delete(`/notification/${notificationId}`, {withCredentials: true});
          console.log(response.data.data)
          setNotifications((prev) =>
            prev.filter((notif) => notif._id !== notificationId)
          );
        } catch (error) {
          console.error("Error deleting notification:", error);
        }
      };

    return (
        <div className="">
            <h2 className="m-3 font-semibold mx-auto">Notifications</h2>
            <ul>
                {notifications.map((notif) => (
                  <div key={notif._id} className={`w-full text-sm text-left p-2 border rounded-lg my-2 ${darkMode ? 'border-gray-600' : 'border-gray-300'}`}>
                    <p className="font-medium">{notif.title}</p>
                    <p className="text-gray-500 mb-2">{notif.message}</p>
                    <button 
                      className="bg-blue-500 text-white rounded-lg text-[12px] w-full sm:w-auto px-2 mr-2" 
                      onClick={() => handleMarkAsRead(notif._id)}
                    >
                    Mark as Read
                    </button >
                    <button
                      className="bg-red-500 text-white rounded-lg text-[12px] w-full sm:w-auto px-2"
                      onClick={() => handleDelete(notif._id)}
                    >
                      Delete
                    </button>
                  </div>
                ))}
            </ul>
        </div>
    )
}
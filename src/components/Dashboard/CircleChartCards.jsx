import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { PieChart } from '@mui/x-charts/PieChart';
import api from "@/api/api";


export default function ChartCards() {

    const darkMode = useSelector((state) => state.theme.isDarkMode);
    const recentlyAccessedProject = JSON.parse(localStorage.getItem('recentlyAccessedProject'));
    const [progress, setProgress] = useState({});
    // console.log(recentlyAccessedProject)

    // Calculate total tasks
    const totalTasks = progress.completedTasks + progress.inProgressTasks + progress.pendingTasks;

    // Calculate percentages
    const completedPercentage = Math.round((progress.completedTasks / totalTasks) * 100);
    const inProgressPercentage = Math.round((progress.inProgressTasks / totalTasks) * 100);
    const pendingPercentage = Math.round((progress.pendingTasks / totalTasks) * 100);

    useEffect(() => {
        const fetchprojectProgress = async() => {
            try {
                const response = await api.patch(`/project/update/project-progress/${recentlyAccessedProject._id}`, { withCredentials : true});
                // console.log(response.data.data);
                setProgress(response.data.data);
                return response.data.data;
            } catch (error) {
                console.log(`Error: ${error}`);  
            }
        }

        fetchprojectProgress();
    }, [])

    return(
        <div className={`rounded-2xl ${darkMode ? 'bg-gray-700 text-white hover:shadow-xl' : 'bg-gray-100 hover:shadow-md'}`}
        style={{ width: '450px', height: '300px' }} // Define the width and height of the container
        >
            <PieChart className={`${darkMode ? 'text-white' : 'text-black'}`}
                series={[
                    {
                    data: [  
                        { value: completedPercentage, label: 'Completed'},
                        { value: pendingPercentage, label: 'Pending' },
                        { value: inProgressPercentage, label: 'In-Progress'},
                    ],
                    innerRadius: 60,
                    outerRadius: 100,
                    paddingAngle: 5,
                    cornerRadius: 5,
                    startAngle: -45,
                    endAngle: 225,
                    cx: 150,
                    cy: 150,
                    }
                ]}
            />
        </div>
    )
}
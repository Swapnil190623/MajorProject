import React from "react";
import { LineChart } from '@mui/x-charts/LineChart';
import { useSelector } from "react-redux";


export default function LineChartCards() {

    const darkMode = useSelector((state) => state.theme.isDarkMode);

    return (
        <div className={`w-[550px] h-[300px] rounded-2xl ${darkMode ? 'bg-gray-700 text-white hover:shadow-xl' : 'bg-gray-100 hover:shadow-md'}`}>
            <LineChart
                xAxis={[{ data: [1, 2, 3, 5, 8, 10] }]}
                series={[
                    {
                    data: [2, 5.5, 2, 8.5, 1.5, 5],
                    },
                ]}
                width={550}
                height={300}
            />
        </div>
    )
}
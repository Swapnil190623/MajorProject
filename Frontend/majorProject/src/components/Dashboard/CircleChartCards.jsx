import React from "react";
import { useSelector } from "react-redux";
import { PieChart } from '@mui/x-charts/PieChart';


export default function ChartCards() {

    const darkMode = useSelector((state) => state.theme.isDarkMode);

    return(
        <div className={`w-[550px] h-[300px] rounded-2xl ${darkMode ? 'bg-gray-700 text-white hover:shadow-xl' : 'bg-gray-100 hover:shadow-md'}`}>
            <PieChart className={`${darkMode ? 'text-white' : 'text-black'}`}
                series={[
                    {
                    data: [  
                        { value: 10, label: 'Segment 1' },
                        { value: 30, label: 'Segment 2' },
                        { value: 20, label: 'Segment 3' },
                        { value: 40, label: 'Segment 4' },
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
import React from "react";
import { useSelector } from "react-redux";


export default function LinkCard({ link }) {

    const darkMode = useSelector((state) => state.theme.isDarkMode);

    return (
        <div className={`w-[70%] p-3 text-left rounded-lg shadow-sm hover:shadow-md border-gray-600 ${darkMode ? 'bg-sky-900' : 'bg-sky-100'}`}>
            <p className={`font-semibold mb-2 text-lg ${darkMode ? 'text-white' : 'text-black'}`}>{link.name}</p>
            <a href={link.url} className="text-gray-400">Go to {link.url}</a>
        </div>
    )
}
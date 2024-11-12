import React from "react";
import { useSelector } from "react-redux";
import PictureAsPdfOutlinedIcon from '@mui/icons-material/PictureAsPdfOutlined';

export default function DocumentCard() {

    const darkMode = useSelector((state) => state.theme.isDarkMode);

    return (
        <div className={`flex items-center w-[300px] h-[60px] shadow-md mb-4 pl-3 rounded ${darkMode ? 'bg-gray-600 hover:bg-gray-500' : 'bg-gray-100 hover:bg-gray-200'}`}>
            <PictureAsPdfOutlinedIcon/>
            <div className="ml-5 text-left">
                <p className="text-[16px] font-semibold">Document name</p>
                <p className="text-[13px] text-gray-400">120kb</p>
            </div>
        </div>
    )
}
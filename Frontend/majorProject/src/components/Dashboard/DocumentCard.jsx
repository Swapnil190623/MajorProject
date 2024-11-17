import React from "react";
import { useSelector } from "react-redux";
import PictureAsPdfOutlinedIcon from '@mui/icons-material/PictureAsPdfOutlined';

export default function DocumentCard({ document }) {

    const darkMode = useSelector((state) => state.theme.isDarkMode);

    const formatFileSize = (sizeInBytes) => {
        if (sizeInBytes < 1024) return `${sizeInBytes} bytes`;
        const sizeInKB = sizeInBytes / 1024;
        if (sizeInKB < 1024) return `${sizeInKB.toFixed(2)} KB`;
        const sizeInMB = sizeInKB / 1024;
        return `${sizeInMB.toFixed(2)} MB`;
    };

    const formattedFileSize = formatFileSize(document.size);

    return (
        <div className={`flex items-center w-full h-[70px] shadow-md mb-4 pl-3 rounded ${darkMode ? 'bg-gray-600 hover:bg-gray-500' : 'bg-gray-100 hover:bg-gray-200'}`}>
            <PictureAsPdfOutlinedIcon/>
            <div className="ml-5 py-2 text-left">
                <p className="text-[16px] font-semibold">{document.name}</p>
                <p className="text-[13px] text-gray-400">{formattedFileSize}</p>
                {/* <p className="text-[16px] font-semibold">Document name</p> 
                <p className="text-[13px] text-gray-400">Document size</p> */}
            </div>
        </div>
    )
}
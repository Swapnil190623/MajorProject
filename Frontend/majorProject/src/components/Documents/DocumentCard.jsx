import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Card, CardContent, CardMedia, Typography, Box } from '@mui/material';
import formatDate from "@/lib/FormatDate";
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import ImageIcon from '@mui/icons-material/Image';
import DescriptionIcon from '@mui/icons-material/Description';
import api from "@/api/api";
import { useNavigate } from "react-router-dom";


export default function DocumentCard({ document }) {

    const darkMode = useSelector((state) => state.theme.isDarkMode);

    const { name, file, fileType, size, projectId, date } = document;
    const [projectName, setProjectName] = useState('');
    const navigate = useNavigate();
    const formattedDate = formatDate(date);

    const getDocumentIcon = (fileType) => {
        if (fileType.startsWith('application/pdf')) {
            return <PictureAsPdfIcon style={{ color: '#D32F2F' }} fontSize="large" />;
        } else if (fileType.startsWith('image/')) {
            return <ImageIcon style={{ color: '#4CAF50' }} fontSize="large" />;
        } else if (fileType.startsWith('application/msword') || fileType === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
            return <DescriptionIcon style={{ color: '#1976D2' }} fontSize="large" />;
        } else {
            return <InsertDriveFileIcon style={{ color: '#757575' }} fontSize="large" />;
        }
    };

    const openDocument = () => {
        window.open(file, '_blank');
    };

    useEffect(() => {
    const getProjectName = async() => {
        try {
        const response = await api.get(`/project/${projectId}`, { withCredentials: true });
        // console.log(response.data.data.name);
        setProjectName(response.data.data.name);
        }
        catch (error) {
            console.log(`Error: ${error}`);
        }
    }
    getProjectName();
    },[]);

    const handleDeleteFile = async () => {
        const isConfirmed = window.confirm('Are you sure you want to delete this file?');
        if (!isConfirmed) return;

        try {
            const response = await api.delete(`/file/${document._id}`, { withCredentials : true});
            console.log(response.data.data);
            alert("File deleted successfully");
            // window.location.reload();
            // After successful deletion, fetch the updated file lists
            return response.data.data; 
        }
        catch (error) {
            console.log(`Error : ${error}`);
        }
    }


    return (
        <div className={`p-2 rounded-xl ${darkMode ? 'bg-gray-600' : 'bg-gray-200'}`}>
            <Card 
                onClick={openDocument} // Call onOpen function with document URL
                sx={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    cursor: 'pointer',
                    padding: '6px', 
                    boxShadow: 3,
                    maxWidth: 400,
                }}
            >
                {/* Document icon */}
                <Box sx={{ display: 'flex', width: '50px', height:'30px', alignItems: 'center', padding: '0 16px' }}>
                    {getDocumentIcon(fileType)}
                </Box>
                
                {/* Document details */}
                <CardContent sx={{ flex: '1 1 auto', textAlign: 'left' }}>
                    <Typography variant="h6" component="div" sx={{marginBottom: '10px'}}>
                        {name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Project: {projectName}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Size: {size}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Date: {formattedDate}
                    </Typography>
                </CardContent>
            </Card>
            <button onClick={handleDeleteFile} className="mt-5 align-left py-1 px-2 bg-red-400 text-white rounded-lg">
                Delete Document
            </button>
        </div>
    )
}
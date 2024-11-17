import React, { useEffect, useState } from "react";
import GradualSpacing from "@/components/ui/gradual-spacing";
import { useSelector } from "react-redux";
import api from "@/api/api";
import DocumentCard from "@/components/Documents/DocumentCard";
import NotfoundAnimation from "@/components/NotFoundAnimation";


export default function AllDocument() {

    const darkMode = useSelector((state) => state.theme.isDarkMode);
    const [docs, setDocs] = useState([])

    useEffect(() => {
        const fetchDocuments = async () => {
            try {
                const response = await api.get('/file/', {withCredentials: true});
                // console.log(response.data.data);
                setDocs(response.data.data)
                return response.data.data;
            } catch (error) {
                // console.log(`Error : ${error}`);
                alert("Error fetching documents");
            }
        }
        fetchDocuments();
    }, [])

    if(docs.length === 0) {
        return (
            <div>
                <NotfoundAnimation/>
                <h1 className="mx-auto text-lg ">No Documents found!</h1>
            </div>
        )
    }
     
    return (
        <div className={`absolute left-[307px] top-[64px] w-[80%] h-fit p-5 z-0 ${darkMode ? 'bg-gray-800 text-white' : 'bg-gray-50'}`}>
            <div className="flex justify-between mt-8">
                <GradualSpacing className="text-left text-3xl font-semibold" text="Documents" />
            </div>

            <div className="flex flex-wrap gap-10 mt-10">
                {docs.map((doc) => (
                    <DocumentCard 
                        key={doc._id} 
                        document={doc} 
                    />
                ))}
            </div>
        </div>
    )
}
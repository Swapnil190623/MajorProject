import React from "react";
import { useSelector, useDispatch } from "react-redux";
import GradualSpacing from "@/components/ui/gradual-spacing";
import LinkCard from "@/components/Links/LinkCard";
import SidePanel from "@/components/SidePanel/SidePanel"
import Header from '@/components/Header/Header';


export default function LinksPage() {

    const darkMode = useSelector((state) => state.theme.isDarkMode);

    const links = [
        { name: "fiverr", url: "https://www.fiverr.com/" },
        { name: "Upwork", url: "https://www.upwork.com/" },
        { name: "Toptal", url: "https://www.toptal.com/" },
        { name: "Peopleperhour", url: "https://www.peopleperhour.com/" },
    ]

    const handleToggleDarkMode = () => {
        dispatch(toggleDarkMode());
    };

    return (
        <>
        <SidePanel darkMode={darkMode} />
        <Header darkMode={darkMode} toggleDarkMode={handleToggleDarkMode} />

        <div className={`absolute left-[304px] top-[64px] w-[80%] h-fit p-5 z-0 ${darkMode ? 'bg-gray-800 text-white' : 'bg-gray-50'}`}>
            <div className="flex mt-8">
                <GradualSpacing className="text-3xl font-semibold" text="Links" />
            </div>
            <div className="mt-20">
                {links.map((link, index) => (
                    <div className="m-10" key={index}>
                        <LinkCard link={link}/>
                    </div>
                ))}
            </div>
        </div>
        </>
    )
}
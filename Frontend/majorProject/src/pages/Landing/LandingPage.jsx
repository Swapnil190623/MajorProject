import React from "react";
import { NavLink } from "react-router-dom";


export default function LandingPage() {

    return (
        <div className="absolute left-[300px] top-[64px] w-[80%] h-full p-5 z-0 bg-gray-50">
            <NavLink to="/user/login">
                <button>Login</button>
            </NavLink>
            
            <NavLink to="/user/register">
                <button>Register</button>
            </NavLink>
        </div>
    )
}
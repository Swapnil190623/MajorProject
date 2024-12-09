import React from "react"
import Lottie from "lottie-react"
import successAnimation from "./../../assets/successAnimation.json"


export default function FinishProject() {

    return (
        <div className="max-w-lg mt-16 mx-auto text-left rounded-xl shadow p-5">
            <Lottie 
                animationData={successAnimation} 
                loop={false} // Disable looping for a one-time success animation
                style={{ width: 300, height: 300, margin: 'auto' }} // Adjust size as per your design
            />
            <p className="font-semibold text-center mb-10 ">Project Created Successfully!</p>
        </div>
    )
}
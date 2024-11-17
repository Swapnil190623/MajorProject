import React from "react"
import Lottie from "lottie-react"
import NotFoundAnimation from '@/assets/NotFoundAnimation.json'


export default function NotfoundAnimation() {

    return (
        <div>
            <Lottie 
                animationData={NotFoundAnimation} 
                loop={false} // Disable looping for a one-time success animation
                style={{ width: 200, height: 200, margin: 'auto', marginTop: 50 }} // Adjust size as per your design
            />
        </div>
    )
}
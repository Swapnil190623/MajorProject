import { React, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { startLoading, stopLoading } from '@/store/loadingSlice';
import { Skeleton } from '@mui/material';
import BlurFade from '@/components/ui/blur-fade';
import ShimmerButton from '@/components/ui/shimmer-button';
import TypingAnimation from '@/components/ui/typing-animation';
import AccessedCards from '@/components/Dashboard/AccessedCards';
import Marquee from "@/components/ui/marquee";
import CircleChartCards from '@/components/Dashboard/CircleChartCards';
import DocumentCard from '@/components/Dashboard/DocumentCard';
import DailyTaskCards from '@/components/Dashboard/DailyTaskCards';
import TeamMembersCards from '@/components/Dashboard/TeamMembersCards';
import LineChartCards from '@/components/Dashboard/LineChartCards';
import { fetchCurrentUser } from '@/store/userSlice';
import { NavLink } from 'react-router-dom';


export default function Dashboard() {

  const darkMode = useSelector((state) => state.theme.isDarkMode);
  const isLoading = useSelector((state) => state.loading.isLoading);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.currentUser);

  // console.log(user.fullName)

  useEffect(() => {
    // Start loading when component mounts
    dispatch(startLoading());
    // dispatch(fetchCurrentUser()).finally(() => dispatch(stopLoading()));
    

    // Simulate API call or data fetching
    setTimeout(() => {
      dispatch(stopLoading()); // Stop loading when data is fetched
    }, 2000);
  }, [dispatch]);

  return ( 
    <>
      <div className={`absolute left-[300px] top-[64px] w-[80%] h-fit p-5 z-0 ${darkMode ? 'bg-gray-800 text-white' : 'bg-gray-50'}`}>
        {isLoading ? (
          <div className="skeleton-container">

            <div className="flex justify-between p-4 mb-4">
              <Skeleton variant="text" width="60%" />
              <Skeleton variant="rounded" width={120} height={40} />
            </div>

            {/* Accessed Cards */}
            <div className="flex gap-5">
              <Skeleton variant="rectangular" width={250} height={100}/>
              <Skeleton variant="rectangular" width={250} height={100}/>
              <Skeleton variant="rectangular" width={250} height={100}/>
              <Skeleton variant="rectangular" width={250} height={100}/>
            </div>

            {/* Chart section */}
            <div className="flex justify-evenly mt-20">
              <Skeleton variant="rectangular" width={550} height={300}/>
              <Skeleton variant="rectangular" width={550} height={300}/>
            </div>

            <div className="flex justify-evenly mt-20">
              {/* Documents */}
              <Skeleton variant="rectangular" width={300} height={450}/>
              {/* Daily Tasks */}
              <Skeleton variant="rectangular" width={300} height={450}/>
              {/* Team Members */}
              <Skeleton variant="rectangular" width={300} height={450}/>
            </div>
          </div>
        ) : (
          <BlurFade delay={0.25} inView>
            <div className="flex justify-between p-4 mb-4">
              {/* <h2 className=" text-left text-2xl font-semibold">Welcome, User!</h2> */}
              <TypingAnimation className="text-left text-3xl font-semibold bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-transparent bg-clip-text" text={`Welcome, ${user?.fullName || ''}!`}/>          
              <NavLink to="/project/create-new-project">
                <ShimmerButton className="w-[120px] h-[40px] text-sm">Add Project</ShimmerButton>  
              </NavLink>
            </div>

            {/* Accessed Cards */}
            <div className="flex gap-5 mt-10">
              <Marquee pauseOnHover className="[--duration:20s]">
                <AccessedCards/>
                <AccessedCards/>
                <AccessedCards/>
                <AccessedCards/>
              </Marquee>
            </div>

            {/* Chart section */}
            <div className="flex justify-evenly mt-20">
              <LineChartCards/>
              <CircleChartCards/>
            </div>

            <div className="flex justify-evenly mt-20">

            {/* Documents */}

            <div className={`w-[30%] h-[450px] p-4 overflow-y-scroll rounded-xl ${darkMode ? 'bg-gray-700 hover:shadow-lg' : 'bg-white hover:shadow-md'}`} 
            style={{scrollbarWidth: 'none'}}
            >
              <p className="text-left text-xl font-semibold mb-5">Documents</p>

              <div className="flex flex-col items-center">
                <DocumentCard/>
                <DocumentCard/>
                <DocumentCard/>
                <DocumentCard/>
              </div>
            </div>

            {/* Daily Tasks */}

            <div className={`w-[30%] h-[450px] p-4 overflow-y-scroll rounded-xl ${darkMode ? 'bg-gray-700 hover:shadow-lg' : 'bg-white hover:shadow-md'}`} 
            style={{scrollbarWidth: 'none'}}
            >
              <p className="text-left text-xl font-semibold mb-5">Daily Tasks</p>

              <div className="flex flex-col items-center gap-y-4">
                <DailyTaskCards/>
                <DailyTaskCards/>
                <DailyTaskCards/>
                <DailyTaskCards/>
                <DailyTaskCards/>
              </div>
            </div>

            {/* Team Members */}

            <div className={`w-[30%] h-[450px] p-4 overflow-y-scroll rounded-xl ${darkMode ? 'bg-gray-700 hover:shadow-lg' : 'bg-white hover:shadow-md'}`} 
            style={{scrollbarWidth: 'none'}}
            >
              <p className="text-left text-xl font-semibold mb-5">Team Members</p>

              <div className="flex flex-col items-center">
                <TeamMembersCards/>
                <TeamMembersCards/>
                <TeamMembersCards/>
                <TeamMembersCards/>
                <TeamMembersCards/>
              </div>
            </div>
          </div>
        </BlurFade>
      )}
    </div>
  </>
)}
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
import api from '@/api/api';



export default function Dashboard() {

  const darkMode = useSelector((state) => state.theme.isDarkMode);
  const isLoading = useSelector((state) => state.loading.isLoading);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.currentUser);
  const [fetchedFiles, setFetchedFiles] = useState([]);
  const [tasks, setTasks] = useState([]);
  // const recentlyAccessedProject = useSelector((state) => state.projects.recentlyAccessedProject);


  const recentlyAccessedProject = JSON.parse(localStorage.getItem('recentlyAccessedProject'));

  // console.log(user.fullName)
  // console.log(recentlyAccessedProject);
  

  useEffect(() => {
    // Start loading when component mounts
    dispatch(startLoading());
    // dispatch(fetchCurrentUser()).finally(() => dispatch(stopLoading()));
    
    const fetchFilesByProject = async () => {
        try {
            const response = await api.get(`/file/get-file/${recentlyAccessedProject._id}`, { withCredentials : true});
            // console.log(response.data.data);
            setFetchedFiles(response.data.data);
            return response.data.data; 
        } catch (error) {
            console.log(`Error : ${error}`)   
        }
    }

    fetchFilesByProject();

    const fetchTasksByProject = async () => {
      try {
          const response = await api.get(`/task/get-task/${recentlyAccessedProject._id}`, { withCredentials : true});
          // console.log(response.data.data);
          setTasks(response.data.data);
          return response.data.data; 
      } catch (error) {
          console.log(`Error : ${error}`)   
      }
    }

    fetchTasksByProject();
   
    // Simulate API call or data fetching
    setTimeout(() => {
      dispatch(stopLoading()); // Stop loading when data is fetched
    }, 2000);
  }, [dispatch, recentlyAccessedProject._id]);

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
              <Skeleton variant="rectangular" width={350} height={450}/>
              {/* Daily Tasks */}
              <Skeleton variant="rectangular" width={350} height={450}/>
              {/* Team Members */}
              <Skeleton variant="rectangular" width={350} height={450}/>
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

            <h1 className='text-left text-xl mt-12 font-medium text-violet-700'>{recentlyAccessedProject.name}</h1>

            {/* Accessed Cards */}
            
            <div className="flex gap-5 mt-6">
              <Marquee pauseOnHover className="[--duration:20s]"> 
                {tasks.map((task) => (
                  <AccessedCards
                      key={task._id}
                      task={task}
                  />
                ))}
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

              {fetchedFiles.length === 0 ? <h1>No documents</h1> : (
                <div className="flex flex-col items-center">
                  {fetchedFiles.map((file) => (
                      <DocumentCard key={file._id} document={file}/>
                  ))}
                </div>
              )}
            </div>

            {/* Daily Tasks */}

            <div className={`w-[30%] h-[450px] mb-10 p-4 overflow-y-scroll rounded-xl ${darkMode ? 'bg-gray-700 hover:shadow-lg' : 'bg-white hover:shadow-md'}`} 
            style={{scrollbarWidth: 'none'}}
            >
              <p className="text-left text-xl font-semibold mb-5">Daily Tasks</p>

              {tasks.length === 0 ? <h1>No tasks</h1> : (
                <div className="flex flex-wrap gap-y-3">
                  {/* Loop and display TaskItem */}
                  {tasks.map((task) => (
                      <div key={task._id} className="w-full">
                          <DailyTaskCards
                              task={task}
                          />
                      </div>
                  ))}
                </div>
              )}
            </div>

            {/* Team Members */}

            <div className={`w-[30%] h-[450px] p-4 overflow-y-scroll rounded-xl ${darkMode ? 'bg-gray-700 hover:shadow-lg' : 'bg-white hover:shadow-md'}`} 
            style={{scrollbarWidth: 'none'}}
            >
              <p className="text-left text-xl font-semibold mb-5">Team Members</p>

              <div className="flex flex-col items-center">
                {recentlyAccessedProject.teamMembers.map((member) => (
                    <TeamMembersCards key={member._id} teamMember={member}/>
                ))}
              </div>
            </div>
          </div>
        </BlurFade>
      )}
    </div>
  </>
)}
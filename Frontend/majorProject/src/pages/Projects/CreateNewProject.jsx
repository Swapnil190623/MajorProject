import { React, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { startLoading, stopLoading } from "@/store/loadingSlice";
import { Skeleton } from '@mui/material';
import axios from "axios";
import api from "@/api/api";
import { createProject } from "@/store/projectSlice";
import BlurFade from '@/components/ui/blur-fade';
import GradualSpacing from "@/components/ui/gradual-spacing";
import ProjectDetailForm from "@/components/Projects/ProjectDetailForm";
import TaskDetailForm from "@/components/Projects/TaskDetailForm";
import ClientDetailForm from "@/components/Projects/ClientDetailForm";
import SettingsForm from "@/components/Projects/SettingsForm";
import FinishProject from "@/components/Projects/FinishProejct";
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Lottie from "lottie-react";
import successAnimation from '../../assets/successAnimation.json'
import { toast } from "react-toastify";
import SidePanel from "@/components/SidePanel/SidePanel"
import Header from '@/components/Header/Header';



export default function CreateNewProject() {

    const darkMode = useSelector((state) => state.theme.isDarkMode);
    const isLoading = useSelector((state) => state.loading.isLoading);
    const dispatch = useDispatch();
    const navigate = useNavigate(); // To navigate after form submission
    const user = JSON.parse(localStorage.getItem('user'));

    const steps = ['Project Details', 'Client Details', 'Settings'];
    const [activeStep, setActiveStep] = useState(0);
    const [skipped, setSkipped] = useState(new Set());
    const [projectDetails, setProjectDetails] = useState({});
    const [clientDetails, setClientDetails] = useState({});
    const [projectSettings, setProjectSettings] = useState({});
    const [taskDetails, setTaskDetails] = useState({});

    // New state to handle success animation
    const [showSuccessAnimation, setShowSuccessAnimation] = useState(false);


    const isStepOptional = (step) => {
        return step === 1;
    };

    const isStepSkipped = (step) => {
        return skipped.has(step);
    };

    const handleNext = () => {
        let newSkipped = skipped;
        if (isStepSkipped(activeStep)) {
        newSkipped = new Set(newSkipped.values());
        newSkipped.delete(activeStep);
        }

        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        setSkipped(newSkipped);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleSkip = () => {
        if (!isStepOptional(activeStep)) {
        // You probably want to guard against something like this,
        // it should never occur unless someone's actively trying to break something.
        throw new Error("You can't skip a step that isn't optional.");
        }

        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        setSkipped((prevSkipped) => {
        const newSkipped = new Set(prevSkipped.values());
        newSkipped.add(activeStep);
        return newSkipped;
        });
    };

    const handleReset = () => {
        setActiveStep(0);
    };

     // Handler functions to update each part of the state
    const handleProjectDetailsChange = (data) => setProjectDetails(data);
    const handleClientDetailsChange = (data) => setClientDetails(data);
    const handleProjectSettingsChange = (data) => setProjectSettings(data);
    const handleTaskDetailsChange = (data) => setTaskDetails(data);


    function getStepContent(step) {
        switch (step) {
            case 0:
                return <ProjectDetailForm onChange={handleProjectDetailsChange} />;
            // case 1:
            //     return <TaskDetailForm onChange={handleTaskDetailsChange} />;
            case 1:
                return <ClientDetailForm onChange={handleClientDetailsChange} />;
            case 2:
                return <SettingsForm onChange={handleProjectSettingsChange} />;
            default:
                return 'Unknown step';
        }
    }
      

    useEffect(() => {
        // Start loading when component mounts
        dispatch(startLoading());

        // Simulate API call or data fetching
        setTimeout(() => {
        dispatch(stopLoading()); // Stop loading when data is fetched
        }, 2000);
    }, [dispatch]);
    


    const handleSubmit = async () => {
        const projectData = {
            ...projectDetails,
        };

        const notify = {
            userId : user._id,
            title : 'Project created successfully',
            message : 'Project created'
        }
        
        dispatch(startLoading());
        try {
            const response = await api.post('/project/', projectData, { withCredentials: true }); // Change URL to your API endpoint
            // console.log(response);
            
            dispatch(createProject(projectData));
            try {
                const notification = await api.post('/notification/', notify , {withCredentials: true});
                // console.log(notification.data.data);
                return notification.data.data;
            } catch (error) {
                // console.log(`Error: ${error}`);
            }
            toast.success("Project created successfully")
            // Show success animation
            setShowSuccessAnimation(true);

            // Redirect after a delay
            setTimeout(() => {
                navigate('/dashboard');
            }, 2000); // Adjust time as needed
        } catch (error) {
            // console.error('Error creating project:', error);
            toast.error("Error creating project");
        } finally {
            dispatch(stopLoading());
        }
    };

    const handleToggleDarkMode = () => {
        dispatch(toggleDarkMode());
    };


    return (
        <>
        <SidePanel darkMode={darkMode} />
        <Header darkMode={darkMode} toggleDarkMode={handleToggleDarkMode} />

            <div className={`absolute left-[305px] top-[64px] w-[80%] h-fit p-5 z-0 ${darkMode ? 'bg-gray-800 text-white' : 'bg-gray-50'}`}>
                <BlurFade>
                    <GradualSpacing className="text-left mb-14 text-2xl font-semibold" text="Create New Project"/>
                    
                    <Box sx={{ width: '100%'}}>
                        <Stepper activeStep={activeStep}>
                            {steps.map((label, index) => {
                            const stepProps = {};
                            const labelProps = {};
                            if (isStepOptional(index)) {
                                labelProps.optional = (
                                <Typography variant="caption">Optional</Typography>
                                );
                            }
                            if (isStepSkipped(index)) {
                                stepProps.completed = false;
                            }
                            return (
                                <Step key={label} {...stepProps}>
                                <StepLabel {...labelProps}>{label}</StepLabel>
                                </Step>
                            );
                            })}
                        </Stepper>

                        {showSuccessAnimation ? (
                            <FinishProject/>
                        ) : activeStep === steps.length ? (
                            <>
                                 <Typography sx={{ mt: 6, mb: 1 }}>
                                    All steps completed - you&apos;re finished
                                </Typography>
                                <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                                    <Box sx={{ flex: '1 1 auto' }} />
                                    <Button onClick={handleReset}>Reset</Button>
                                </Box>
                                {/* <FinishProject/> */}
                                <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                                    <Button onClick={handleSubmit}>Submit</Button>
                                </Box>

                            </>
                            ) : (
                                <>
                                    {/* <Typography sx={{ mt: 2, mb: 1 }}>Step {activeStep + 1}</Typography> */}
                                    {getStepContent(activeStep)}
                                    <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                                        <Button
                                        color="inherit"
                                        disabled={activeStep === 0}
                                        onClick={handleBack}
                                        sx={{ mr: 1 }}
                                        >
                                            Back
                                        </Button>
                                        <Box sx={{ flex: '1 1 auto' }} />
                                        {isStepOptional(activeStep) && (
                                            <Button color="inherit" onClick={handleSkip} sx={{ mr: 1 }}>
                                                Skip
                                            </Button>
                                        )}
                                        <Button onClick={handleNext}>
                                            {/* {activeStep === steps.length - 1 ? 
                                            (
                                                <Link to="/dashboard">
                                                    Go to Dashboard
                                                </Link>
                                            ) : 'Next'} */}
                                            {activeStep === steps.length - 1 ? 'Submit' : 'Next'}
                                        </Button>
                                    </Box>
                                </>
                            )
                        }
                    </Box>
                </BlurFade>
            </div>
        </>
    )
}
import { Router } from 'express';
import {
    loginUser, 
    logoutUser, 
    registerUser, 
    refreshAccessToken, 
    changeCurrentPassword, 
    getCurrentUser, 
    updateUserAvatar,  
    updateAccountDetails
} from '../controllers/user.controllers.js';
import { verifyJWT } from '../middlewares/auth.middlewares.js';

import {upload} from '../middlewares/multer.middlewares.js'

const router = Router();

// Route for email/password registration
router.route("/register").post(
    upload.fields([
        {
            name: "avatar",
            maxCount: 1
        }, 
    ]),
    registerUser
);//testing-done

// Route for email/password login
router.route("/login")
.post(loginUser) //testing-done

// Route for Google sign-in
// router.post('/google-signin', googleSignIn);


//secured routes
router.route("/logout")
.post(verifyJWT,  logoutUser) // testing-Done

router.route("/refresh-token")
.post(refreshAccessToken) // testing-Done

router.route("/change-password")
.post(verifyJWT, changeCurrentPassword) // testing-Done

router.route("/current-user")
.get(verifyJWT, getCurrentUser) // testing-Done

router.route("/update-account")
.patch(verifyJWT, updateAccountDetails) // testing-Done

router.route("/avatar")
.patch(verifyJWT, upload.single("avatar"), updateUserAvatar) //testing-Done


export default router;

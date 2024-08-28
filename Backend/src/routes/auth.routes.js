import { Router } from 'express';
import {
    registerUser,
    loginUser,
    googleSignIn
} from '../controllers/authController.js';
import { verifyToken } from '../middlewares/authMiddleware.js';

const router = Router();

// Route for email/password registration
router.post('/register', registerUser);

// Route for email/password login
router.post('/login', loginUser);

// Route for Google sign-in
router.post('/google-signin', googleSignIn);

// Route to protect with authentication middleware
router.get('/protected', verifyToken, (req, res) => {
    res.send('This is a protected route');
});

export default router;

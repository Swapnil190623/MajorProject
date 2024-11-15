import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"

const app = express()

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))

app.use(express.json({limit: "16kb"}))
app.use(express.urlencoded({extended: true, limit: "16kb"}))
app.use(express.static("public"))
app.use(cookieParser())



// routes imports
import userRoutes from './routes/user.routes.js';
import projectRoutes from './routes/project.routes.js'
import taskRoutes from './routes/task.routes.js'
import fileRoutes from './routes/file.routes.js'
import invoiceRoutes from './routes/invoice.routes.js'


// routes declaration
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/project', projectRoutes);
app.use('/api/v1/task', taskRoutes);
app.use('/api/v1/file', fileRoutes);
app.use('/api/v1/invoice', invoiceRoutes);


export { app }
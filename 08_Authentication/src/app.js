import express from 'express'
import morgan from 'morgan'
const app = express();
import userRoutes from '../src/routes/user.route.js'
import cookieParser from 'cookie-parser';
/**
 * Middlewares
 */
app.use(express.json());
app.use(morgan("dev"))
app.use(cookieParser())

/**
 * Routes
 */
app.use("/api/v1/auth", userRoutes)




export default app;
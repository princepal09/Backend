import express from 'express'
import morgan from 'morgan'
const app = express();
import userRoutes from '../src/routes/user.route.js'

/**
 * Middlewares
 */
app.use(express.json());
app.use(morgan("dev"))


/**
 * Routes
 */
app.use("/api/v1/auth", userRoutes)




export default app;
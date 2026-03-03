const express = require("express")
const app = express();
require("dotenv").config();
const { connectDb } = require("./database/db")
const PORT = process.env.PORT || 3000;
const commentRoutes = require('./routes/comment.route')
const likeRoutes = require('./routes/like.routes')
const postRoutes = require('./routes/post.routes')
const userRoutes = require('./routes/user.route')

app.use(express.json());

/**
 * commentRoutes
 */
app.use("/api/v1/comments", commentRoutes)

/**
 * like routes
 */
app.use("/api/v1/likes", likeRoutes) 

/**
 * post Routes
 */
app.use("/api/v1/post", postRoutes)

/**
 * User routes
 */
app.use("/api/v1/user", userRoutes)


connectDb().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    })
})
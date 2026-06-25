import app from "./app.js";
import { dbConn } from "./config/db.config.js";
import { PORT } from "./config/secrets.config.js";



dbConn().then(() => {
    app.listen(PORT, () => {
        console.log(`Your Server is running at PORT ${PORT}`)
    })
}).catch(() => {
    console.log("DB Connection Failed!!!");
})


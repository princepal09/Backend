import app from "./app.js";
import { dbConnect } from "./config/db.config.js";
import { PORT  } from "./config/secrets.config.js";




dbConnect().then(() => {
    app.listen(PORT, () => {
    console.log(`YOUR SERVER IS RUNNING AT PORT ${PORT}`)
})
})
.catch(() => {
    console.log("ERROR IN DB CONNECTION")
})


import app from "./src/app.js";
import { config } from "./src/config/config.js";
import { connectDb } from "./src/config/database.js";


connectDb().then(() => {
app.listen(config.PORT, () => {
    console.log(`SERVER IS LISTENING AT ${config.PORT} PORT`);
})
}).catch((err) => {
    console.error("SERVER HAS NOT STARTED YET", err.message)
})


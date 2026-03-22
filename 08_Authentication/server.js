import { configDotenv } from "dotenv";
import app from "./src/app.js";
import { config } from "./src/config/config.js";

app.listen(config.PORT, () => {
    console.log(`SERVER IS LISTENING AT ${config.PORT} PORT`);
})
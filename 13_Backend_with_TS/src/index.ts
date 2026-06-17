import app from "./app";
import { connectDb } from "./config/db.config";
import { PORT } from "./secrets";


connectDb().then(() => {
 app.listen(PORT, () =>{
    console.log(`SERVER IS RUNNING AT PORT ${PORT}`)
})
}).catch(() => {
    console.log("SERVER HAS NOT STARTED YET ")
})


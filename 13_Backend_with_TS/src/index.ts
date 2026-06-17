import app from "./app";
import { PORT } from "./secrets";



app.listen(PORT, () =>{
    console.log(`SERVER IS RUNNING AT PORT ${PORT}`)
})
import express from "express"
import connectDB from "./mongoDB/connect.js";
import dotenv from 'dotenv';
import userRoute from "./routes/users.js";
import cors from "cors";
import pinRoute from "./routes/pins.js"
dotenv.config();
const port=5000;
const app = express();



const corsOptons={
  origin:true,
};

app.use(express.json());
app.use(cors(corsOptons));
app.use("/api/users", userRoute);
app.use("/api/pins", pinRoute);

const startServer=async()=>{
  try {
     connectDB(process.env.MONGODB_URL);
      app.listen(port,()=>console.log(`Server has been started at port ${port}`));
  } catch (error) {
      console.log(error);
  }
  
}

startServer();
import express from "express"
import connectDB from "./mongoDB/connect.js";
import dotenv from 'dotenv';
import userRoute from "./routes/users.js";
import cors from "cors";
import pinRoute from "./routes/pins.js"
// import bodyParser from "body-parser";
import path from "path";

dotenv.config();
const port=8000;
const app = express();



const corsOptons={
  origin:true,
};


app.use(express.json());
// app.use(bodyParser.json())
app.use(cors(corsOptons));
app.use("/api/users", userRoute);
app.use("/api/pins", pinRoute);




//Deployment Code starts in productions=====================

const __dirname = path.resolve();
    app.use(express.static(path.join(__dirname, '/frontend/build')));

    app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, 'frontend', 'build', 'index.html'));
});



//Deployment Code ends in productions=====================

app.use("/",(req,res)=>{
  res.status(200).json({message:"jello"});
})

const startServer=async()=>{
  try {
     connectDB(process.env.MONGODB_URL);
      app.listen(port,()=>console.log(`Server has been started at port ${port}`));
  } catch (error) {
      console.log(error);
  }
  
}

startServer();
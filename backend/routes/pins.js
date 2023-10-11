import express from "express";
import Pin from "../models/Pin.js";

const router = express.Router();
//create a pin
router.post("/", async (req, res) => {
  const newPin = new Pin(req.body);
  try {
    const savedPin = await newPin.save();
    res.status(200).json(savedPin);
  } catch (err) {
    res.status(500).json(err);
  }
});

//get all pins
router.get("/:id", async (req, res) => {
  try {
    const id=req.params.id;
    // console.log(id);
    const pins = await Pin.find({userId:id});
    res.status(200).json(pins);
  } catch (err) {
    res.status(500).json(err);
  }
});


//del  pins
router.delete("/:id", async (req, res) => {
  try {
    const id=req.params.id;
    // console.log(id);
    const pins = await Pin.findByIdAndDelete(id);
    if(pins){
      res.status(200).json({message:"Deleted successfull"});
    }
   
  } catch (err) {
    res.status(500).json(err);
  }
});

export default router;

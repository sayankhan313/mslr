import "dotenv/config";
import mongoose from "mongoose";
import { connectToDatabase } from "../lib/db";
import User from "../models/User";
import bcrypt from "bcrypt";


async function seedEC() {
    try {
     await connectToDatabase();
     const email="ec@referendum.gov.sr"
     const password="Shangrilavote&2025@";
     
     const existingEC= await User.findOne({email});
     if(existingEC){
      console.log("EC user already exists");
      return; 
     }

    const passwordHash=await bcrypt.hash(password,10);

    await User.create({
        name: "Election Commission",
        email,
        passwordHash,
        role: "EC",
      });
      console.log("EC user seeded successfully");  
     
    } catch (error) {
        console.error("Error seeding EC:", error);  
    }
    finally{
        mongoose.disconnect();
    }
    
}

seedEC();
import mongoose from "mongoose";
//import bcrypt from "bcrypt";
import dotenv from 'dotenv';
dotenv.config();


const user = process.env.mongodb_user
const password = process.env.mongodb_password

// const createAdmin = async() => {

//   try {

//     const find = await adminModel.findOne({email:'manikantajada16@gmail.com'})

//     if (!find) {



//       const response = await adminModel.create({name:'Manikanta',email:'manikantajada16@gmail.com',password: bcrypt.hashSync("Manikanta@353", 10)}) 

//       console.log(response);
      
//     }
    
//   }
//   catch (err:any) {
//     console.log(err?.message);
    
//   }

// }


async function connectDB() {
    try {
      await mongoose.connect(`mongodb+srv://${user}:${password}@spark-cluster.bqite.mongodb.net/`);
      console.log("Mongo DB Connected");

      // createAdmin()

    } catch (error) {
      console.log(error);
    }
  }





  

export default connectDB;
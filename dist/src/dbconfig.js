"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
//import bcrypt from "bcrypt";
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const user = process.env.mongodb_user;
const password = process.env.mongodb_password;
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
function connectDB() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield mongoose_1.default.connect(`mongodb+srv://${user}:${password}@spark-cluster.bqite.mongodb.net/`);
            console.log("Mongo DB Connected");
            // createAdmin()
        }
        catch (error) {
            console.log(error);
        }
    });
}
exports.default = connectDB;

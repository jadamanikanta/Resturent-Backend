import express from 'express';
import cors from 'cors'; 
import Routers from './src/routes';
import mongoose from 'mongoose';
import serverless from 'serverless-http';
import helmet from 'helmet';
import connectDB from './src/dbconfig';

const app = express();



app.use(helmet());


connectDB();


app.use(cors());

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});

app.use(express.json());


app.use('/api/v1', Routers);


const handler = serverless(app);

module.exports.handler = handler;

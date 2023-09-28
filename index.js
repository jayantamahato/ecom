import express from "express";
import { adminRouer,vendorRouer } from "./routes/index.js";
import { dbConnection } from "./config/dbConfig.js";
import path from 'path'
import { fileURLToPath } from 'url';
import cors from 'cors'

const app = express();
app.use(express.json());
app.use(cors());
dbConnection();

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);
const PORT  = process.env['PORT']||3000


 app.use('/vendor',vendorRouer);
 app.use('/admin',adminRouer);
 app.use('/food',express.static(path.join('images')))

 


app.listen(PORT,()=>{
    // console.clear()
    console.log('app is runningn on port :',PORT)
})



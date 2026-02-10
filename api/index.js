import express from 'express'
import dotenv from 'dotenv'

import router from '../src/Routes/authRoutes.js';
import cors from 'cors'
import connectDb from '../src/config/db.js';
dotenv.config()
const app = express();

app.use(cors({
    origin:'*'
}))


app.use(express.json())

app.use('/auth',router);


app.use(async(req,res,next) => {
    try {
        await connectDb();
        next()
    } catch (error) {
        console.log("Database Connection failed",error)
        res.status(500).json({
            message:"Database Connection failed"
        })
    }
})
app.get("/check", (req, res) => {
  res.send("Backend running 🚀");
});
// app.listen(8000,()=> {
//     connectDb();
//     console.log("server")
// })







import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auths.js";
import tweetRoutes from "./routes/tweets.js";
import pug from 'pug'
import axios from 'axios'



const app = express();
dotenv.config();

mongoose.connect(process.env.MONGO).then(() => {
    console.log("DB connected")
}).catch((err) => {
    console.log(err)
})



app.use(cookieParser());
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/tweets", tweetRoutes);

app.set('view engine', 'pug')
app.get('/', async (req, res) => {
    try {
        const response = await axios.get('http://localhost:8000/api/tweets/user/all/663f856e8275d04413a51676');
        const tweetData = response.data;

        res.render('index', { tweets: tweetData });
    } catch (error) {
        console.error('Error fetching tweet data:', error);
        res.status(500).send('Error fetching tweet data');
    }
});

app.listen(8000, () => {
    console.log(`Server is running...`)
})
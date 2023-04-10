import express from 'express';
import cors from 'cors'
import mongoose from "mongoose";
import { config } from 'dotenv'
config()

const database = process.env.DB_CONNECTION_STRING;
const CONNECTION_STRING = `${database}`
mongoose.connect(CONNECTION_STRING);
// mongoose.connect('mongodb+srv://CS5610Team21:CS5610Team21@travelplanner.9rhwihg.mongodb.net/?retryWrites=true&w=majority');

import HelloController from "./controllers/test/HelloCotroller.js";
import TestController from "./controllers/test/test-controller.js";

const app = express()
app.use(cors())
app.use(express.json());

HelloController(app)
TestController(app)
app.listen(process.env.PORT || 4000);

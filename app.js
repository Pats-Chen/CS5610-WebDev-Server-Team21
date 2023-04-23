import express from 'express'

import HelloController from "./controllers/test/HelloCotroller.js";
import UsersController from "./controllers/users/users-controller.js";
import travelController from "./controllers/travel_plan/travel-controller.js";
import AuthenticationController from "./controllers/users/auth-controller.js";
import cors from 'cors'
import session from 'express-session'
import dotenv from 'dotenv'
import mongoose from "mongoose";
import ReviewController from "./controllers/reviews/review-controller.js";
import PlansController from "./controllers/plans/plans-controller.js";

dotenv.config();
const CONNECTION_STRING = "mongodb://127.0.0.1:27017/travelPlan"
const DB_CONNECTION_STRING = "mongodb+srv://CS5610Team21:CS5610Team21@travelplanner.9rhwihg.mongodb.net/?retryWrites=true&w=majority";

mongoose.connect(DB_CONNECTION_STRING).then(() => console.log('DB started'))
    .catch(() => () => console.log(error.message));

const app = express()

// cross network region
app.use(cors(
    {
        // support cookie header
        credentials: true,
        // must whitelists allowed domains(if using credentials)
        // http://localhost:3000
        // ********  origin: ['http://localhost:3000', process.env.CORS_ORIGIN]
        origin: 'https://main--mellifluous-dieffenbachia-a9ad37.netlify.app/',
    }));

// Secret is used in hashing the session ID
const SECRET = 'process.env.SECRET';
//session configure
let sess = {
    secret: SECRET,
    // forces a new session to be saved.
    saveUninitialized: true,
    // enforces that the session is resaved against the server store on each request
    resave: true,
    cookie: {
        maxAge: 60 * 60 * 1000 * 10, // 10 hour
        secure: process.env.NODE_ENV === "production",
        // sameSite: none allows cookies to be sent in all contexts
        sameSite: process.env.NODE_ENV === "production" ? 'none' : 'lax',
    }
}

if (process.env.NODE_ENV === 'production') {
    // must set for secure to work on HTTPs protocol
    app.set('trust proxy', 1) // trust first proxy
}

app.use(session(sess))
app.use(express.json({
    limit: '50mb'
}));

HelloController(app);
UsersController(app);
PlansController(app);
AuthenticationController(app);
travelController(app);
ReviewController(app);

app.listen(process.env.PORT || 4000);


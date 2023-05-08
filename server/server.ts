const  cookieParser  = require('cookie-parser');
const bodyParser = require('body-parser');
const express = require('express');
const cors = require('cors')
const app = express();
const { PORT, CLIENT_URL} = require('./constants/config');
const route = require('./routes/auth');
const passport = require('passport');

app.use(express.static('./fileUpload'))

// initializing built in middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: CLIENT_URL, credentials: true}));

app.use(bodyParser.urlencoded({ extended: false }));



// initailaizing routes
app.use('/api', route)
app.use(passport.initialize())



const appStart = ()=>{
    try {
        app.listen( PORT , ()=>{
        console.log(`server is listening on port: ${PORT}` )
        });
    } catch (error: any) {
        console.log(error.message)
    }
}

appStart() 

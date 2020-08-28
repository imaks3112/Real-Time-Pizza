
require('dotenv').config()
const express = require('express')
const app = express()
const ejs = require('ejs')
const expressLayout = require('express-ejs-layouts')
const path = require('path')
const PORT = process.env.PORT || 3112
const mongoose = require('mongoose')
const session = require('express-session')
const flash = require('express-flash')
const MongoDbStore = require('connect-mongo')(session)


//Database connection
const url = "mongodb+srv://aks_3112:aks_3112@cluster0.2y3gc.mongodb.net/pizza?retryWrites=true&w=majority";
mongoose.connect(url,{ useNewUrlParser:true,useCreateIndex:true,useUnifiedTopology:true,
useFindAndModify:true});
const connection = mongoose.connection;
connection.once('open', () => {
    console.log("Database is connected...");
}).catch(err => {
    console.log("Database is not connected...")
});


//session store
 let mongoStore = new MongoDbStore({
     mongooseConnection : connection,
     collection: 'sessions'
 })

//session config
app.use(session({
    secret: process.env.COOKIE_SECRET,
    resave: false,
    store: mongoStore,
    saveUninitialized:false,
    cookie: { maxAge: 1000 * 60 * 60 * 24 }    //24 hours
}))

app.use(flash())

//Assets
app.use(express.static('public'))
app.use(express.json())

//Global middleware
app.use((req,res,next) => {
    res.locals.session = req.session
    next()
})

//set Template engine
app.use(expressLayout)
app.set('views', path.join(__dirname,'/resources/views'))
app.set('view engine','ejs')


//routes
require('./routes/web')(app)


app.listen(PORT , () => {
    console.log(`Listening on port ${PORT}` )
})
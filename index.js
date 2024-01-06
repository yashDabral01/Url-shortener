const express = require("express");

// this library is used to include to tell the path for ejs to views
const path = require("path");

const URL = require("./models/url");  
// to parse the cookie
const cookieParser = require("cookie-parser");
const {restrictToLoggedInUserOnly} = require("./middlewares/auth");
// modules for routers
const urlRoute = require("./routes/url");
const userRoute = require("./routes/user");
const staticRoute = require("./routes/staticRoutes");

// this module is include for making connection
const {connectDatabase}= require("./dbConnection");
const Port = 8001;
const app = express();

//middleware
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(cookieParser);
// database connection
connectDatabase("mongodb://127.0.0.1:27017/shorturl").then(()=>{
    console.log("Database connected !!");
});

app.set("view engine","ejs"); // ejs for server side rendering
app.set("views",path.resolve("./views")); // this is used to tell the express where i am storing my ejs files

//routes

app.use("/url",urlRoute);
app.use("/user",userRoute);
app.use("/",staticRoute);

//server creation
app.listen(Port,(req,res)=>{
  console.log("server is running at port :",{Port});
});
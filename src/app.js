//path ko liye taki is file se dusare file me ja sake and also join use kar sake.
//built in nodeJS module provides utilities for working with file and directory paths.
const path=require("path");

// You’ll use Node’s require function to use the express module...similar to import

// const express = require("express");"I want to use the Express framework (of NodeJS) in my code."

// Express is a framework for building web applications using JavaScript. It provides a 
// set of tools and functions that make it easier to create web servers, handle HTTP requests, 
// and manage routes (URLs).

// When you write const app = express();, you're creating a new Express application. Think of 
// this application as a blank canvas(pinting) where you can add different parts like routes, middleware,
//  and settings to build your web application.

// So, in easy words, const express = require("express"); brings in the Express framework, 
// and const app = express(); creates a new Express application that you can customize to 
// build your website or web application.

const express= require("express");
//...app.get ya app.post sab isise hoga
const app= express();

//. yani app.js kiske andar hai uske root pe jao==src
//root ke andar dp k andar conn ko lao
require("./db/conn");
const Register=require("./models/registers");
const contactus=require("./models/contactus");

// In many environments (e.g. Heroku), and as a convention, you can set the environment variable 
//PORT to tell your web server what port to listen on.
// So process.env.PORT || 8000 means: whatever is in the environment variable PORT, or 8000 if 
//there's nothing there.
// So you pass that to app.listen, or to app.set('port', ...), and that makes your server able to 
//accept a "what port to listen on" parameter from the environment.

// in production environments or when deploying your application to a hosting service,
// it's a good practice to use environment variables like process.env.PORT for specifying the 
// port number. This allows the hosting service to dynamically assign a port number based on 
// its configuration, avoiding conflicts and ensuring that your application can run smoothly 
// without manual port adjustments.(locally sahi chalge ya waha sahi chalega jaha 8000 port hamesha available rhega).
const port= process.env.PORT || 8000;

//mongo me jo data rakhte hai wo json format me hi hota hai
const {json} = require("express");

//yani __dirname ko ../public se jodo-------../public yani 2 parent upar jao phir public me aao
const staticPath= path.join(__dirname,"../public");

// express.static exposes a directory or a file to a particular URL so it's contents can be publicly accessed.
// Each app.use(middleware) is called every time a request is sent to the server.
// in an Express.js application, when a request is made to the server (like visiting a webpage),
// it goes through a series of middleware functions before reaching its final destination (like getting a webpage displayed).

// Middleware functions can access the req (request) and res (response) objects in Express. 
// These objects contain information about the incoming request (like data sent from a form) 
// and allow the middleware to send back a response to the client (like a webpage or JSON data).

// agar hame public wale me jo bhi css ya jo bhi files hai use karne hai to ye karna hi hoga
// express.static(): This is a built-in middleware function in Express.js that serves static 
// files such as HTML, CSS, images, and JavaScript files. It takes a directory path as an argument.

// app.use(): This method in Express is used to mount middleware functions. When a request is made to 
// the server(app.use() is a method used to add middleware functions to your application.), Express checks the middleware functions that are mounted using app.use() to see 
// if any of them can handle the request.

// this code sets up a static file server in Express.js that serves files from the "public" 
// directory located one level above the current directory of the JavaScript file where this code 
// is written. This is a common setup for serving static assets like HTML, CSS, images, and 
// client-side JavaScript files in an Express.js web application.
app.use(express.static(staticPath));

//using handlebars in nodeJS
// app.set() is a method in Express that is used to configure various settings for the application.

// "view engine" is the setting being configured. In this case, it specifies the view engine that 
// Express should use to render templates.

// "hbs" is the value assigned to the "view engine" setting. It indicates that the Handlebars view
// engine should be used.
app.set("view engine","hbs");


//niche do line ke liye info.cpp ka q 3 dekho mast samajh aayega

//express.json() is a body parser for post request except html post form and 
// express.urlencoded({extended: false}) is a body parser for html post form.
//nahi to unhe samjh hi nhi aayega ki ye kya bheja hai form ke input me post k dwara

app.use(express.json());
app.use(express.urlencoded({extended: false}));

//get kab karte hai jab hamko routing karna ho (like in react)...ham response me jo page bhi render karayenge waha jayega
// point 1 in info.cpp---------------------------------------------------------------------------------------------
app.get("/", (req,res)=>{
    //response me kya dena hai
    res.render("register");
    // console.log("hello");
});

//guest wale me direct onclick kar diya hu...

//register aur login wale me to is wale se ham render hi nhi kar rhe...waha rendering to post k andar hi ho ja rha
app.get("/index", (req,res)=>{
    res.render("index");
});

app.get("/login", (req,res)=>{
    res.render("login");
});

//point 2 in info.cpp-----------------------------------------------------------------------------------------------------------------
//isme yahi hai ki jaise hi "/login" URL (action) pe post (method) k liye ham jayenge hamara ye perform hoga

//jaruri nhi hai waha /login wale page se post kiye ho to action me /login hi hoga tumhara jo man kare wo de sakte ho
//(means kisi bhi URL pe post kar sakte ho) bas ye hai ki yaha tumhe usi nam se karna hoga tabhi na hoga...
//kuki niche wala code kya keh rha hai ki mai route handling karunga jab bhi is URL pe koi post perform hota hai...
app.post("/login", async (req,res)=>{
    try{
        //post karne par jo bhi data user ne dala hai waha se ham kucch request kar rhe
        
        // This line extracts the value of the "mail" field from the request body and assigns it to the variable email.
        const email=req.body.mail;
        const password=req.body.pass;
        // console.log(`${email}`);

        // below line uses await to asynchronously query the database (using Mongoose ORM(object relational
        // mapping), assuming "Register" is a Mongoose model) to find a document where the "email" 
        // field matches the email variable.

        //like sare data ko ek ek karke dekhega jaise hi wo email wala milega uska sara data 
        // object(JSON data is essentially represented as an object when used in JavaScript.) k form me 
        //userdata me rakh dega
        const userdata = await Register.findOne({email:email});
        // console.log(userdata);
        // console.log(userdata.password);
        if(userdata.password === password){
            res.status(201).render("index");
        }else{
            res.status(400).send("Password do not match");
        }

    }catch(error){ //agar us email ka koi mila hi nhi to yaha aayega
        res.status(400).send("Entered email is wrong");
    }
    // Overall, this code handles a POST request to "/login", extracts the email and password 
    // from the request body, checks if the email exists in the database, and if the password 
    // matches, it renders the "index" view; otherwise, it sends an error response.
});

app.post("/", async (req,res)=>{
     try{
        //  console.log(req.body.fullname);
        //  res.send(req.body.fullname);
        // console.log("aman");
        // res.send("aman");
        const password=req.body.password;
        const cpassword=req.body.confirm;

        const num=req.body.phone; //can use some restriction

        if(password===cpassword){
            //Creating a New Entry: If the passwords match, it creates a new entry in the database 
            // (assuming there's a database connection and a "Register" model defined). It uses the values 
            // from the form to create a new "Register" entry, which typically represents a user or employee.

            //making new schema that we defined in registers.js
            const registerEmployee = new Register({
                fullname: req.body.fullname,
                username:req.body.username,
                email: req.body.email,
                phone: req.body.phone,
                password: req.body.password,
                // cpassword: req.body.confirm,
            })
            //simply jo banaye ho new entry use mongo me save bhi to karna hai uske liye .save() call kiya gaya
            const registered=registerEmployee.save(); //OR
            // registerEmployee.save();
            res.render("index");
        }else{
            res.send("password and cpassword must be same");
        }
        
     }catch(error){
        res.send(error);
     }
    // In simple terms, this code processes form data submitted to the root URL ("/"), checks if the passwords 
    // match, creates a new entry in the database if they do, and renders a page accordingly. It also handles 
    // errors if anything goes wrong during the process.
});

//contact us wala save karne k liye-----------------------------------------------------------------------------------
app.post("/index", async (req,res)=>{
    try{
       const registerEmployee = new contactus({
           fname: req.body.fname,
           lname:req.body.lname,
           email: req.body.email,
           phone: req.body.phone,
           message: req.body.message,
       })

       const registered=registerEmployee.save();
       res.render("index");
    }catch(error){
       res.send(error);
    }
});

//is port me run kar rhe--------------------------------------------------------------------------------------------
app.listen(port,()=>{
    console.log("Chalu Ho Gaya");
});

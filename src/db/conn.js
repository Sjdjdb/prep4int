// code for connecting to a MongoDB database using Mongoose in a Node.js application:

// Importing Mongoose: The first line const mongoose = require("mongoose"); imports the Mongoose library into 
// your Node.js application. Mongoose is an ODM (Object Data Modeling) library for MongoDB, allowing you to work 
// with MongoDB databases using JavaScript objects.


// Connecting to MongoDB: The mongoose.connect() method is used to connect to a MongoDB database. It takes two parameters:

// The first parameter is the MongoDB connection string. This string specifies the database server, username, 
// password, and database name to connect to. In your example, the connection string is 
// "mongodb+srv://Amansingh:amansingh245172@cluster.za7ia9z.mongodb.net/reg".

// The second parameter is an options object that configures the MongoDB connection. In your code,
//  { useNewUrlParser: true, useUnifiedTopology: true } are the options specified:

// useNewUrlParser: true tells Mongoose to use the new URL parser for MongoDB connection strings. 
// This is necessary because the old parser is deprecated.

// useUnifiedTopology: true enables the use of the new server discovery and monitoring engine. It's recommended
// to use this option for better performance and reliability.

// Handling Connection Status: The mongoose.connect() method returns a Promise. The .then() method is used to 
// handle the case when the connection is successful. It logs a success message to the console: "connection success".

// .catch() is used to handle errors that may occur during the connection process. If there's an error 
// connecting to the database, it logs the error message to the console using console.log(err).

// In summary, the code establishes a connection to a MongoDB database using Mongoose, handles connection success 
// and error cases, and configures the connection with options like the new URL parser and unified topology for 
// better performance and reliability.


const mongoose=require("mongoose");

mongoose.connect("mongodb+srv://Amansingh:amansingh245172@cluster.za7ia9z.mongodb.net/reg", {useNewUrlParser : true, useUnifiedTopology: true})
.then(()=>console.log("connection success"))
.catch((err)=> console.log(err));

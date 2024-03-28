//schema and inserting

// Importing Mongoose: The first line const mongoose = require("mongoose"); imports the Mongoose library into 
// your Node.js application. Mongoose is used to work with MongoDB databases using JavaScript.
const mongoose=require("mongoose");

//naya schema bana rhe...aur isi ke basis hamara mongo me data save hoga

// Defining a Schema: The code const employeeSchema = new mongoose.Schema({ ... }) defines a schema for your 
// MongoDB documents. A schema is like a blueprint that defines the structure and properties of your data.
const employeeSchema= new mongoose.Schema({
    // Schema Properties:

    // fullname, username, password, and confirm are properties of the schema.
    // Each property has a type (String in this case) that specifies the data type of the property.
    // The required: true option means that these properties are mandatory and must be provided when creating a 
    // new document based on this schema.
    fullname: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    confirm: {
        type: String,
        // required: true
    },
})

const Register =new mongoose.model("Register", employeeSchema);
module.exports= Register;

// Creating a Model: The code const Register = new mongoose.model("Register", employeeSchema); creates a model 
// based on the schema. A model is a constructor function that allows you to create new documents (data entries) 
// in your MongoDB collection.

// Exporting the Model: Finally, module.exports = Register; exports the Register model so that it can be used 
// in other parts of your application. This allows you to perform CRUD (Create, Read, Update, Delete) 
// operations on the MongoDB collection associated with this model.

// In simpler terms, this code sets up a schema with specific properties (like fullname, username, password, 
// confirm) for MongoDB documents. It then creates a model based on this schema, which can be used to interact 
// with the MongoDB collection associated with the model in your Node.js application.





// const reactPlaylist= new Playlist({
//     name: "aman",
//     ctype : "node",
//     videos: 7,
//     author : "singh",
//     active: true,
// })
// reactPlaylist.save();

// const createDocument =async ()=>{
//     try{
//         const reactPlaylist= new Playlist({
//             name: "kunnu",
//             ctype : "backend",
//             videos: 70,
//             author : "singhaniya",
//             active: true,
//         })

//         const result= await reactPlaylist.save();
//         console.log(result);
//     }catch(err){
//         console.log(err);
//     }
// }
// createDocument();


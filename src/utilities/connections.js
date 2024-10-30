const { Schema } = require('mongoose');
const mongoose = require('mongoose')

const blogSchema = Schema({  
    title: String,
    slug:String,
    content: String, 
    author: String,
    createdAt:Date,
    tag: String,
    description:String
}, { versionKey: false });

const loginSchema = Schema({  
    email: String, 
    password: String,
}, { versionKey: false });


const collection = {};



collection.getblogSchema = async () => {
    try {
        // const dbconnection = await mongoose.connect(url);
        const blog = new mongoose.model('blogs', blogSchema);
        return blog;
    } catch (error) {
        const err = new Error("Could not add the data");
        err.status = 500;
        throw err;
    }
};


collection.getloginSchema = async () => {
    try {
        // const dbconnection = await mongoose.connect(url);
        const users = new mongoose.model('login', loginSchema);
        return users;
    } catch (error) {
        const err = new Error("Could not add the data");
        err.status = 500;
        throw err;
    }
};



module.exports = collection;

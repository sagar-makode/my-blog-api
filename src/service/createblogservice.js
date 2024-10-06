const dbservice = require('../model/createblogModel');

const createblogservice = {};

createblogservice.insertData = async (data) => {
    try {
        let insertForm = await dbservice.insertUsermdata(data);
        if (insertForm) {
            return insertForm;
        } else {
            return "";
        }
    } catch (error) {
        throw new Error("Error in inserting data: " + error.message);
    }
};

createblogservice.allblogs = async () => {
    try {
        let blogs = await dbservice.findallblogs();
        if (blogs) {
            return blogs;
        } else {
            return "";
        }
    } catch (error) {
        throw new Error("Error in finding test: " + error.message);
    }
};



module.exports = createblogservice;

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

createblogservice.getBlogById = async (id) => {
    try {
        // Call your database service to find a blog by its ID
        let blog = await dbservice.findBlogById(id); // Implement this function in dbservice
        
        if (blog) {
            return blog; // Return the blog if found
        } else {
            return null; // Return null if no blog is found
        }
    } catch (error) {
        throw new Error("Error in finding blog: " + error.message); // Handle errors
    }
};


createblogservice.updateBlogById = async (id, updatedData) => {
    try {
        // Call your database service to update a blog by its ID
        const updatedBlog = await dbservice.updateBlogById(id, updatedData); // Implement this function in dbservice
        
        if (updatedBlog) {
            return updatedBlog; // Return the updated blog if found and updated
        } else {
            return null; // Return null if no blog is found
        }
    } catch (error) {
        throw new Error("Error in updating blog: " + error.message); // Handle errors
    }
};

createblogservice.deleteBlogById = async (id) => {
    try {
        // Call your database service to delete a blog by its ID
        const deletedBlog = await dbservice.deleteBlogById(id); // Implement this function in dbservice
        
        if (deletedBlog) {
            return true; // Return true if the blog was successfully deleted
        } else {
            return null; // Return null if no blog was found to delete
        }
    } catch (error) {
        throw new Error("Error in deleting blog: " + error.message); // Handle errors
    }
};


createblogservice.login = async (email,password) => {
    try {
        let insertForm = await dbservice.checklogin(email,password);
        if (insertForm) {
            return insertForm;
        } else {
            return "";
        }
    } catch (error) {
        throw new Error("Error in Login: " + error.message);
    }
};



module.exports = createblogservice;

const dbmodel = require('../utilities/connections');
const createblogModel = {};
const bcrypt = require('bcrypt');


createblogModel.insertUsermdata = async (insdata) => {
    try {

        let blogData = await dbmodel.getblogSchema()
        
        await blogData.create(insdata);
        return insdata

    } catch (error) {
        throw new Error("Error in inserting form data: " + error.message);
    }
};



createblogModel.findallblogs = async () => {
    try {

        let findallblogData = await dbmodel.getblogSchema()
        //not sending the answers
        let data = await findallblogData.find();
      
        return data;


    } catch (error) {
        throw new Error("Error in inserting form data: " + error.message);
    }
};


createblogModel.findBlogById = async (id) => {
    try {
        let findBlogData = await dbmodel.getblogSchema(); // Get the schema/model
        // Fetch the blog by ID
        let blog = await findBlogData.findById(id);
        
        return blog; // Return the found blog, or null if not found
    } catch (error) {
        throw new Error("Error in finding blog by ID: " + error.message); // Handle errors
    }
};


createblogModel.updateBlogById = async (id, updatedData) => {
    try {
        let blogModel = await dbmodel.getblogSchema(); // Get the schema/model
        
        // Update the blog by ID and return the updated blog
        let updatedBlog = await blogModel.findByIdAndUpdate(id, updatedData, { new: true });
        
        return updatedBlog; // Return the updated blog, or null if not found
    } catch (error) {
        throw new Error("Error in updating blog by ID: " + error.message); // Handle errors
    }
};


createblogModel.deleteBlogById = async (id) => {
    try {
        let blogModel = await dbmodel.getblogSchema(); // Get the schema/model
        
        // Delete the blog by ID and return the result
        let deletedBlog = await blogModel.findByIdAndDelete(id);
        
        return deletedBlog; // Return the deleted blog, or null if not found
    } catch (error) {
        throw new Error("Error in deleting blog by ID: " + error.message); // Handle errors
    }
};

createblogModel.checklogin = async (email, password) => {
    try {
        // Retrieve user data by email
        let loginModel = await dbmodel.getloginSchema();
        
        let user = await loginModel.findOne({ email: email })
        
        if (user) {
            const isMatch = await bcrypt.compare(password, user.password);

            if (isMatch) {
                return { message: "Login Success", id: user._id }
            } else {
                return { message: "Please Enter Correcet Password" }
            }
        } else {
            return { message: "Please Enter Correct Email" }
        }

    } catch (error) {
        // If any error occurs, rethrow it
        throw error;
    }
};

module.exports = createblogModel;

const dbmodel = require('../utilities/connections');
const createblogModel = {};

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




module.exports = createblogModel;

const express = require('express');
const router = express.Router();
const createblogservice = require('../service/createblogservice');

//Route 1: Registering Profile in Database (POST: "/register")
router.post('/createblog', async (req, res, next) => {
  try {
    
    const {title,content,createdAt,tag } = req.body;
    
    let adduser = await createblogservice.insertData({ title,content,createdAt,tag });
    if (adduser) {
      res
        .status(200)
        .json({ 'message': "Successfully added" });
    }
  } catch (error) {
    res
      .status(400)
      .json("Something went wrong");

  }
});

router.get("/allblog", async (req, res, next) => {
  try {

    const allblogs = await createblogservice.allblogs();

    if (allblogs) {
      res
        .status(200)
        .json(allblogs)
    }
    else {
      res
        .status(404)
        .json({ "message": "No test found" })
    }

  } catch (error) {
    res
      .status(400)
      .json("Something went wrong")
    //Going to the error handler middleware

  }
})


module.exports = router;

const express = require('express');
const router = express.Router();
const createblogservice = require('../service/createblogservice');
const jwt = require('jsonwebtoken');
const dotenv   = require('dotenv');
const verifyJWT = require('../midalware/auth.midalware');



dotenv.config({
  path: './.env'
})

const JWT_KEY = process.env.JWT_KEY

//Route 1: Registering Profile in Database (POST: "/register")
router.post('/createblog',verifyJWT, async (req, res, next) => {
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



router.get("/getblog/:id",verifyJWT, async (req, res, next) => {
  try {
    const { id } = req.params; // Get the ID from the request parameters

    const blog = await createblogservice.getBlogById(id); // Call your service to get the blog by ID

    if (blog) {
      res.status(200).json(blog); // Respond with the blog data if found
    } else {
      res.status(404).json({ message: "Blog not found" }); // Return a 404 if no blog is found
    }
  } catch (error) {
    res.status(400).json({ message: "Something went wrong" }); // Handle any errors
    // Optional: Call your error handler middleware if necessary
  }
});



router.put("/updateblog/:id",verifyJWT, async (req, res, next) => {
  try {
    const { id } = req.params; // Get the ID from the request parameters
    const updatedData = req.body; // Get the updated blog data from the request body

    const updatedBlog = await createblogservice.updateBlogById(id, updatedData); // Call your service to update the blog

    if (updatedBlog) {
      res.status(200).json(updatedBlog); // Respond with the updated blog data if successful
    } else {
      res.status(404).json({ message: "Blog not found" }); // Return a 404 if no blog is found
    }
  } catch (error) {
    res.status(400).json({ message: "Something went wrong" }); // Handle any errors
    // Optional: Call your error handler middleware if necessary
  }
});

router.delete("/deleteblog/:id",verifyJWT, async (req, res, next) => {
  try {
    const { id } = req.params; // Get the ID from the request parameters

    const deletedBlog = await createblogservice.deleteBlogById(id); // Call your service to delete the blog

    if (deletedBlog) {
      res.status(200).json({ message: "Blog deleted successfully" }); // Respond with a success message
    } else {
      res.status(404).json({ message: "Blog not found" }); // Return a 404 if no blog is found
    }
  } catch (error) {
    res.status(400).json({ message: "Something went wrong" }); // Handle any errors
    // Optional: Call your error handler middleware if necessary
  }
});



router.post('/admin/login', async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await createblogservice.login(email, password);
    const token = jwt.sign({ userId: user.id }, JWT_KEY, { expiresIn: '1h' });

    if (!user || user.message !== "Login Success") {
      return res
        .status(401)
        .json({ message: "Invalid credentials" });
    }
    const options = {
      httpOnly: true,
      secure: true
    }

    return res.
      status(200)
      .cookie("token", token, options)
      .json({ token, message: "User logged in successfully" })

  } catch (error) {
    res
      .status(400)
      .json("Something went wrong")
    //Going to the error handler middleware
    // next(error);
  }
});



module.exports = router;

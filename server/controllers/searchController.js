const Blog = require('../models/blogModel');

const searchBlogs = async (req, res) =>{
    const { query } = req.query;
    try{
        const blogs = await Blog.find({
            $or: [
                { title: { $regex: query, $options: 'i' } }
            ]
        });
        res.json(blogs);
    }catch(error){
        res.status(500).json({ message: 'Server Error' });
    }
}

module.exports = { searchBlogs };
const Blog = require('../models/blogModel');
const { z } = require('zod');

const blogSchema = z.object({
    title: z.string().min(1),
    subtitle: z.string().max(60),
    desc: z.string().min(100)
});

const addBlog = async (req, res) => {
    console.log('Blog create invoked');
    try {
        const blogData = blogSchema.parse(req.body);
        const blog = new Blog(blogData);
        await blog.save();
        res.status(201).json(blog);
    } catch (error) {
        res.status(400).json("Failed adding blog");
    }
};

const getAllBlogs = async(req,res) =>{
    try{
      const blogs = await Blog.find();
      res.json(blogs);
    }catch (err){
        res.status(500).json({message:err.message});
    }
};

const getBlogById = async(req,res) =>{
    try{
        const blog = await Blog.findById(req.params.id);
        if(!blog){
            return res.status(404).json({message:'Blog not found'});
        }
        res.json(blog);
    }catch(error){
        res.status(500).json({message:error.message});
    }
}

const updateBlog = async (req, res) => {
    try {
      const updates = blogSchema.partial().parse(req.body);
      const blog = await Blog.findByIdAndUpdate(req.params.id, updates, { new: true });
      if (!blog) {
        return res.status(404).json({ message: 'Blog not found' });
      }
      res.json(blog);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
};

const deleteBlog = async (req, res) => {
    try {
      const blog = await Blog.findByIdAndDelete(req.params.id);
      if (!blog) {
        return res.status(404).json({ message: 'Blog not found' });
      }
      res.json({ message: 'Blog deleted' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

module.exports = { addBlog,getAllBlogs,getBlogById,updateBlog,deleteBlog};

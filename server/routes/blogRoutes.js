const express = require('express');
const router = express.Router();
const { addBlog, getAllBlogs, getBlogById, updateBlog, deleteBlog } = require('../controllers/blogController');
const { searchBlogs } = require('../controllers/searchController');


router.post('/', addBlog);
router.get('/',getAllBlogs);
router.get('/search', searchBlogs);
router.get('/:id',getBlogById);
router.put('/:id',updateBlog);
router.delete('/:id', deleteBlog);

// router.get('/test', (req, res) => {
//     res.send('blogs test route works!');
// });


module.exports = router;

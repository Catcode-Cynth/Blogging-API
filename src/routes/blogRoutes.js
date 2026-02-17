const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');  
const {
  createBlog,
  getPublishedBlogs,
  getBlogById,
  updateBlog,
  deleteBlog,
  getOwnBlogs,
  publishBlog   
} = require('../controllers/blogController');

// GET /api/v1/blogs (public, paginated, searchable, orderable)
router.get('/', getPublishedBlogs);

// GET /api/v1/blogs/:id (public, increments read_count)
router.get('/:id', getBlogById);

// POST /api/v1/blogs (create draft blog, requires JWT)
router.post('/', auth, createBlog);

// PUT /api/v1/blogs/:id (update blog, requires JWT)
router.put('/:id', auth, updateBlog);

// DELETE /api/v1/blogs/:id (delete blog, requires JWT)
router.delete('/:id', auth, deleteBlog);

// GET /api/v1/blogs/myblogs (owner’s blogs, requires JWT)
router.get('/myblogs', auth, getOwnBlogs);

// PATCH /api/v1/blogs/:id/publish (publish blog, requires JWT)
router.patch('/:id/publish', auth, publishBlog);

module.exports = router;


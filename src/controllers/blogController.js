const Blog = require("../models/blog"); // ✅ Correct import
const mongoose = require("mongoose");

/* ======================================================
   ✅ CREATE BLOG (Draft by default)
====================================================== */
exports.createBlog = async (req, res) => {
  try {
    const { title, description, tags, body } = req.body;

    const newBlog = new Blog({
      title,
      description,
      tags,
      body,
      author: req.user.id,
      state: "draft",
    });

    await newBlog.save();

    res.status(201).json(newBlog);
  } catch (err) {
    res.status(500).json({
      msg: "Blog creation failed",
      error: err.message,
    });
  }
};
/* ======================================================
   ✅ PUBLISH BLOG (Owner only)
====================================================== */
exports.publishBlog = async (req, res) => {
  try {
    const blog = await Blog.findOne({
      _id: req.params.id,
      author: req.user.id,
    });

    if (!blog) {
      return res.status(404).json({ msg: "Blog not found" });
    }

    blog.state = "published";
    await blog.save();

    res.json({
      msg: "Blog published successfully",
      blog,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ msg: "Server error", error: err.message });
  }
};

/* ======================================================
   ✅ GET ALL PUBLISHED BLOGS (Public + Pagination)
====================================================== */
exports.getPublishedBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find({ state: "published" });
    return res.status(200).json(blogs);   // ✅ return ensures no second response
  } catch (err) {
    console.error("Get blogs error:", err);
    return res.status(500).json({ msg: err.message });
  }
};

/* ======================================================
   ✅ GET SINGLE BLOG BY ID (Public + Read Count)
====================================================== */
exports.getBlogById = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ msg: "Invalid blog ID" });
    }

    const blog = await Blog.findById(req.params.id).populate(
      "author",
      "first_name last_name email"
    );

    if (!blog) {
      return res.status(404).json({ msg: "Blog not found" });
    }

    if (blog.state !== "published") {
      return res.status(403).json({
        msg: "This blog is not published yet",
      });
    }

    blog.read_count += 1;
    await blog.save();

    res.status(200).json(blog);
  } catch (err) {
    return res.status(500).json({ msg: "Server error", error: err.message });
  }
};

/* ======================================================
   ✅ UPDATE BLOG (Owner only)
====================================================== */
exports.updateBlog = async (req, res) => {
  try {
    const blog = await Blog.findOne({
      _id: req.params.id,
      author: req.user.id,
    });

    if (!blog) return res.status(404).json({ msg: "Blog not found" });

    Object.assign(blog, req.body);
    await blog.save();

    res.json({
      msg: "Blog updated successfully",
      blog,
    });
  } catch (err) {
    return res.status(500).json({ msg: "Server error", error: err.message });
  }
};

/* ======================================================
   ✅ DELETE BLOG (Owner only)
====================================================== */
exports.deleteBlog = async (req, res) => {
  try {
    const blog = await Blog.findOneAndDelete({
      _id: req.params.id,
      author: req.user.id,
    });

    if (!blog) return res.status(404).json({ msg: "Blog not found" });

    res.json({ msg: "Blog deleted successfully" });
  } catch (err) {
   return res.status(500).json({ msg: "Server error", error: err.message });
  }
};

/* ======================================================
   ✅ GET LOGGED-IN USER BLOGS (Draft + Published)
====================================================== */
exports.getOwnBlogs = async (req, res) => {
  try {
    const { state } = req.query;

    let query = { author: req.user.id };
    if (state) query.state = state;

    const blogs = await Blog.find(query)
      .populate("author", "first_name last_name email")
      .sort({ createdAt: -1 });

    res.json({
      total: blogs.length,
      blogs,
    });
  } catch (err) {
    return res.status(500).json({ msg: "Server error", error: err.message });
  }
};

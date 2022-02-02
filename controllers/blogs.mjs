import { Router } from "express";
import { Blog } from "../models/index.mjs";

const router = Router();

const blogFinder = async (req, res, next) => {
  req.blog = await Blog.findByPk(req.params.id);
  next();
};

router.get("/", async (req, res) => {
  const blogs = await Blog.findAll();
  res.json(blogs);
});

router.post("/", async (req, res) => {
  const newBlog = req.body;
  const blog = await Blog.create(newBlog);
  res.json(blog);
});

router.get("/:id", blogFinder, async (req, res) => {
  if (req.blog) {
    res.json(req.blog);
  } else {
    res.status(404).end();
  }
});

router.delete(":id", blogFinder, async (req, res) => {
  if (req.blog) {
    await req.blog.destroy();
  } else {
    res.status(404).end();
  }
});

export default router;
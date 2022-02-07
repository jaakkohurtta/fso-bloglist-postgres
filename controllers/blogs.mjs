import { Router } from "express";
import { Blog, User } from "../models/index.mjs";
import { blogFinder, tokenExtractor } from "../utils/middleware.mjs";

const router = Router();

router.get("/", async (req, res) => {
  const blogs = await Blog.findAll({
    attributes: { exclude: ["userId"] },
    include: {
      model: User,
      attributes: ["name"],
    },
  });
  res.json(blogs);
});

router.post("/", tokenExtractor, async (req, res, next) => {
  try {
    const user = await User.findByPk(req.decodedToken.id);
    const blog = await Blog.create({ ...req.body, userId: user.id });
    res.json(blog);
  } catch (e) {
    next({ error: e.name, message: e.message });
  }
});

router.get("/:id", blogFinder, async (req, res) => {
  if (req.blog) {
    res.json(req.blog);
  } else {
    res.status(404).end();
  }
});

router.put("/:id", blogFinder, async (req, res, next) => {
  if (req.blog) {
    try {
      req.blog.likes = req.body.likes;
      await req.blog.save();
      res.json(req.blog);
    } catch (e) {
      next({ error: e.name, message: e.message });
    }
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

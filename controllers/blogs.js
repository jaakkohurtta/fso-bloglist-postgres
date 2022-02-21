const { Router } = require("express");
const { Op } = require("sequelize");
const { Blog, User } = require("../models/index");
const { blogFinder, tokenExtractor } = require("../utils/middleware");

const router = Router();

router.get("/", async (req, res) => {
  let where = {};

  if (req.query.search) {
    where = {
      [Op.or]: [
        { author: { [Op.iLike]: `%${req.query.search}%` } },
        { title: { [Op.iLike]: `%${req.query.search}%` } },
      ],
    };
  }
  const blogs = await Blog.findAll({
    attributes: { exclude: ["userId"] },
    include: {
      model: User,
      attributes: ["name"],
    },
    where,
    order: [["likes", "DESC"]],
  });
  res.json(blogs);
});

router.post("/", tokenExtractor, async (req, res, next) => {
  if (req.decodedToken) {
    try {
      const user = await User.findByPk(req.decodedToken.id);
      const blog = await Blog.create({
        ...req.body,
        userId: user.id,
      });
      res.json(blog);
    } catch (e) {
      next({ error: e.name, message: e.message });
    }
  } else {
    res.status(403).end();
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

router.delete("/:id", blogFinder, tokenExtractor, async (req, res) => {
  if (req.decodedToken && req.blog) {
    if (req.decodedToken.id === req.blog.userId) {
      await req.blog.destroy();
      res.status(200).end();
    } else {
      res.status(403).end();
    }
  } else {
    res.status(404).end();
  }
});

module.exports = router;

import { Router } from "express";
import { Sequelize } from "sequelize";
import { Blog } from "../models/index.mjs";

const router = Router();

router.get("/", async (req, res) => {
  const authors = await Blog.findAll({
    attributes: [
      "author",
      [Sequelize.fn("count", Sequelize.col("author")), "blogs"],
      [Sequelize.fn("sum", Sequelize.col("likes")), "likes"],
    ],
    group: "author",
    order: [[Sequelize.col("likes"), "DESC"]],
  });

  if (authors) {
    res.json(authors);
  } else {
    res.status(404).end();
  }
});

export default router;

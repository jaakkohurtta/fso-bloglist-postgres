const { Router } = require("express");
const { Sequelize } = require("sequelize");
const { Blog } = require("../models/index");

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

module.exports = router;

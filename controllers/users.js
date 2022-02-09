const { Router } = require("express");
const bcrypt = require("bcrypt");
const { Blog, User } = require("../models/index");
const { tokenExtractor } = require("../utils/middleware");

const router = Router();

router.get("/", async (req, res) => {
  const users = await User.findAll({
    attributes: { exclude: ["passwordHash"] },
    include: {
      model: Blog,
      attributes: { exclude: ["userId"] },
    },
  });
  res.json(users);
});

router.post("/", async (req, res, next) => {
  try {
    const newUser = {
      username: req.body.username,
      name: req.body.name,
      passwordHash: await bcrypt.hash(req.body.password, 12),
    };
    const user = await User.create(newUser);
    res.json(user);
  } catch (e) {
    next({ error: e.name, message: e.message });
  }
});

router.get("/:id", async (req, res) => {
  const user = await User.findByPk(req.params.id);
  if (user) {
    res.json(user);
  } else {
    res.status(404).end();
  }
});

router.put("/:username", tokenExtractor, async (req, res, next) => {
  if (req.decodedToken) {
    try {
      const user = await User.findOne({
        where: { username: req.params.username },
      });

      if (req.decodedToken.username !== user.username) {
        return res.status(401).json({ error: "Unauthorized request." });
      }

      user.name = req.body.name;
      await user.save();
      res.json(user);
    } catch (e) {
      next({ error: e.name, message: e.message });
    }
  } else {
    res.status(400);
  }
});

module.exports = router;

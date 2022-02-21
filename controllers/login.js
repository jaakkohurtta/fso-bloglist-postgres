const { Router } = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { User, Session } = require("../models/index");
const { JWT_SECRET } = require("../utils/config");

const router = Router();

router.post("/", async (req, res, next) => {
  const user = await User.findOne({ where: { username: req.body.username } });
  const auth =
    user === null
      ? false
      : await bcrypt.compare(req.body.password, user.passwordHash);

  if (auth) {
    const userForToken = {
      username: user.username,
      id: user.id,
    };
    const token = jwt.sign(userForToken, JWT_SECRET);

    await Session.create({ userId: user.id, token });

    res.status(200).send({ token, username: user.username, name: user.name });
  } else {
    res.status(401).send({ error: "Invalid username or password" });
  }
});

module.exports = router;

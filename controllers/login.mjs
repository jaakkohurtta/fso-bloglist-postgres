import { Router } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { JWT_SECRET } from "../utils/config.mjs";
import { User } from "../models/index.mjs";

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

    res.status(200).send({ token, username: user.username, name: user.name });
  } else {
    res.status(401).send({ error: "Invalid username or password" });
  }
});

export default router;

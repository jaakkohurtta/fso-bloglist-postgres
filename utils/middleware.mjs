import jwt from "jsonwebtoken";

import { Blog } from "../models/index.mjs";
import { JWT_SECRET } from "./config.mjs";

export const blogFinder = async (req, res, next) => {
  try {
    req.blog = await Blog.findByPk(req.params.id);
    next();
  } catch (e) {
    next({ error: e.name, message: e.message });
  } // In case someone wants to find blogs with a string id, /api/blogs/123abc
};

export const tokenExtractor = (req, res, next) => {
  const authorization = req.get("authorization");
  if (authorization && authorization.toLowerCase().startsWith("bearer ")) {
    try {
      console.log(authorization.substring(7));
      req.decodedToken = jwt.verify(authorization.substring(7), JWT_SECRET);
    } catch (e) {
      console.log(e);
      return res.status(401).json({ error: "Invalid token." });
    }
  } else {
    return res.status(401).json({ error: "Missing token." });
  }
  next();
};

export const errorHandler = async (err, req, res, next) => {
  console.log(err);
  res.status(400).json(err);
};

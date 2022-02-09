const jwt = require("jsonwebtoken");

const { Blog, User } = require("../models/index");
const { JWT_SECRET } = require("./config");

const blogFinder = async (req, res, next) => {
  try {
    req.blog = await Blog.findByPk(req.params.id, {
      include: {
        model: User,
        attributes: ["name"],
      },
    });
    next();
  } catch (e) {
    next({ error: e.name, message: e.message });
  } // In case someone wants to find blogs with a string id, /api/blogs/123abc
};

const tokenExtractor = (req, res, next) => {
  const authorization = req.get("authorization");
  if (authorization && authorization.toLowerCase().startsWith("bearer ")) {
    try {
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

const errorHandler = async (err, req, res, next) => {
  console.log(err);
  res.status(400).json(err);
};

module.exports = {
  blogFinder,
  tokenExtractor,
  errorHandler,
};

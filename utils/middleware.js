const jwt = require("jsonwebtoken");

const { Blog, User, Session } = require("../models/index");
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

const sessionHandler = async (req, res, next) => {
  const authorization = req.get("authorization");
  if (authorization && authorization.toLowerCase().startsWith("bearer ")) {
    const token = authorization.substring(7);
    const decodedToken = jwt.verify(token, JWT_SECRET);

    const user = await User.findByPk(decodedToken.id);
    if (user.disabled) {
      const sessions = await Session.findAll({
        where: { userId: decodedToken.id },
      });
      sessions.forEach(async (s) => await s.destroy());
    }
  }
  next();
};

const tokenExtractor = async (req, res, next) => {
  const authorization = req.get("authorization");
  if (authorization && authorization.toLowerCase().startsWith("bearer ")) {
    try {
      const token = authorization.substring(7);
      const session = await Session.findOne({ where: { token } });

      if (session) {
        req.decodedToken = jwt.verify(token, JWT_SECRET);
      } else {
        res.status(401).json({ error: "Session expired." });
      }
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
  sessionHandler,
};

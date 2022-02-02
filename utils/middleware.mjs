import { Blog } from "../models/index.mjs";

export const blogFinder = async (req, res, next) => {
  try {
    req.blog = await Blog.findByPk(req.params.id);
    next();
  } catch (e) {
    next({ error: e.name, message: e.message });
  } // In case someone wants to find blogs with a string id, /api/blogs/123abc
};

export const errorHandler = async (err, req, res, next) => {
  console.log(err);
  res.status(400).json(err);
};

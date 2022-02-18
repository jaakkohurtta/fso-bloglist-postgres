const Blog = require("./blog");
const User = require("./user");
const Readinglist = require("./readinglist");

User.hasMany(Blog);
User.hasMany(Readinglist);

Blog.belongsTo(User);
Blog.hasMany(Readinglist);

Readinglist.belongsTo(User);
Readinglist.belongsTo(Blog);

User.belongsToMany(Blog, { through: Readinglist, as: "readinglistBlogs" });
Blog.belongsToMany(User, { through: Readinglist, as: "usersReadinglist" });

module.exports = { Blog, User, Readinglist };

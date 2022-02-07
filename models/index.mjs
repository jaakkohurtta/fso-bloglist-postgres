import Blog from "./blog.mjs";
import User from "./user.mjs";

User.hasMany(Blog);
Blog.belongsTo(User);

Blog.sync({ alter: true });
User.sync({ alter: true });

export { Blog, User };

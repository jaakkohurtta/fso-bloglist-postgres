import "dotenv/config";
import { Blog, sequelize } from "./models/blog.mjs";

const main = async () => {
  try {
    await sequelize.authenticate();
    const blogs = await Blog.findAll();

    console.log("\n-< TABLE: BLOGS >-");
    blogs.forEach((blog) => {
      console.log(`${blog.author}: "${blog.title}", ${blog.likes} likes`);
    });

    sequelize.close();
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

main();

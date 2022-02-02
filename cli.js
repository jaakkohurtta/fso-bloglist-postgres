import "dotenv/config";
import { Blog } from "./models/index.mjs";
import { sequelize, connectToDatabase } from "./utils/db.mjs";

const main = async () => {
  await connectToDatabase();
  const blogs = await Blog.findAll();

  console.log("\n-< TABLE: BLOGS >-");
  blogs.forEach((blog) => {
    console.log(`${blog.author}: "${blog.title}", ${blog.likes} likes`);
  });

  sequelize.close();
};

main();

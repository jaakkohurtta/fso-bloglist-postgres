const { Blog } = require("./models/index");
const { sequelize, connectToDatabase } = require("./utils/db");

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

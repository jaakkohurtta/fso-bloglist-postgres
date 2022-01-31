import "dotenv/config";
import express from "express";
import { Sequelize, Model, DataTypes } from "sequelize";

const app = express();

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
});

class Blog extends Model {}
Blog.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    author: {
      type: DataTypes.TEXT,
    },
    url: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    title: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    likes: {
      type: DataTypes.INTEGER,
    },
  },
  { sequelize, underscored: true, timestamps: false, modelName: "blog" },
);

// Mids
app.use(express.json());

app.get("/api/blogs", async (req, res) => {
  const blogs = await Blog.findAll();
  res.json(blogs);
});

app.post("/api/blogs", async (req, res) => {
  const newBlog = req.body;
  const blog = await Blog.create(newBlog);
  res.json(blog);
});

app.get("/api/blogs/:id", async (req, res) => {
  const blog = await Blog.findByPk(req.params.id);
  if (blog) {
    res.json(blog);
  } else {
    res.status(404).end();
  }
});

app.delete("/api/blogs/:id", async (req, res) => {
  try {
    await Blog.destroy({ where: { id: req.params.id } });
  } catch (e) {
    res.status(404).end();
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running at port ${PORT}`);
});
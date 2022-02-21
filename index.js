const express = require("express");

const { connectToDatabase } = require("./utils/db");
const { errorHandler, sessionHandler } = require("./utils/middleware");
const { PORT } = require("./utils/config");

const authorRouter = require("./controllers/authors");
const blogsRouter = require("./controllers/blogs");
const loginRouter = require("./controllers/login");
const logoutRouter = require("./controllers/logout");
const readinglistsRouter = require("./controllers/readinglists");
const userRouter = require("./controllers/users");

const app = express();

app.use(express.json());
app.use(sessionHandler);
app.use("/api/authors", authorRouter);
app.use("/api/blogs", blogsRouter);
app.use("/api/login", loginRouter);
app.use("/api/logout", logoutRouter);
app.use("/api/readinglists", readinglistsRouter);
app.use("/api/users", userRouter);
app.use(errorHandler);

const init = async () => {
  await connectToDatabase();
  app.listen(PORT, () => {
    console.log(`Server running at port ${PORT}`);
  });
};

init();

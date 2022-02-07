import express from "express";

import { connectToDatabase } from "./utils/db.mjs";
import { errorHandler } from "./utils/middleware.mjs";
import { PORT } from "./utils/config.mjs";

import blogsRouter from "./controllers/blogs.mjs";
import loginRouter from "./controllers/login.mjs";
import userRouter from "./controllers/users.mjs";

const app = express();

app.use(express.json());
app.use("/api/blogs", blogsRouter);
app.use("/api/login", loginRouter);
app.use("/api/users", userRouter);
app.use(errorHandler);

const init = async () => {
  await connectToDatabase();
  app.listen(PORT, () => {
    console.log(`Server running at port ${PORT}`);
  });
};

init();

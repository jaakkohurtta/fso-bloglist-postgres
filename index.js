import express from "express";

import blogsRouter from "./controllers/blogs.mjs";
import { errorHandler } from "./utils/middleware.mjs";
import { PORT } from "./utils/config.mjs";

const app = express();

app.use(express.json());
app.use("/api/blogs", blogsRouter);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running at port ${PORT}`);
});

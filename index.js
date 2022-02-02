import express from "express";

import blogRouter from "./controllers/blogs.mjs";
import { PORT } from "./utils/config.mjs";

const app = express();

// Mids
app.use(express.json());
app.use("/api/blogs", blogRouter);

app.listen(PORT, () => {
  console.log(`Server running at port ${PORT}`);
});

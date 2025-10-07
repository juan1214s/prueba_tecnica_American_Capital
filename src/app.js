import express from "express";
import cors from "cors";
import taskRoutes from "./routes/taskRoutes.js"
import { swaggerSpec, swaggerUiMiddleware } from "./swagger.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/tasks", taskRoutes);

app.use("/api-docs", swaggerUiMiddleware.serve, swaggerUiMiddleware.setup(swaggerSpec));

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Internal Server Error");
});

export default app;

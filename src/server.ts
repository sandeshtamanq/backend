import express from "express";
import { dbConnection } from "./typeorm/typeorm.connection";
import { authRoutes } from "./routes/auth/auth.routes";
import morgan from "morgan";
require("dotenv").config();
const app = express();

dbConnection()
  .then((res) => {
    app.listen(process.env.PORT, () => console.log(`Listening to port ${process.env.PORT}`));
  })
  .catch((err) => console.log(err));

app.use(express.json());
app.use(morgan("dev"));
app.use("/api/auth", authRoutes);
app.use((req, res, next) => {
  res.status(404).json({
    status: 404,
    message: "Not found",
  });
});

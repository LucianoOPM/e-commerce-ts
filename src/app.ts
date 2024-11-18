import express from "express";
import router from "./routes/main.routes";
import { DataBaseSingleton } from "./db/connection";
import config from "./config/config";
import cookieParser from "cookie-parser";
import { errorHandler } from "./middlewares/error_handler";

const app = express();
DataBaseSingleton.getInstance();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

const PORT = config.PORT;

app.use("/api/v1", router);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

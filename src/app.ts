import express from "express";
import router from "./routes/main.routes";
import { DataBaseSingleton } from "./db/connection";
import config from "./config/config";
import cookieParser from "cookie-parser";

const app = express();
DataBaseSingleton.getInstance();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

const PORT = config.PORT;

app.use("/api/v1", router);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

import dotenv from "dotenv";

dotenv.config();

export default {
  mongoURI: process.env.MONGO_URI as string,
  PORT: process.env.PORT || 3000,
  SALT_ROUNDS: process.env.SALT_ROUNDS || 10,
  JWT_SECRET: process.env.JWT_SECRET as string,
};

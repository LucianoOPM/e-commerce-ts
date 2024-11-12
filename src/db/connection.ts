import mongoose from "mongoose";
import config from "../config/config";

const { mongoURI } = config;

export class DataBaseSingleton {
  private static instance: DataBaseSingleton;
  private constructor() {
    mongoose.connect(mongoURI);
  }

  public static getInstance(): DataBaseSingleton {
    if (!DataBaseSingleton.instance) {
      console.log("Connecting to DB");
      DataBaseSingleton.instance = new DataBaseSingleton();
      return DataBaseSingleton.instance;
    }
    console.log("Already connected to DB");
    return DataBaseSingleton.instance;
  }
}

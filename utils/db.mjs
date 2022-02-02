import { Sequelize } from "sequelize";
import { DATABASE_URL } from "./config.mjs";

export const sequelize = new Sequelize(DATABASE_URL, {
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
});

export const connectToDatabase = async () => {
  try {
    await sequelize.authenticate();
    console.log("Database connected.");
  } catch (err) {
    console.log("Database connection failed");
    return process.exit(1);
  }
  return null;
};

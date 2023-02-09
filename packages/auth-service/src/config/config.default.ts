import { ConfigData } from "./config.interface";

export const DEFAULT_CONFIG: ConfigData = {
  port: Number(process.env.PORT || 3001),
  env: "production",
  db: {
    url: process.env.DATABASE_URL,
  },
  auth: {
    expiresIn: 30000,
    secret: "",
  },
  swagger: {
    username: "",
    password: "",
  },
  logLevel: "",
};

import { ConfigData } from "./config.interface";

export const DEFAULT_CONFIG: ConfigData = {
  port: Number(process.env.PORT || 3001),
  env: "production",
  db: {
    url: process.env.DATABASE_URL!,
  },
  auth: {
    expiresIn: 30000,
    access_token_secret: "",
    refresh_token_secret: "",
  },
  google: {
    oauth_google_id: "",
    oauth_google_callback: "",
    oauth_google_secret: "",
  },
  swagger: {
    username: "",
    password: "",
  },
  logLevel: "",
  elastic: {
    url: "",
  },
};

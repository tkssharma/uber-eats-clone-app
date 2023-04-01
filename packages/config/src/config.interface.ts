export interface ConfigDatabase {
  url: string;
}

export interface ConfigSwagger {
  username: string;
  password: string;
}

export interface AuthConfig {
  expiresIn: number;
  access_token_secret: string;
  refresh_token_secret: string;
}

export interface UserServiceConfig {
  options: UserServiceConfigOptions;
  transport: any;
}

export interface UserServiceConfigOptions {
  host: string;
  port: number;
}

export interface ConfigData {
  env: string;

  port: number;

  db: ConfigDatabase;

  swagger: ConfigSwagger;

  logLevel: string;

  auth: AuthConfig;
}

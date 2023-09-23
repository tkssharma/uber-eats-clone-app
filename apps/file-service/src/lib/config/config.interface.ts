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

export interface ElasticConfig {
  url: string;
  username?: string;
  password?: string;
  index?: string;
}

export interface AWSConfig {
  accessKeyId: string;
  secretAccessKey: string;
  region: string;
  bucket?: string;
}

export interface GoogleConfig {
  oauth_google_id: string;
  oauth_google_callback: string;
  oauth_google_secret: string;
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

  aws: AWSConfig;

  google: GoogleConfig;

  elastic: ElasticConfig;
}

interface IJWT {
  accessTokenSecret: string;
  accessTokenExpiration: string;
  refreshTokenSecret: string;
  refreshTokenExpiration;
}

interface IDatabase {
  host: string;
  type: string;
  name: string;
  port: number;
  // url: string;
  username: string;
  password: string;
  database: string;
  entities: string[];
  synchronize: boolean;

  migrationsRun?: boolean;
  logging?: boolean;
  autoLoadEntities?: boolean;
  migrations?: string[];
  cli?: {
    migrationsDir?: string;
  };
  extra: any;
  ssl: boolean;
}

export interface IConfig {
  port: number;
  database: IDatabase;
  jwt: IJWT;
  newPasswordBytes: number;
  codeBytes: number;
}

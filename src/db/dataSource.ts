import { types } from 'pg';
import { DataSource, DataSourceOptions } from 'typeorm';
import { entities } from './entities';
import {getConfig} from "../config";

const config = getConfig();

types.setTypeParser(
    1700,
    (v) => parseFloat(v),
);

export interface DBConfig {
    host: string;
    port: number;
    username: string;
    password: string;
    database: string;
}

export const getConnectionOptions = (
    dbConfig: DBConfig,
    host?: string,
): DataSource => {
    const config = dbConfig;

    const connectionOptions: DataSourceOptions = {
        type: 'postgres',
        host: host || config.host,
        port: config.port,
        database: config.database,
        username: config.username,
        password: config.password,
        logging: false,
        synchronize: true,
        migrationsRun: false,
        entities,
        migrations: [`${__dirname}/**/migrations/*.{ts,js}`],
    };

    return new DataSource(connectionOptions);
};

const dataSource = getConnectionOptions(
    {
        database: config.DB_NAME,
        host: config.DB_HOST,
        password: config.DB_PASSWORD,
        port: config.DB_PORT,
        username: config.DB_USER,
    },
    process.env.DB_HOST,
);

export default dataSource;

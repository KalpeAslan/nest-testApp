import {Expose, plainToClass, Type} from 'class-transformer';
import {IsNotEmpty, IsNumber, IsString} from 'class-validator';
import 'reflect-metadata';
import * as dotenv from 'dotenv';

export enum EConfigKeys {
    // DB
    DB_NAME = 'DB_NAME',
    DB_USER = 'DB_USER',
    DB_PASSWORD = 'DB_PASSWORD',
    DB_HOST = 'DB_HOST',
    DB_PORT = 'DB_PORT',

    // Scan
    SCAN_API_KEY = 'SCAN_API_KEY',
    SCAN_API_URL = 'SCAN_API_URL',
}

dotenv.config({ path:'.env' });

export class ConfigDto {
    @Expose()
    @IsNotEmpty()
    @IsString()
    DB_NAME: string;

    @Expose()
    @IsNotEmpty()
    @IsString()
    DB_USER: string;

    @Expose()
    @IsNotEmpty()
    @IsString()
    DB_PASSWORD: string;

    @Expose()
    @IsNotEmpty()
    @IsString()
    DB_HOST: string;

    @Expose()
    @Type(() => Number)
    @IsNotEmpty()
    @IsNumber()
    DB_PORT: number;

    @Expose()
    @IsNotEmpty()
    @IsString()
    SCAN_API_KEY: string;

    @Expose()
    @IsNotEmpty()
    @IsString()
    SCAN_API_URL: string;
}


export const getConfig = (): ConfigDto => {
    const config = plainToClass(ConfigDto, process.env, {
        enableImplicitConversion: true,
        excludeExtraneousValues: true,
    });

    return config;
};

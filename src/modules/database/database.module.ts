import {Module} from "@nestjs/common";
import {TypeOrmModule} from "@nestjs/typeorm";
import {AppConfigService} from "../app-config/app-config.service";
import {entities} from "../../db/entities";
import {EConfigKeys} from '../../config'

@Module({
    imports: [
        TypeOrmModule.forRootAsync({
            useFactory: (config: AppConfigService) => ({
                type: 'postgres',
                host: config.get(EConfigKeys.DB_HOST),
                port: config.get(EConfigKeys.DB_PORT),
                database: config.get(EConfigKeys.DB_NAME),
                username: config.get(EConfigKeys.DB_USER),
                password: config.get(EConfigKeys.DB_PASSWORD),
                logging: false,
                synchronize: false,
                migrationsRun: false,
                entities,
            }),
            inject: [AppConfigService],
        }),
    ],
})
export class DatabaseModule {}
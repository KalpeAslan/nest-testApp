import {Module} from '@nestjs/common';
import {AppConfigModule} from '../app-config/app-config.module';
import {DatabaseModule} from "../database/database.module";
import {CoreModule} from "../core/core.module";
import {ScheduleModule} from "@nestjs/schedule";


@Module({
  imports: [
    AppConfigModule,
    DatabaseModule,
    CoreModule,
    ScheduleModule.forRoot()
  ],
})
export class AppModule {}

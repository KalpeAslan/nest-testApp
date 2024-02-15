import { DynamicModule, Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import {AppConfigService} from "./app-config.service";
import {validate} from "./app-config.utils";



@Global()
@Module({
  imports: [ConfigModule.forRoot({ validate })],
  providers: [AppConfigService],
  exports: [AppConfigService],
})
export class AppConfigModule {
  static register(envPath?: string): DynamicModule {
    return {
      module: AppConfigModule,
      imports: [
        ConfigModule.forRoot({ envFilePath: envPath || '.env', validate }),
      ],
      providers: [AppConfigService],
      exports: [AppConfigService],
    };
  }
}

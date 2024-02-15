import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { EConfigKeys } from 'src/config';

@Injectable()
export class AppConfigService {
    constructor(private readonly configService: ConfigService) {}

    get(key: EConfigKeys) {
        return this.configService.get(key) || undefined;
    }
}

import {Injectable, Logger} from "@nestjs/common";
import {Cron} from "@nestjs/schedule";
import {CoreService} from "../core.service";

@Injectable()
export class TransactionsJob {
    private readonly logger  = new Logger(TransactionsJob.name);

    constructor(
        private readonly coreService: CoreService
    ) {
    }

    @Cron('* * * * *')
    async handleCron() {

        this.logger.log(`Started scheduling - CoreService.getAndSaveTransactionsFromScan`);
        await this.coreService.getAndSaveTransactions();
        this.logger.log('Ended scheduling - CoreService.getAndSaveTransactionsFromScan ')
    }
}
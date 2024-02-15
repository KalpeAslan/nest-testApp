import {Logger, Module} from '@nestjs/common';
import { CoreService } from './core.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {Block} from "../../db/entities/Block.entity";
import {Transaction} from "../../db/entities/Transaction.entity";
import {EtherscanService} from './etherscan/etherscan.service';
import {CoreController} from "./core.controller";
import {TransactionsJob} from "./jobs/transactions.job";

@Module({
    providers: [CoreService, EtherscanService, TransactionsJob],
    imports: [
        TypeOrmModule.forFeature([
            Block,
            Transaction,
        ]),
    ],
    controllers: [CoreController]
})
export class CoreModule {}

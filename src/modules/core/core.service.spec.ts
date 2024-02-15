import { Test, TestingModule } from '@nestjs/testing';
import { CoreService } from './core.service';
import {EtherscanService} from "./etherscan/etherscan.service";
import {TransactionsJob} from "./jobs/transactions.job";
import {TypeOrmModule} from "@nestjs/typeorm";
import {Block} from "../../db/entities/Block.entity";
import {Transaction} from "../../db/entities/Transaction.entity";
import {CoreController} from "./core.controller";
import {CoreTypes} from "./core.types";
import AggregatedBalance = CoreTypes.AggregatedBalance;
import {DatabaseModule} from "../database/database.module";
import {AppConfigModule} from "../app-config/app-config.module";
import {CoreModule} from "./core.module";
import {ScheduleModule} from "@nestjs/schedule";

describe('CoreService', () => {
  let service: CoreService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CoreService, EtherscanService, TransactionsJob],
      imports: [
        AppConfigModule,
        DatabaseModule,
        CoreModule,
        TypeOrmModule.forFeature([
          Block,
          Transaction,
        ]),
      ],
      controllers: [CoreController]
    }).compile();

    service = module.get<CoreService>(CoreService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return the address with the largest balance change', () => {
    const incomingAggregation: AggregatedBalance[] = [
      { address: 'address1', balance: 400 },
      { address: 'address2', balance: 200 },
    ];
    const outgoingAggregation: AggregatedBalance[] = [
      { address: 'address1', balance: 50 },
      { address: 'address3', balance: 300 },
    ];

    const result = service.computeAddressWithLargestBalanceChange(incomingAggregation, outgoingAggregation);
    expect(result.address).toEqual('address1');
  });
});

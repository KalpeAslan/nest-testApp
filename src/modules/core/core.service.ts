import {Injectable, Logger} from '@nestjs/common';
import {DataSource, Repository} from "typeorm";
import {Block} from "../../db/entities/Block.entity";
import {InjectRepository} from "@nestjs/typeorm";
import {EtherscanService} from "./etherscan/etherscan.service";
import {Transaction} from "../../db/entities/Transaction.entity";
import {hexToNumber, numberToHex, weiToEther} from "../../utils/eth.utils";
import {TransactionQueries} from "../../db/queries/transaction.queries";
import {CoreTypes} from "./core.types";
import AggregatedBalance = CoreTypes.AggregatedBalance;
import {appConstants} from "../../config/app.constants";

@Injectable()
export class CoreService {
    private readonly logger = new Logger(CoreService.name);

    constructor(
        @InjectRepository(Block)
        private readonly blockRepository: Repository<Block>,
        @InjectRepository(Transaction)
        private readonly transactionRepository: Repository<Transaction>,
        private readonly scanService: EtherscanService,
        private readonly dataSource: DataSource,
    ) {
    }

    async getAddressWithLargestBalanceChange() {
        const maxBlockResult = await this.transactionRepository
            .createQueryBuilder('transaction')
            .select('MAX(transaction.blockId)', 'maxBlockId')
            .getRawOne();

        const maxBlockId = maxBlockResult.maxBlockId;
        const minBlockIdForRange = maxBlockId - appConstants.MAX_BLOCK_COUNT;

        const incomingAggregation = await this.transactionRepository
            .createQueryBuilder('transaction')
            .select('transaction.transactionTo', 'address')
            .addSelect('SUM(CAST(transaction.value AS DECIMAL))', 'incoming')
            .where('transaction.blockId > :minBlockIdForRange', { minBlockIdForRange })
            .groupBy('transaction.transactionTo')
            .getRawMany();

        const outgoingAggregation = await this.transactionRepository
            .createQueryBuilder('transaction')
            .select('transaction.transactionFrom', 'address')
            .addSelect('SUM(CAST(transaction.value AS DECIMAL))', 'outgoing')
            .where('transaction.blockId > :minBlockIdForRange', { minBlockIdForRange })
            .groupBy('transaction.transactionFrom')
            .getRawMany();

        return this.computeAddressWithLargestBalanceChange(incomingAggregation, outgoingAggregation);
    }

    computeAddressWithLargestBalanceChange(
        incomingAggregation: AggregatedBalance[],
        outgoingAggregation: AggregatedBalance[]
    ) {
        const netChanges = new Map<string, number>();

        incomingAggregation.forEach(({ address, balance }) => {
            netChanges.set(address, balance);
        });

        outgoingAggregation.forEach(({ address, balance }) => {
            const currentBalance = netChanges.get(address) || 0;
            netChanges.set(address, currentBalance - balance);
        });

        let addressWithLargestChange = null;
        let maxChange = 0;
        netChanges.forEach((change, address) => {
            if (!addressWithLargestChange || Math.abs(change) > maxChange) {
                addressWithLargestChange = address;
                maxChange = Math.abs(change);
            }
        });

        return {
            address: addressWithLargestChange || ''
        };
    }


    getActiveAddress() {
        return this.dataSource.query(TransactionQueries.GET_MOST_FREQUENCY_ADDRESS);
    }


    getAllTransactions() {
        return this.transactionRepository.find();
    }

    async getAllBlocks() {
        const blocks = await this.blockRepository.find().then();
        return blocks.map(block => ({
            ...block,
            blockNumberInNormalFormat: hexToNumber(block.number)
        }))
    }




    async getAndSaveTransactions() {
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();

        try {

            const lastBlock = await this.computeBlockNumber();

            const block = await queryRunner.manager.save(Block, {
                number: numberToHex(lastBlock)
            });


            const { result: { timestamp, transactions} } = await this.scanService.getTransactions(numberToHex(lastBlock));

            for (const tx of transactions) {
                await queryRunner.manager.save(Transaction, {
                    timestamp: new Date(hexToNumber(timestamp) * 1000).toISOString(),
                    transactionFrom: tx.from,
                    transactionTo: tx.to,
                    value: weiToEther(tx.value),
                    hash: tx.hash,
                    blockId: block.id
                });
            }

            await queryRunner.commitTransaction();
            this.logger.log(`Transactions for block: ${lastBlock} was saved`)
        } catch (e) {
            this.logger.error('Error saving transactions:', e)
            await queryRunner.rollbackTransaction();
        } finally {
            await queryRunner.release();
        }
    }

    private async computeBlockNumber(): Promise<number> {
        const lastSavedBlock = await this.blockRepository.find({
            order: { id: 'DESC' },
            take: 1
        });

        if (!lastSavedBlock.length) return appConstants.INIT_BLOCK_NUMBER;

        return hexToNumber(lastSavedBlock[0].number) + 1;
    }


}

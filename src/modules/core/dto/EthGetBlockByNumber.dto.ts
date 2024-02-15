import {EtherscanTransactionDto} from "./EtherscanTransaction.dto";

export interface EthGetBlockByNumberDto {
    difficulty: string,
    extraData: string
    gasLimit: string
    gasUsed: string,
    hash: string,
    logsBloom: string,
    miner: string,
    mixHash: string,
    nonce: string,
    number: string,
    parentHash: string,
    receiptsRoot: string,
    sha3Uncles: string,
    size: string,
    stateRoot: string,
    timestamp: string,
    totalDifficulty: string,
    transactions: EtherscanTransactionDto[],
    transactionsRoot: string,
    uncles: []

}
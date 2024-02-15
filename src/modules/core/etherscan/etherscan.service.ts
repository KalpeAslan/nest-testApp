import { Injectable } from '@nestjs/common';
import {AppConfigService} from "../../app-config/app-config.service";
import {EthGetBlockByNumberDto} from "../dto/EthGetBlockByNumber.dto";
import axios, {AxiosInstance} from "axios";
import {EConfigKeys} from "../../../config";
import {EthBlockNumberDto} from "../dto/EthBlockNumber.dto";
import {CoreTypes} from "../core.types";
import IEtherscanResponse = CoreTypes.IEtherscanResponse;

@Injectable()
export class EtherscanService {
    private readonly scanApiKey: string;
    private readonly scanApiUrl: string;
    private readonly axios: AxiosInstance;


    constructor(
        private readonly appConfigService: AppConfigService,
    ) {
        this.scanApiKey = this.appConfigService.get(EConfigKeys.SCAN_API_KEY);
        this.scanApiUrl = this.appConfigService.get(EConfigKeys.SCAN_API_URL);
        this.axios = axios.create({
            baseURL: this.scanApiUrl as string
        });
    }

    async getTransactions(blockNumber: string): Promise<IEtherscanResponse<EthGetBlockByNumberDto>> {
        return await this.axios.get(`/api?module=proxy&action=eth_getBlockByNumber&tag=${blockNumber}&boolean=true&apiKey=${this.scanApiKey}`)
            .then(res => res.data) as IEtherscanResponse<EthGetBlockByNumberDto>;
    }

    async getLastBlock(): Promise<EthBlockNumberDto> {
        return this.axios.get(`/api?module=proxy&action=eth_blockNumber`).then(res => res.data as EthBlockNumberDto)
    }


}

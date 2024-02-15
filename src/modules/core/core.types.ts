export namespace CoreTypes {
    export interface IEtherscanResponse<T> {
        jsonrpc: string
        id: number
        result: T
    }

    export interface AggregatedBalance {
        address: string;
        balance: number;
    }
}
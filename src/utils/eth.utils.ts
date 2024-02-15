import {ethers} from "ethers";

export function hexToNumber(number: string) {
    return parseInt(number, 16);
}

export function weiToEther(weiValue: bigint | string): string {
    return ethers.formatEther(weiValue);
}

export function numberToHex(number: number) {
    return number.toString(16);
}
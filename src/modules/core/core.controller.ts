import {Controller, Get} from '@nestjs/common';
import {CoreService} from "./core.service";

@Controller('core')
export class CoreController {
    constructor(
        private readonly coreService: CoreService
    ) {
    }

    @Get('/getActiveAddress')
    getActiveAddress() {
        return this.coreService.getActiveAddress();
    }

    @Get('/getAddressWithLargestBalanceChange')
    getAddressWithLargestBalanceChange() {
        return this.coreService.getAddressWithLargestBalanceChange();
    }

    @Get('/getAllTransactions')
    getAllTransactions() {
        return this.coreService.getAllTransactions();
    }

    @Get('getAllBlocks')
    getAllBlocks() {
        return this.coreService.getAllBlocks();
    }
}

import { Model } from 'mongoose';
import { SwapDocument } from './schemas/swap.schema';
export declare class SwapsService {
    private readonly swapModel;
    private readonly logger;
    constructor(swapModel: Model<SwapDocument>);
    createSwap(data: {
        userId?: string;
        userEmail?: string;
        coinSymbol: string;
        coinName: string;
        usdAmount: number;
        estimatedAmount: number;
        priceAtSwap: number;
    }): Promise<SwapDocument>;
    getAllSwaps(): Promise<SwapDocument[]>;
    getUserSwaps(userIdOrEmail: string): Promise<SwapDocument[]>;
}

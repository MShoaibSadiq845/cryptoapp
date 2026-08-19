import { SwapsService } from './swaps.service';
export declare class SwapsController {
    private readonly swapsService;
    constructor(swapsService: SwapsService);
    createSwap(body: {
        userId?: string;
        userEmail?: string;
        coinSymbol: string;
        coinName: string;
        usdAmount: number;
        estimatedAmount: number;
        priceAtSwap: number;
    }): Promise<{
        success: boolean;
        message: string;
        swap: import("./schemas/swap.schema").SwapDocument;
    }>;
    getSwaps(email?: string): Promise<{
        success: boolean;
        count: number;
        swaps: import("./schemas/swap.schema").SwapDocument[];
    }>;
}

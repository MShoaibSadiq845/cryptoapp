import { Document } from 'mongoose';
export type SwapDocument = Swap & Document;
export declare class Swap {
    userId?: string;
    userEmail?: string;
    coinSymbol: string;
    coinName: string;
    usdAmount: number;
    estimatedAmount: number;
    priceAtSwap: number;
    status: string;
}
export declare const SwapSchema: import("mongoose").Schema<Swap, import("mongoose").Model<Swap, any, any, any, Document<unknown, any, Swap, any, {}> & Swap & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Swap, Document<unknown, {}, import("mongoose").FlatRecord<Swap>, {}, import("mongoose").DefaultSchemaOptions> & import("mongoose").FlatRecord<Swap> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;

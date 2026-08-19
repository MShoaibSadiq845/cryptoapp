import { Document } from 'mongoose';
export type SubscriberDocument = Subscriber & Document;
export declare class Subscriber {
    email: string;
    status: string;
    subscribedAt: Date;
    confirmationEmailSent: boolean;
}
export declare const SubscriberSchema: import("mongoose").Schema<Subscriber, import("mongoose").Model<Subscriber, any, any, any, Document<unknown, any, Subscriber, any, {}> & Subscriber & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Subscriber, Document<unknown, {}, import("mongoose").FlatRecord<Subscriber>, {}, import("mongoose").DefaultSchemaOptions> & import("mongoose").FlatRecord<Subscriber> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;

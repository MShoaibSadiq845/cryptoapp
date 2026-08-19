import { Model } from 'mongoose';
import { Subscriber, SubscriberDocument } from './schemas/subscriber.schema';
export declare class NewsletterService {
    private readonly subscriberModel;
    private readonly logger;
    private transporter;
    constructor(subscriberModel: Model<SubscriberDocument>);
    subscribe(email: string): Promise<{
        success: boolean;
        message: string;
        email: string;
    }>;
    getAllSubscribers(): Promise<Subscriber[]>;
    private getTransporter;
    private sendConfirmationEmail;
}

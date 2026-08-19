import { NewsletterService } from './newsletter.service';
import { SubscribeDto } from './dto/subscribe.dto';
export declare class NewsletterController {
    private readonly newsletterService;
    constructor(newsletterService: NewsletterService);
    subscribe(subscribeDto: SubscribeDto): Promise<{
        success: boolean;
        message: string;
        email: string;
    }>;
    getSubscribers(): Promise<{
        count: number;
        subscribers: import("./schemas/subscriber.schema").Subscriber[];
    }>;
}

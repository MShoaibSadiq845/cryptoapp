import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Swap, SwapDocument } from './schemas/swap.schema';

@Injectable()
export class SwapsService {
  private readonly logger = new Logger(SwapsService.name);

  constructor(
    @InjectModel(Swap.name) private readonly swapModel: Model<SwapDocument>,
  ) {}

  async createSwap(data: {
    userId?: string;
    userEmail?: string;
    coinSymbol: string;
    coinName: string;
    usdAmount: number;
    estimatedAmount: number;
    priceAtSwap: number;
  }): Promise<SwapDocument> {
    const swap = new this.swapModel({
      ...data,
      coinSymbol: data.coinSymbol.toUpperCase(),
      status: 'Completed',
    });
    const saved = await swap.save();
    this.logger.log(`Swap saved in DB: $${data.usdAmount} -> ${data.estimatedAmount} ${data.coinSymbol}`);
    return saved;
  }

  async getAllSwaps(): Promise<SwapDocument[]> {
    return this.swapModel.find().sort({ createdAt: -1 }).exec();
  }

  async getUserSwaps(userIdOrEmail: string): Promise<SwapDocument[]> {
    return this.swapModel
      .find({
        $or: [{ userId: userIdOrEmail }, { userEmail: userIdOrEmail }],
      })
      .sort({ createdAt: -1 })
      .exec();
  }
}

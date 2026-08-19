import { Controller, Post, Get, Body, Req, UseGuards, Query } from '@nestjs/common';
import { SwapsService } from './swaps.service';

@Controller('swaps')
export class SwapsController {
  constructor(private readonly swapsService: SwapsService) {}

  @Post()
  async createSwap(
    @Body()
    body: {
      userId?: string;
      userEmail?: string;
      coinSymbol: string;
      coinName: string;
      usdAmount: number;
      estimatedAmount: number;
      priceAtSwap: number;
    },
  ) {
    const swap = await this.swapsService.createSwap(body);
    return {
      success: true,
      message: 'Swap completed and recorded in database successfully!',
      swap,
    };
  }

  @Get()
  async getSwaps(@Query('email') email?: string) {
    if (email) {
      const swaps = await this.swapsService.getUserSwaps(email);
      return { success: true, count: swaps.length, swaps };
    }
    const swaps = await this.swapsService.getAllSwaps();
    return { success: true, count: swaps.length, swaps };
  }
}

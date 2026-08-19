import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Swap, SwapSchema } from './schemas/swap.schema';
import { SwapsService } from './swaps.service';
import { SwapsController } from './swaps.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Swap.name, schema: SwapSchema }]),
  ],
  controllers: [SwapsController],
  providers: [SwapsService],
  exports: [SwapsService],
})
export class SwapsModule {}

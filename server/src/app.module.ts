import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { NewsletterModule } from './newsletter/newsletter.module';
import { SwapsModule } from './swaps/swaps.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri:
          configService.get<string>('MONGODB_URI') ||
          'mongodb://localhost:27017/Crypto',
      }),
      inject: [ConfigService],
    }),
    AuthModule,
    UsersModule,
    NewsletterModule,
    SwapsModule,
  ],
})
export class AppModule {}

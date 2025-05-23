import { Module } from '@nestjs/common';
import { ScreenerController } from './controllers/screener.controller';
import { ScreenerService } from './services/screener.service';

@Module({
  imports: [],
  controllers: [ScreenerController],
  providers: [ScreenerService],
})
export class AppModule {}

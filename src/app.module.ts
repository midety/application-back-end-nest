import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppConfigModule } from './app-config/app-config.module';
import { AppConfigService } from './app-config/app-config.service';
import { ApiModule } from './api/api.modules';

@Module({
  imports: [
    ApiModule,
    TypeOrmModule.forRootAsync({
      imports: [AppConfigModule],
      useExisting: AppConfigService,
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

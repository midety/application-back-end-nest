import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppConfigService, AppConfigModule } from './app-config';
import { ApiModule } from './/api/api.modules';

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

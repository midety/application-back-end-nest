import { Module } from '@nestjs/common';
import { RouterModule } from '@nestjs/core';
import { ApplicationModule } from './application/application.module';

@Module({
  imports: [
    ApplicationModule,
    RouterModule.register([
      {
        path: 'application',
        module: ApplicationModule,
      },
    ]),
  ],
  controllers: [],
  providers: [],
})
export class ApiModule {}

import { Module } from '@nestjs/common';
import { RouterModule } from '@nestjs/core';
import { ApplicationModule } from './application/application.module';
import { ApplicationGroupModule } from './application-group/application-group.module';

@Module({
  imports: [
    ApplicationGroupModule,
    ApplicationModule,
    RouterModule.register([
      {
        path: 'application',
        module: ApplicationModule,
      },
      {
        path: 'application-group',
        module: ApplicationGroupModule,
      },
    ]),
  ],
  controllers: [],
  providers: [],
})
export class ApiModule {}

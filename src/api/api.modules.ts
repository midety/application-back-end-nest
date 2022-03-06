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
        path: 'applications',
        module: ApplicationModule,
      },
      {
        path: 'application-groups',
        module: ApplicationGroupModule,
      },
    ]),
  ],
  controllers: [],
  providers: [],
})
export class ApiModule {}

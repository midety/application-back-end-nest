import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApplicationEntity } from './entities/application.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ApplicationEntity])],
  controllers: [],
  providers: [],
})
export class ApplicationModule {}

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApplicationGroupEntity } from './entities/application-group.entity';
import { ApplicationGroupService } from './application-group.service';
import { ApplicationGroupController } from './application-group.controller';

@Module({
  imports: [TypeOrmModule.forFeature([ApplicationGroupEntity])],
  providers: [ApplicationGroupService],
  exports: [ApplicationGroupService],
  controllers: [ApplicationGroupController],
})
export class ApplicationGroupModule {}

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApplicationGroupEntity } from './entities/application-group.entity';
import { ApplicationGroupService } from './application-group.service';

@Module({
  imports: [TypeOrmModule.forFeature([ApplicationGroupEntity])],
  providers: [ApplicationGroupService],
  exports: [ApplicationGroupService],
  controllers: [],
})
export class ApplicationGroupModule {}

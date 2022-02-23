import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import {
  ApplicationGroup,
  ApplicationGroupFilter,
} from './application-group.type';
import { ApplicationGroupEntity } from './entities/application-group.entity';

@Injectable()
export class ApplicationGroupService {
  constructor(
    @InjectRepository(ApplicationGroupEntity)
    private readonly applicationGroupRepository: Repository<ApplicationGroupEntity>,
  ) {}

  createApplicationGroup(
    args: Omit<ApplicationGroup, 'id'>,
  ): Promise<ApplicationGroup> {
    return this.applicationGroupRepository.save(
      this.applicationGroupRepository.create(args),
    );
  }

  getApplicationGroups(
    args: ApplicationGroupFilter,
  ): Promise<Array<ApplicationGroup>> {
    const { ids } = args;

    const where = {};

    if (ids && ids.length) {
      Object.assign(where, { id: In(ids) });
    }

    return this.applicationGroupRepository.find({ where });
  }

  findApplicationGroup(
    args: Partial<ApplicationGroup>,
  ): Promise<ApplicationGroup | undefined> {
    return this.applicationGroupRepository.findOne(args);
  }

  async getApplicationGroup(
    args: Partial<ApplicationGroup>,
  ): Promise<ApplicationGroup> {
    const applicationGroup = await this.findApplicationGroup(args);

    if (!applicationGroup) {
      throw new NotFoundException();
    }

    return applicationGroup;
  }

  async deleteApplicationGroup(args: Partial<ApplicationGroup>): Promise<void> {
    await this.applicationGroupRepository.delete(args);
  }

  async updateApplicationGroup(
    args: Required<Pick<ApplicationGroup, 'id'>> &
      Partial<Omit<ApplicationGroup, 'id'>>,
  ): Promise<void> {
    const { id, ...rest } = args;

    await this.applicationGroupRepository.update({ id }, rest);
  }
}
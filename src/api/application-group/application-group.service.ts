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
    private readonly ApplicationGroupRepository: Repository<ApplicationGroupEntity>,
  ) {}

  createGroup(args: Omit<ApplicationGroup, 'id'>): Promise<ApplicationGroup> {
    return this.ApplicationGroupRepository.save(
      this.ApplicationGroupRepository.create(args),
    );
  }

  findGroup(
    args: Partial<ApplicationGroup>,
  ): Promise<ApplicationGroup | undefined> {
    return this.ApplicationGroupRepository.findOne(args);
  }

  async getGroup(args: Partial<ApplicationGroup>): Promise<ApplicationGroup> {
    const tag = await this.findGroup(args);

    if (!tag) {
      throw new NotFoundException();
    }

    return tag;
  }

  getTags(args: ApplicationGroupFilter): Promise<Array<ApplicationGroup>> {
    const { ids } = args;

    const where = {};

    if (ids && ids.length) {
      Object.assign(where, { id: In(ids) });
    }

    return this.ApplicationGroupRepository.find({ where });
  }

  async deleteGroup(args: Partial<ApplicationGroup>): Promise<void> {
    await this.ApplicationGroupRepository.delete(args);
  }

  async updateGroup(
    args: Required<Pick<ApplicationGroup, 'id'>> &
      Partial<Omit<ApplicationGroup, 'id'>>,
  ): Promise<void> {
    const { id, ...rest } = args;

    await this.ApplicationGroupRepository.update({ id }, rest);
  }
}

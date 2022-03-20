import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ApplicationGroup, Pagination, Sort } from './application-group.type';
import { ApplicationGroupEntity } from './entities/application-group.entity';
import { upperCase } from 'lodash';

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
    args: Pagination & Sort<ApplicationGroup>,
  ): Promise<Array<ApplicationGroup>> {
    const DEFAULT_ORDER = 'ASC';
    const DEFAULT_ORDER_BY = 'id';

    const {
      page,
      perPage,
      order = DEFAULT_ORDER,
      orderBy = DEFAULT_ORDER_BY,
    } = args;

    return this.applicationGroupRepository.find({
      take: perPage,
      skip: perPage * (page - 1),
      order: {
        [orderBy]: upperCase(order),
      },
    });
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

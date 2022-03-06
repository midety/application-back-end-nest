import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Application } from './application.type';
import { ApplicationEntity } from './entities/application.entity';

@Injectable()
export class ApplicationService {
  constructor(
    @InjectRepository(ApplicationEntity)
    private readonly applicationRepository: Repository<ApplicationEntity>,
  ) {}

  createApplication(args: Omit<Application, 'id'>): Promise<Application> {
    return this.applicationRepository.save(
      this.applicationRepository.create(args),
    );
  }

  getApplications(): Promise<Array<Application>> {
    return this.applicationRepository.find({});
  }

  findApplication(
    args: Partial<Application>,
  ): Promise<Application | undefined> {
    return this.applicationRepository.findOne(args);
  }

  async getApplication(args: Partial<Application>): Promise<Application> {
    const application = await this.findApplication(args);

    if (!application) {
      throw new NotFoundException();
    }

    return application;
  }

  async deleteApplication(args: Partial<Application>): Promise<void> {
    await this.applicationRepository.delete(args);
  }

  async updateApplication(
    args: Required<Pick<Application, 'id'>> & Partial<Omit<Application, 'id'>>,
  ): Promise<void> {
    const { id, ...rest } = args;

    await this.applicationRepository.update({ id }, rest);
  }
}

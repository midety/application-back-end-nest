import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { ApplicationGroupEntity } from '../../application-group/entities/application-group.entity';

@Entity({ name: 'applications' })
export class ApplicationEntity {
  @PrimaryGeneratedColumn('uuid', { name: 'id' })
  public readonly id: string;

  @Column({ type: 'varchar', name: 'img', nullable: false })
  public readonly img: string;

  @Column({ type: 'varchar', name: 'url', nullable: false })
  public readonly url: string;

  @Column({ type: 'uuid', name: 'application_group_id', nullable: false })
  public readonly applicationGroupId: string;

  @ManyToOne(
    () => ApplicationGroupEntity,
    (applicationGroup) => applicationGroup.applications,
  )
  @JoinColumn({ name: 'application_group_id' })
  applicationGroup: ApplicationEntity;
}

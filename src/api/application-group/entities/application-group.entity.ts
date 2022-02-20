import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { ApplicationGroup } from '../application-group.type';
import { ApplicationEntity } from '../../application/entities/application.entity';

@Entity({ name: 'application_groups' })
export class ApplicationGroupEntity implements ApplicationGroup {
  @PrimaryGeneratedColumn('uuid', { name: 'id' })
  public readonly id: string;

  @Column({ type: 'varchar', name: 'name', nullable: false, unique: true })
  public readonly name: string;

  @OneToMany(
    () => ApplicationEntity,
    (application) => application.applicationGroup,
  )
  applications: ApplicationEntity[];
}

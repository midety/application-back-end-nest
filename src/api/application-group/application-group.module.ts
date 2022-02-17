import { TagEntity } from 'src/api/tag/entities/tag.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ComputerError } from '../computer-error.type';

@Entity({ name: 'computer_errors' })
export class ComputerErrorEntity implements ComputerError {
  @PrimaryGeneratedColumn('uuid', { name: 'id' })
  public readonly id: string;

  @Column({ type: 'varchar', name: 'name', nullable: false, unique: true })
  public readonly name: string;

  @Column({ type: 'varchar', name: 'solution', nullable: false })
  public readonly solution: string;

  @Column({ type: 'varchar', name: 'url', nullable: true })
  public readonly url: string;

  @ManyToMany(() => TagEntity, (tag) => tag.errors)
  @JoinTable({
    name: 'error_tags',
    joinColumn: { name: 'error_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'tag_id', referencedColumnName: 'id' },
  })
  public readonly tags: TagEntity[];
}

import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'computer_errors' })
export class ComputerErrorEntity {
  @PrimaryGeneratedColumn('uuid', { name: 'id' })
  public readonly id: string;

  @Column({ type: 'varchar', name: 'name', nullable: false, unique: true })
  public readonly name: string;

  @Column({ type: 'varchar', name: 'solution', nullable: false })
  public readonly solution: string;

  @Column({ type: 'varchar', name: 'url', nullable: true })
  public readonly url: string;
}

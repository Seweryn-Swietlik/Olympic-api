import { Column, Entity, PrimaryGeneratedColumn, OneToOne } from 'typeorm';
import { Result } from '../../results/entities/result.entity';

@Entity()
export class Medals {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  gold: number;

  @Column()
  silver: number;

  @Column()
  brown: number;

  @Column()
  total: number;

  @OneToOne(() => Result, (result) => result.medals)
  result: Result;
}

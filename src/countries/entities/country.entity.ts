import { Result } from 'src/results/entities/result.entity';
import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity()
export class Country {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  flagImageUrl: string;

  @OneToMany(() => Result, (result) => result.olympic)
  result: Result;
}

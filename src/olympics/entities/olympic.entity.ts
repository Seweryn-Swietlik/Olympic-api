import { Result } from 'src/results/entities/result.entity';
import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity()
export class Olympic {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  year: number;

  @Column()
  location: string;

  @Column()
  kind: string;

  @OneToMany(() => Result, (result) => result.olympic, {
    onDelete: 'CASCADE',
  })
  result: Result;
}

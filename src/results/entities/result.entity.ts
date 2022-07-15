import { Country } from 'src/countries/entities/country.entity';
import { Olympic } from 'src/olympics/entities/olympic.entity';
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  OneToOne,
} from 'typeorm';
import { Medals } from '../../medals/entities/medals.entity';

@Entity()
export class Result {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => Medals, (medals) => medals.result)
  @JoinColumn()
  medals: Medals;

  @ManyToOne(() => Country, (country) => country.result, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'countryId' })
  country: Country;

  @Column()
  countryId: string;

  @ManyToOne(() => Olympic, (olympic) => olympic.result, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'olympicId' })
  olympic: Olympic;

  @Column()
  olympicId: string;
}

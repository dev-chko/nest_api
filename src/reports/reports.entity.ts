import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('report')
export class Report {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  price: number;
}

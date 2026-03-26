import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Staff } from './staff.entity';

@Entity('specialties')
export class Specialty {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column('decimal', { precision: 10, scale: 2 })
  bonoPorClase: number;

  @OneToMany(() => Staff, (staff) => staff.specialty)
  trainers: Staff[];
}

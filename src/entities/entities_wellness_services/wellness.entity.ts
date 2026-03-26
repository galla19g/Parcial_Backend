import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

@Entity('wellness_services')
export class WellnessService {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  name: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  price: number;

  @Column({ default: true })
  isActive: boolean;
}

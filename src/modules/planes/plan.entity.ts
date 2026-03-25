import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('planes')
export class Plan {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 100 })
  nombre: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  costoMensual: number;
}

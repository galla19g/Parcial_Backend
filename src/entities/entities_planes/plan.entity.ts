import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

@Entity('planes')
export class Plan {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 50, unique: true })
  nombre: string;

  @Column({ type: 'decimal', precision: 10, scale: 2, name: 'costo_mensual' })
  costoMensual: number;

  @Column({ type: 'text', nullable: true })
  descripcion: string;
}
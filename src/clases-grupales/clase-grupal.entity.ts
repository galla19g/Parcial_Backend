import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Staff } from '../staff/staff.entity';

@Entity('clases_grupales')
export class ClaseGrupal {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @Column()
  horario: string;

  @Column()
  cupoMaximo: number;

  @Column({ default: 0 })
  cupoActual: number;

  @ManyToOne(() => Staff, (staff) => staff.clasesGrupales)
  entrenador: Staff;
}

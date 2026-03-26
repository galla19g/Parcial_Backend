import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Staff } from '../entities_staff/staff.entity';

@Entity('clase-grupal')
export class ClaseGrupal {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  horario: string;

  @Column('int')
  cupoMaximo: number;

  @Column('int', { default: 0 })
  cupoActual: number;

  @ManyToOne(() => Staff, (staff) => staff.clases, { onDelete: 'CASCADE' })
  entrenador: Staff;
}

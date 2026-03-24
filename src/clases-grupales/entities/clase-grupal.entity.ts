import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Staff } from '../../staff/entities/staff.entity';

@Entity('group_classes')
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
  cuposOcupados: number;

  @ManyToOne(() => Staff)
  trainer: Staff;
}

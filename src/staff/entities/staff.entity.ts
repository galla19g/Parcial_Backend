import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { Specialty } from './specialty.entity';
import { ClaseGrupal } from '../../clases-grupales/entities/clase-grupal.entity';

@Entity('staff')
export class Staff {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @ManyToOne(() => Specialty, (specialty) => specialty.trainers)
  specialty: Specialty;

  @OneToMany(() => ClaseGrupal, (claseGrupal) => claseGrupal.trainer)
  clases: ClaseGrupal[];
}

import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { ClaseGrupal } from '../clases-grupales/clase-grupal.entity';

@Entity('staff')
export class Staff {
  @PrimaryGeneratedColumn()
  id: number;

  @PrimaryGeneratedColumn('uuid')
  uuid: string;

  @Column()
  nombre: string;

  @Column()
  especialidad: string;

  @Column('decimal', { precision: 10, scale: 2 })
  bonoPorClase: number;

  @OneToMany(() => ClaseGrupal, (clase) => clase.entrenador)
  clasesGrupales: ClaseGrupal[];
}


import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';

@Entity('socios')
export class Socio {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 100 })
  nombre: string;

  @Column({ type: 'varchar', length: 100 })
  apellido: string;

  @Column({ type: 'varchar', length: 100, unique: true })
  email: string;

  @Column({ type: 'date' })
  fechaNacimiento: Date;

  @Column({
    type: 'varchar',
    length: 20,
    default: 'activo',
    comment: 'Estado de la membresía: activo, inactivo, suspendido',
  })
  estadoMembresia: string;

}

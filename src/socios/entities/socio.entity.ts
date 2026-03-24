import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from 'typeorm';

@Entity('socios')
export class Socio {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 100 })
  nombre: string;

  @Column({ type: 'varchar', length: 100 })
  apellido: string;

  @Column({ type: 'varchar', length: 100, unique: true })
  email: string;

  @Column({ type: 'date', name: 'fecha_nacimiento' })
  fechaNacimiento: Date;

  @Column({
    type: 'varchar',
    length: 20,
    default: 'activo',
    comment: 'Estado de la membresía: activo, inactivo, suspendido',
    name: 'estado_membresia',
  })
  estadoMembresia: string;
}

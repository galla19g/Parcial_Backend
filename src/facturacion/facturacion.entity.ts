import {
  Entity, PrimaryGeneratedColumn, Column, ManyToOne,
  JoinColumn, CreateDateColumn,
} from 'typeorm';
import { Socio } from '../socios/entities/socio.entity';

@Entity('facturacion')
export class Facturacion {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Socio, { eager: true, nullable: false })
  @JoinColumn({ name: 'socio_id' })
  socio: Socio;

  @Column({ type: 'tinyint', name: 'periodo_mes' })
  periodoMes: number;

  @Column({ type: 'year', name: 'periodo_anio' })
  periodoAnio: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, name: 'costo_plan' })
  costoPlan: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0.00, name: 'total_servicios' })
  totalServicios: number;

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
    generatedType: 'STORED',
    asExpression: 'costo_plan + total_servicios',
    name: 'total_pagar',
  })
  totalPagar: number;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP', name: 'fecha_generacion' })
  fechaGeneracion: Date;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
}
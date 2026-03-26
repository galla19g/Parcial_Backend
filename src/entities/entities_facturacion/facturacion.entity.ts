import {
  Entity, PrimaryGeneratedColumn, Column, ManyToOne,
  JoinColumn, CreateDateColumn, BeforeInsert, BeforeUpdate
} from 'typeorm';
import { Socio } from '../entities_socios/socio.entity';

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
    name: 'total_pagar',
    default: 0
  })
  totalPagar: number;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP', name: 'fecha_generacion' })
  fechaGeneracion: Date;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @BeforeInsert()
  @BeforeUpdate()
  calcularTotal() {
    this.totalPagar = Number(this.costoPlan || 0) + Number(this.totalServicios || 0);
  }
}
import {
  Entity, PrimaryGeneratedColumn, Column, ManyToOne,
  JoinColumn, CreateDateColumn,
} from 'typeorm';
import { Socio } from '../entities_socios/socio.entity';
import { WellnessService } from '../entities_wellness_services/wellness.entity';

@Entity('consumos_servicios')
export class ConsumoServicio {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Socio, { eager: true, nullable: false })
  @JoinColumn({ name: 'socio_id' })
  socio: Socio;

  @ManyToOne(() => WellnessService, { eager: true, nullable: false })
  @JoinColumn({ name: 'servicio_id' })
  servicio: WellnessService;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP', name: 'fecha_consumo' })
  fechaConsumo: Date;

  @Column({ type: 'decimal', precision: 10, scale: 2, name: 'precio_cobrado' })
  precioCobrado: number;

  @Column({ type: 'text', nullable: true })
  observaciones: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
}
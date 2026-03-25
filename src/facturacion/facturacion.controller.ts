import {
  Controller, Get, Post, Body, Param, ParseIntPipe, Query,
} from '@nestjs/common';
import { FacturacionService } from './facturacion.service';
import { CreateConsumoDto } from './dto/create-consumo.dto';
import { GenerarFacturaDto } from './dto/generar-factura.dto';

@Controller('facturacion')
export class FacturacionController {
  constructor(private readonly facturacionService: FacturacionService) {}

  // ── Endpoint principal ───────────────────────────────────────────────────────

  /** GET /facturacion/total-pagar/:socioId?mes=7&anio=2025 */
  @Get('total-pagar/:socioId')
  calcularTotalAPagar(
    @Param('socioId', ParseIntPipe) socioId: number,
    @Query('mes') mes?: string,
    @Query('anio') anio?: string,
  ) {
    return this.facturacionService.calcularTotalAPagar(
      socioId,
      mes ? parseInt(mes) : undefined,
      anio ? parseInt(anio) : undefined,
    );
  }

  // ── Consumos ─────────────────────────────────────────────────────────────────

  /** POST /facturacion/consumos */
  @Post('consumos')
  registrarConsumo(@Body() dto: CreateConsumoDto) {
    return this.facturacionService.registrarConsumo(dto);
  }

  /** GET /facturacion/consumos/socio/:socioId */
  @Get('consumos/socio/:socioId')
  getConsumosPorSocio(@Param('socioId', ParseIntPipe) socioId: number) {
    return this.facturacionService.getConsumosPorSocio(socioId);
  }

  /** GET /facturacion/consumos/socio/:socioId/mes?mes=7&anio=2025 */
  @Get('consumos/socio/:socioId/mes')
  getConsumosPorMes(
    @Param('socioId', ParseIntPipe) socioId: number,
    @Query('mes') mes: string,
    @Query('anio') anio: string,
  ) {
    return this.facturacionService.getConsumosPorSocioYMes(
      socioId,
      parseInt(mes),
      parseInt(anio),
    );
  }

  // ── Facturas ─────────────────────────────────────────────────────────────────

  /** POST /facturacion/facturas */
  @Post('facturas')
  generarFactura(@Body() dto: GenerarFacturaDto) {
    return this.facturacionService.generarFactura(dto);
  }

  /** GET /facturacion/facturas */
  @Get('facturas')
  findAllFacturas() {
    return this.facturacionService.findAllFacturas();
  }

  /** GET /facturacion/facturas/socio/:socioId */
  @Get('facturas/socio/:socioId')
  findFacturasPorSocio(@Param('socioId', ParseIntPipe) socioId: number) {
    return this.facturacionService.findFacturasPorSocio(socioId);
  }

  /** GET /facturacion/facturas/:id */
  @Get('facturas/:id')
  findFacturaById(@Param('id', ParseIntPipe) id: number) {
    return this.facturacionService.findFacturaById(id);
  }
}
import { Component } from '@angular/core';
import { Input, OnChanges, SimpleChanges } from '@angular/core';
import { ChartConfiguration } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { CommonModule } from '@angular/common';
import { ChartOptions, ChartType, ChartData } from 'chart.js';

@Component({
  selector: 'app-stadistics',
  imports: [BaseChartDirective, CommonModule],
  templateUrl: './stadistics.component.html',
  styleUrl: './stadistics.component.css'
})
export class StadisticsComponent {
  @Input() idInvernadero!: string;
  @Input() stats!: any[];

  barChartData: ChartData<'bar'> = {
    labels: [],
    datasets: []
  };

  ngOnInit(): void {
    this.generarGrafica();
  }

  generarGrafica() {
    // Obtener todas las fechas del mes, incluso si no hay datos
    const diasUnicos = this.obtenerDiasDelMesCompleto();

    // Inicializar arrays vacíos por tipo
    const humedad: number[] = [];
    const temperatura: number[] = [];
    const luz: number[] = [];

    diasUnicos.forEach(fecha => {
      const dato = this.stats.find(s => s.fecha.startsWith(fecha));
      humedad.push(dato ? dato.humedadPromedio : 0);
      temperatura.push(dato ? dato.temperaturaPromedio : 0);
      luz.push(dato ? dato.luzPromedio : 0);
    });

    this.barChartData = {
      labels: diasUnicos,
      datasets: [
        { label: 'Humedad', data: humedad, backgroundColor: '#42A5F5' },
        { label: 'Temperatura', data: temperatura, backgroundColor: '#FFA726' },
        { label: 'Luz', data: luz, backgroundColor: '#66BB6A' }
      ]
    };
  }

  obtenerDiasDelMesCompleto(): string[] {
    const fechas = this.stats.map(s => new Date(s.fecha));
    if (fechas.length === 0) return [];

    const año = fechas[0].getFullYear();
    const mes = fechas[0].getMonth(); // 0 = enero

    const dias = new Date(año, mes + 1, 0).getDate(); // días del mes

    return Array.from({ length: dias }, (_, i) =>
      new Date(año, mes, i + 1).toISOString().split('T')[0]
    );
  }
}

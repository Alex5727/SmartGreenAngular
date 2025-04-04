import { Component } from '@angular/core';
import { Input, OnChanges, SimpleChanges } from '@angular/core';
import { ChartConfiguration } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { ChartType } from 'chart.js';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-stadistics',
  imports: [BaseChartDirective, CommonModule],
  templateUrl: './stadistics.component.html',
  styleUrl: './stadistics.component.css'
})
export class StadisticsComponent {
  @Input() data: any;
  @Input() visible = false;

  chartData: ChartConfiguration<'line'>['data'] = {
    labels: [],
    datasets: []
  };

  chartOptions: ChartConfiguration<'line'>['options'] = {
    responsive: true
  };

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data'] && this.data) {
      this.chartData = {
        labels: this.data.labels,
        datasets: [
          {
            data: this.data.temperature,
            label: 'Temperatura (°C)',
            borderColor: 'red',
            fill: false
          },
          {
            data: this.data.humidity,
            label: 'Humedad (%)',
            borderColor: 'blue',
            fill: false
          }
        ]
      };
    }
  }

  closeModal() {
    this.visible = false;
  }
}

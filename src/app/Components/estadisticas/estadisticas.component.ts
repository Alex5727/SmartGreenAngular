import { Component } from '@angular/core';
import { AuthServiceService } from '../../Services/auth-service.service';
import { StatsService } from '../services/stats.service';
import { StatsInvernaderos } from '../models/StatsInvernaderos.model';

@Component({
  selector: 'app-estadisticas',
  imports: [],
  templateUrl: './estadisticas.component.html',
  styleUrl: './estadisticas.component.css'
})
export class EstadisticasComponent {
  constructor(private auth: AuthServiceService, private statsService: StatsService) {}

  stats: StatsInvernaderos[] = [];

  ngOnInit(): void {

    //if (!this.auth.getToken())
    //{
    //  window.location.href = '/login';
    //}
    this.loadstats();
  }

  loadstats(): void {
    this.statsService.getAllStats().subscribe((data) => {
      console.log(data);
      this.stats = data;
    });
  }
}

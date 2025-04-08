import { Component } from '@angular/core';
import { AuthServiceService } from '../../Services/auth-service.service';
import { StatsService } from '../services/stats.service';
import { StatsInvernaderos } from '../models/StatsInvernaderos.model';
import { StadisticsComponent } from '../stadistics/stadistics.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-estadisticas',
  imports: [StadisticsComponent, CommonModule, FormsModule],
  templateUrl: './estadisticas.component.html',
  styleUrl: './estadisticas.component.css'
})
export class EstadisticasComponent {
  constructor(private auth: AuthServiceService, private statsService: StatsService) {}

  searchTerm: string = '';
  estadisticasFiltradas: StatsInvernaderos[] = [];
  stats: StatsInvernaderos[] = [];
  selectedSuggestionIndex: number = -1;
  filteredSuggestions: string[] = [];
  showSuggestions: boolean = false;

  ngOnInit(): void {
    if (!this.auth.getToken())
      {
        window.location.href = '/login';
      }
    this.loadstats();
  }

  loadstats(): void {
    this.statsService.getAllStats().subscribe((data) => {
      this.stats = data;
      this.estadisticasFiltradas = data;
    });
  }

  filtrarEstadisticas(): void {
    const term = this.searchTerm.toLowerCase().trim();
    if (term === '') {
      this.estadisticasFiltradas = this.stats;
    } else {
      this.estadisticasFiltradas = this.stats.filter(item =>
        item.idInvernadero.toLowerCase().includes(term)
      );
    }

    // Actualizar sugerencias
    this.filteredSuggestions = this.stats
      .map(stat => stat.idInvernadero)
      .filter(id => id.toLowerCase().includes(term));
  }

  selectSuggestion(suggestion: string): void {
    this.searchTerm = suggestion;
    this.showSuggestions = false;
    this.selectedSuggestionIndex = -1;
    this.filtrarEstadisticas();
  }

  onFocus() {
    this.showSuggestions = true;
    this.filtrarEstadisticas();
  }

  onBlur() {
    // Retraso para permitir el click antes de ocultar
    setTimeout(() => this.showSuggestions = false, 200);
  }
  onInputChange(): void {
    this.filtrarEstadisticas();
    this.showSuggestions = true;
    this.selectedSuggestionIndex = -1;
  }

  onKeyDown(event: KeyboardEvent): void {
    const suggestionsLength = this.filteredSuggestions.length;
  
    if (event.key === 'ArrowDown') {
      // ↓ Mover abajo
      event.preventDefault();
      if (this.selectedSuggestionIndex < suggestionsLength - 1) {
        this.selectedSuggestionIndex++;
      }
    } else if (event.key === 'ArrowUp') {
      // ↑ Mover arriba
      event.preventDefault();
      if (this.selectedSuggestionIndex > 0) {
        this.selectedSuggestionIndex--;
      }
    } else if (event.key === 'Enter') {
      // ENTER para seleccionar
      if (this.selectedSuggestionIndex >= 0 && this.selectedSuggestionIndex < suggestionsLength) {
        this.selectSuggestion(this.filteredSuggestions[this.selectedSuggestionIndex]);
      }
    }
    if (event.key === 'Enter') {
      this.showSuggestions = false;
    }
  }
  
}

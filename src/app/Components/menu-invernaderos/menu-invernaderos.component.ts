import { Component } from '@angular/core';
import { CartaPlantaComponent } from '../carta-planta/carta-planta.component';
import { Inver } from '../../Clases/inver';
import { InvernaderosServiceService } from '../../Services/invernaderos-service.service';
import { AuthServiceService } from '../../Services/auth-service.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-menu-invernaderos',
  imports: [CartaPlantaComponent, CommonModule, FormsModule],
  templateUrl: './menu-invernaderos.component.html',
  styleUrl: './menu-invernaderos.component.css'
})
export class MenuInvernaderosComponent {
  invernaderos: Inver[] = [];
  invernaderosFiltrados: Inver[] = [];
  
  correo!: string; 
  Mensaje!: string; 
  correo2!: string | null;

  // Variables para el buscador
  searchTerm: string = '';
  selectedSuggestionIndex: number = -1;
  filteredSuggestions: string[] = [];
  showSuggestions: boolean = false;

  constructor(
    private invernaderosService: InvernaderosServiceService, 
    private auth: AuthServiceService
  ) {}

  ngOnInit(): void {
    this.convertir()
    if (this.auth.getToken())
    {
    this.obtenerInvernaderos();
    }
    else{
      window.location.href = '/login';
      this.Mensaje = "Hubo un error al cargar los invernaderos";
        }
  }

  convertir() {
    this.correo2 = this.auth.getEmail();
    if (this.correo2 != null) {
      this.correo = this.correo2;
    }
  }

  obtenerInvernaderos() {
    this.invernaderosService.getInvers().subscribe({
      next: (data) => {
        this.invernaderos = data;
        this.invernaderosFiltrados = [...data];
        
        if(this.invernaderos.length === 0) {
          this.Mensaje = "No se encontraron invernaderos";
        } else {
          this.Mensaje = "";
        }
      },
      error: (err) => {
        console.error('Error al obtener invernaderos:', err);
        this.Mensaje = "Error al cargar los invernaderos";
      }
    });
  }

  // Métodos para el buscador (versión segura con null checks)
  filtrarInvernaderos(): void {
    const term = this.searchTerm.toLowerCase().trim();
    
    if (term === '') {
      this.invernaderosFiltrados = [...this.invernaderos];
    } else {
      this.invernaderosFiltrados = this.invernaderos.filter(item => {
        const id = item.idInvernadero ? item.idInvernadero.toLowerCase() : '';
        const correo = item.usuCorreo ? item.usuCorreo.toLowerCase() : '';
        return id.includes(term) || correo.includes(term);
      });
    }

    this.actualizarSugerencias(term);
  }

  actualizarSugerencias(term: string): void {
    this.filteredSuggestions = this.invernaderos
      .filter(inv => {
        const id = inv.idInvernadero ? inv.idInvernadero.toLowerCase() : '';
        const correo = inv.usuCorreo ? inv.usuCorreo.toLowerCase() : '';
        return id.includes(term) || correo.includes(term);
      })
      .map(inv => {
        const correo = inv.usuCorreo || "Sin propietario";
        return `${inv.idInvernadero} (${correo})`;
      });
  }

  selectSuggestion(suggestion: string): void {
    const selectedId = suggestion.split(' ')[0];
    this.searchTerm = selectedId;
    this.showSuggestions = false;
    this.selectedSuggestionIndex = -1;
    this.filtrarInvernaderos();
  }

  onFocus() {
    this.showSuggestions = true;
    this.filtrarInvernaderos();
  }

  onBlur() {
    setTimeout(() => this.showSuggestions = false, 200);
  }

  onInputChange(): void {
    this.filtrarInvernaderos();
    this.showSuggestions = true;
    this.selectedSuggestionIndex = -1;
  }

  onKeyDown(event: KeyboardEvent): void {
    const suggestionsLength = this.filteredSuggestions.length;
  
    if (event.key === 'ArrowDown') {
      event.preventDefault();
      if (this.selectedSuggestionIndex < suggestionsLength - 1) {
        this.selectedSuggestionIndex++;
      }
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      if (this.selectedSuggestionIndex > 0) {
        this.selectedSuggestionIndex--;
      }
    } else if (event.key === 'Enter') {
      if (this.selectedSuggestionIndex >= 0 && this.selectedSuggestionIndex < suggestionsLength) {
        this.selectSuggestion(this.filteredSuggestions[this.selectedSuggestionIndex]);
      }
      this.showSuggestions = false;
    }
  }

  filterUsersBySearch(): void {
    this.showSuggestions = false;
  }

  RegInv() {
    window.location.href = 'registrar-invernadero';
  }
}
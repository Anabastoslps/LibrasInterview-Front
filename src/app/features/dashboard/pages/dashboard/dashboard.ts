import { ChangeDetectorRef, Component, OnInit, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { EntrevistaResponse } from '../../../entrevistas/models/entrevista.model';
import { EntrevistaService } from '../../../entrevistas/services/entrevista.service';

@Component({
  selector: 'app-dashboard',
  imports: [RouterLink],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard implements OnInit {
  entrevistas: EntrevistaResponse[] = [];
  private entrevistaService = inject(EntrevistaService);
  private cdr = inject(ChangeDetectorRef);

  ngOnInit(): void {
    this.carregarEntrevistas();
  }

  carregarEntrevistas(): void {
    this.entrevistaService.listar().subscribe({
      next: (response) => {
        console.log('Entrevistas:', response);
        this.entrevistas = response;
        this.cdr.detectChanges();
      },
      error: (erro) => {
        console.error('Erro ao buscar entrevistas', erro);
      }
    });
  }

  formatarData(dataHora: string): string {
    return new Date(dataHora).toLocaleDateString('pt-BR');
  }

  formatarHora(dataHora: string): string {
    return new Date(dataHora).toLocaleTimeString('pt-BR', {
      hour: '2-digit',
      minute: '2-digit'
    });
  }
}
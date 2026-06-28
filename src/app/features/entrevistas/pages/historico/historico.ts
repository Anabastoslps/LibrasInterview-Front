import { ChangeDetectorRef, Component, OnInit, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { EntrevistaResponse } from '../../models/entrevista.model';
import { EntrevistaService } from '../../services/entrevista.service';

@Component({
  selector: 'app-historico',
  imports: [RouterLink],
  templateUrl: './historico.html',
  styleUrl: './historico.css',
})
export class Historico implements OnInit {
  entrevistas: EntrevistaResponse[] = [];

  private entrevistaService = inject(EntrevistaService);
  private cdr = inject(ChangeDetectorRef);

  ngOnInit(): void {
    this.carregarEntrevistas();
  }

  carregarEntrevistas(): void {
    this.entrevistaService.listar().subscribe({
      next: (response) => {
        console.log('Histórico:', response);
        this.entrevistas = response;
        this.cdr.detectChanges();
      },
      error: (erro) => {
        console.error('Erro ao buscar histórico', erro);
      }
    });
  }

  formatarData(dataHora: string): string {
    return new Date(dataHora).toLocaleDateString('pt-BR');
  }

  entrevistasRealizadas(): EntrevistaResponse[] {
    const agora = new Date();

    return this.entrevistas.filter(
      entrevista => new Date(entrevista.dataHora) < agora
    );
  }

  obterStatusReuniao(dataHora: string, status: string): string {
    const agora = new Date();
    const dataReuniao = new Date(dataHora);

    if (status === 'Cancelada') {
      return 'Cancelada';
    }

    if (dataReuniao < agora) {
      return 'Finalizada';
    }

    return 'Agendada';
  }
}
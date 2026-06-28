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
  entrevistaSelecionada?: EntrevistaResponse;

  proximasEntrevistas = 0;
  entrevistasRealizadas = 0;
  horasEntrevistas = 0;
  transcricoes = 0;

  private entrevistaService = inject(EntrevistaService);
  private cdr = inject(ChangeDetectorRef);

  ngOnInit(): void {
    this.carregarEntrevistas();
  }

  carregarEntrevistas(): void {
    this.entrevistaService.listar().subscribe({
      next: (response) => {
        this.entrevistas = response;
        this.calcularEstatisticas();
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

  calcularEstatisticas(): void {

    const agora = new Date();

    this.proximasEntrevistas =
      this.entrevistas.filter(e => new Date(e.dataHora) >= agora).length;

    this.entrevistasRealizadas =
      this.entrevistas.filter(e => new Date(e.dataHora) < agora).length;

    // Por enquanto, cada entrevista conta como 1 hora
    this.horasEntrevistas = this.entrevistasRealizadas;

    // Por enquanto, cada entrevista conta como uma transcrição
    this.transcricoes = this.entrevistasRealizadas;
  }

  entrevistasFuturas(): EntrevistaResponse[] {
    const agora = new Date();

    return this.entrevistas.filter(
      entrevista => new Date(entrevista.dataHora) >= agora
    );
  }

  abrirDetalhes(entrevista: EntrevistaResponse): void {
    this.entrevistaSelecionada = entrevista;
  }

  fecharDetalhes(): void {
    this.entrevistaSelecionada = undefined;
  }

  excluirEntrevista(id: number): void {
    const confirmar = confirm('Deseja realmente excluir esta reunião?');

    if (!confirmar) {
      return;
    }

    this.entrevistaService.remover(id).subscribe({
      next: () => {
        this.entrevistas = this.entrevistas.filter(entrevista => entrevista.id !== id);
        this.calcularEstatisticas();
        this.cdr.detectChanges();
      },
      error: (erro) => {
        console.error('Erro ao excluir reunião', erro);
        alert('Erro ao excluir reunião');
      }
    });
  }
} 
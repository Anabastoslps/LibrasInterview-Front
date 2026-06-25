import { Component, OnInit } from '@angular/core';
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

  constructor(private entrevistaService: EntrevistaService) {}

  ngOnInit(): void {
    this.entrevistaService.listar().subscribe({
      next: (response) => {
        this.entrevistas = response;
      },
      error: (erro) => {
        console.error('Erro ao buscar histórico', erro);
      }
    });
  }

  formatarData(dataHora: string): string {
    return new Date(dataHora).toLocaleDateString('pt-BR');
  }
}
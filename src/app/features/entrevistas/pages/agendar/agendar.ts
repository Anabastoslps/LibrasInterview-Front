import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { EntrevistaRequest } from '../../models/entrevista.model';
import { EntrevistaService } from '../../services/entrevista.service';

@Component({
  selector: 'app-agendar',
  imports: [RouterLink, FormsModule],
  templateUrl: './agendar.html',
  styleUrl: './agendar.css',
})
export class Agendar {
  entrevistadorId = 1;
  candidatoId = 6;
  data = '';
  hora = '';

  constructor(
    private entrevistaService: EntrevistaService,
    private router: Router
  ) {}

  agendarEntrevista(): void {
    const request: EntrevistaRequest = {
      entrevistadorId: this.entrevistadorId,
      candidatoId: this.candidatoId,
      dataHora: `${this.data}T${this.hora}:00Z`
    };

    this.entrevistaService.criar(request).subscribe({
      next: () => {
        this.router.navigate(['/dashboard']);
      },
      error: (erro) => {
        alert(erro.error?.mensagem ?? 'Erro ao agendar entrevista');
      }
    });
  }
}

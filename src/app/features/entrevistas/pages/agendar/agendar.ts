import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Usuario } from '../../../usuarios/models/usuario.model';
import { UsuarioService } from '../../../usuarios/services/usuario.service';
import { EntrevistaRequest } from '../../models/entrevista.model';
import { EntrevistaService } from '../../services/entrevista.service';

@Component({
  selector: 'app-agendar',
  imports: [FormsModule],
  templateUrl: './agendar.html',
  styleUrl: './agendar.css',
})
export class Agendar implements OnInit {
  usuarios: Usuario[] = [];
  entrevistadores: Usuario[] = [];
  candidatos: Usuario[] = [];

  entrevistaId?: number;
  modoEdicao = false;

  entrevistadorId = '';
  candidatoId = '';
  data = '';
  hora = '';

  constructor(
    private entrevistaService: EntrevistaService,
    private usuarioService: UsuarioService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      this.entrevistaId = Number(id);
      this.modoEdicao = true;
    }

    this.carregarUsuarios();

    if (this.modoEdicao && this.entrevistaId) {
      this.carregarEntrevista(this.entrevistaId);
    }
  }

  carregarUsuarios(): void {
    this.usuarioService.obterUsuarios().subscribe({
      next: (usuarios) => {
        this.usuarios = usuarios;
        this.entrevistadores = usuarios.filter(usuario => usuario.tipoUsuario === 'Entrevistador');
        this.candidatos = usuarios.filter(usuario => usuario.tipoUsuario === 'Candidato');
      },
      error: (erro) => {
        console.error('Erro ao buscar usuários', erro);
      }
    });
  }

  carregarEntrevista(id: number): void {
    this.entrevistaService.obterPorId(id).subscribe({
      next: (entrevista) => {
        this.entrevistadorId = String(entrevista.entrevistadorId);
        this.candidatoId = String(entrevista.candidatoId);

        const dataHora = new Date(entrevista.dataHora);

        this.data = dataHora.toISOString().substring(0, 10);
        this.hora = dataHora.toTimeString().substring(0, 5);
      },
      error: (erro) => {
        console.error('Erro ao buscar entrevista', erro);
      }
    });
  }

  salvarEntrevista(): void {
    const request: EntrevistaRequest = {
      entrevistadorId: Number(this.entrevistadorId),
      candidatoId: Number(this.candidatoId),
      dataHora: `${this.data}T${this.hora}:00Z`
    };

    if (this.modoEdicao && this.entrevistaId) {
      this.entrevistaService.atualizar(this.entrevistaId, request).subscribe({
        next: () => {
          this.router.navigate(['/dashboard']);
        },
        error: (erro) => {
          alert(erro.error?.mensagem ?? 'Erro ao editar entrevista');
        }
      });

      return;
    }

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
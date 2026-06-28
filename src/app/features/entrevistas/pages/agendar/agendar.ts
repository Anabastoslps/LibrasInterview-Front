import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
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

  titulo = '';
  descricao = '';
  entrevistadorId = '';
  candidatoId = '';
  data = '';
  hora = '';

  mensagemErro = '';
  formularioEnviado = false;

  constructor(
    private entrevistaService: EntrevistaService,
    private usuarioService: UsuarioService,
    private router: Router,
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef
  ) { }

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
        this.titulo = entrevista.titulo ?? '';
        this.descricao = entrevista.descricao ?? '';

        this.entrevistadorId = String(entrevista.entrevistadorId);
        this.candidatoId = String(entrevista.candidatoId);

        const dataHora = new Date(entrevista.dataHora);

        this.data = dataHora.toLocaleDateString('en-CA');
        this.hora = dataHora.toLocaleTimeString('pt-BR', {
          hour: '2-digit',
          minute: '2-digit'
        });

        this.cdr.detectChanges();
      },
      error: (erro) => {
        console.error('Erro ao buscar entrevista', erro);
      }
    });
  }

  salvarEntrevista(): void {
    this.formularioEnviado = true;
    this.mensagemErro = '';

    if (!this.titulo || !this.entrevistadorId || !this.candidatoId || !this.data || !this.hora) {
      this.mensagemErro = 'Preencha todos os campos obrigatórios.';
      return;
    }

    const request: EntrevistaRequest = {
      titulo: this.titulo,
      descricao: this.descricao,
      entrevistadorId: Number(this.entrevistadorId),
      candidatoId: Number(this.candidatoId),
      dataHora: `${this.data}T${this.hora}:00-03:00`
    };

    if (this.modoEdicao && this.entrevistaId) {
      this.entrevistaService.atualizar(this.entrevistaId, request).subscribe({
        next: () => {
          this.router.navigate(['/dashboard']);
        },
        error: (erro) => {
          this.mensagemErro =
            erro.error?.message ||
            erro.error?.mensagem ||
            erro.error ||
            'Erro ao editar reunião';
        }
      });

      return;
    }

    this.entrevistaService.criar(request).subscribe({
      next: () => {
        this.router.navigate(['/dashboard']);
      },
      error: (erro) => {
        this.mensagemErro =
          erro.error?.message ||
          erro.error?.mensagem ||
          erro.error ||
          'Erro ao agendar reunião';
      }
    });
  }
}
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
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

  entrevistadorId = '';
  candidatoId = '';
  data = '';
  hora = '';

  constructor(
    private entrevistaService: EntrevistaService,
    private usuarioService: UsuarioService,
    private router: Router
  ) {}

  ngOnInit(): void {
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

  agendarEntrevista(): void {
    const request: EntrevistaRequest = {
      entrevistadorId: Number(this.entrevistadorId),
      candidatoId: Number(this.candidatoId),
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
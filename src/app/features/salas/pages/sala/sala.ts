import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { EntrevistaResponse } from '../../../entrevistas/models/entrevista.model';
import { EntrevistaService } from '../../../entrevistas/services/entrevista.service';

interface Transcricao {
  autor: 'Entrevistador' | 'Candidato' | 'Avatar Libras';
  horario: string;
  texto: string;
}

@Component({
  selector: 'app-sala',
  imports: [RouterLink, FormsModule],
  templateUrl: './sala.html',
  styleUrl: './sala.css',
})
export class Sala implements OnInit {
  entrevistaId!: number;
  entrevista?: EntrevistaResponse;

  novaMensagem = '';

  mic = true;
  cam = true;
  recording = true;

  transcricoes: Transcricao[] = [
    {
      autor: 'Entrevistador',
      horario: '00:00',
      texto: 'Olá! Fale um pouco sobre a sua experiência.'
    },
    {
      autor: 'Candidato',
      horario: '00:15',
      texto: 'Tenho três anos de experiência com .NET e Angular.'
    },
    {
      autor: 'Avatar Libras',
      horario: '00:16',
      texto: 'Traduzindo para Libras...'
    }
  ];

  constructor(
    private route: ActivatedRoute,
    private entrevistaService: EntrevistaService
  ) {}

  ngOnInit(): void {
    this.entrevistaId = Number(this.route.snapshot.paramMap.get('id'));

    this.entrevistaService.obterPorId(this.entrevistaId).subscribe({
      next: (response) => {
        this.entrevista = response;
        console.log('Entrevista carregada:', response);
      },
      error: (erro) => {
        console.error(erro);
      }
    });
  }

  obterIniciais(nome?: string): string {
    if (!nome) {
      return '';
    }

    const partes = nome.trim().split(' ');

    if (partes.length === 1) {
      return partes[0][0].toUpperCase();
    }

    return (
      partes[0][0] +
      partes[partes.length - 1][0]
    ).toUpperCase();
  }

  enviarMensagem(): void {
    if (!this.novaMensagem.trim()) {
      return;
    }

    const agora = new Date();

    const horario =
      agora.getHours().toString().padStart(2, '0') +
      ':' +
      agora.getMinutes().toString().padStart(2, '0');

    this.transcricoes.push({
      autor: 'Entrevistador',
      horario,
      texto: this.novaMensagem
    });

    this.novaMensagem = '';
  }

  ultimaTranscricao(): Transcricao | undefined {
    return this.transcricoes[this.transcricoes.length - 1];
  }

  toggleMic(): void {
    this.mic = !this.mic;
  }

  toggleCam(): void {
    this.cam = !this.cam;
  }

  toggleRecording(): void {
    this.recording = !this.recording;
  }
}
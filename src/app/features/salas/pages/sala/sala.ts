import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { EntrevistaResponse } from '../../../entrevistas/models/entrevista.model';
import { EntrevistaService } from '../../../entrevistas/services/entrevista.service';

@Component({
  selector: 'app-sala',
  imports: [RouterLink],
  templateUrl: './sala.html',
  styleUrl: './sala.css',
})
export class Sala implements OnInit {
  entrevistaId!: number;
  entrevista?: EntrevistaResponse;

  mic = true;
  cam = true;
  recording = true;

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
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-sala',
  imports: [RouterLink],
  templateUrl: './sala.html',
  styleUrl: './sala.css',
})
export class Sala {
  mic = true;
  cam = true;
  recording = true;

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

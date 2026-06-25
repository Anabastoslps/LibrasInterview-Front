import { Component, signal } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { Sidebar } from './shared/components/sidebar/sidebar';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, Sidebar],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('libria');

  constructor(private router: Router) {}

  get mostrarMenu(): boolean {
    const url = this.router.url;

    return !url.startsWith('/login')
      && !url.startsWith('/salas');
  }
}

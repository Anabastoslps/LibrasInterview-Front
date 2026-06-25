import { Routes } from '@angular/router';
import { Login } from './features/auth/pages/login/login';
import { Dashboard } from './features/dashboard/pages/dashboard/dashboard';
import { Agendar } from './features/entrevistas/pages/agendar/agendar';
import { Historico } from './features/entrevistas/pages/historico/historico';
import { Sala } from './features/salas/pages/sala/sala';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: Login },
  { path: 'dashboard', component: Dashboard },
  { path: 'agendar', component: Agendar },
  { path: 'salas/:id', component: Sala },
  { path: 'historico', component: Historico }
];

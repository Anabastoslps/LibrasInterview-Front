import { Routes } from '@angular/router';
import { Login } from './features/auth/pages/login/login';
import { Dashboard } from './features/dashboard/pages/dashboard/dashboard';
import { Entrevistas } from './features/entrevistas/pages/entrevistas/entrevistas';
import { Agendar } from './features/entrevistas/pages/agendar/agendar';
import { Sala } from './features/entrevistas/pages/sala/sala';
import { Historico } from './features/entrevistas/pages/historico/historico';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: Login },
  { path: 'dashboard', component: Dashboard },
  { path: 'entrevistas', component: Entrevistas },
  { path: 'agendar', component: Agendar },
  { path: 'sala', component: Sala },
  { path: 'historico', component: Historico }
];

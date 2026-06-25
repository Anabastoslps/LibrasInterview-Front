export interface Usuario {
  id: number;
  nome: string;
  email: string;
  tipoUsuario: 'Entrevistador' | 'Candidato';
}
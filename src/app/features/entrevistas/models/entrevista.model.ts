export interface EntrevistaRequest {
  entrevistadorId: number;
  candidatoId: number;
  dataHora: string;
}

export interface EntrevistaResponse {
  id: number;
  entrevistadorId: number;
  candidatoId: number;
  dataHora: string;
  status: string;
}
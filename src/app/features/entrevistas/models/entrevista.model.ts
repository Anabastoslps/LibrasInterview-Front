export interface EntrevistaRequest {
  entrevistadorId: number;
  candidatoId: number;
  dataHora: string;
}

export interface EntrevistaResponse {
    id: number;
    entrevistadorId: number;
    entrevistadorNome: string;
    candidatoId: number;
    candidatoNome: string;
    dataHora: string;
    status: string;
}
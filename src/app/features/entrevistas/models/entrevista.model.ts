export interface EntrevistaRequest {
  titulo: string;
  descricao: string;
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
    titulo: string;
    descricao?: string;
}
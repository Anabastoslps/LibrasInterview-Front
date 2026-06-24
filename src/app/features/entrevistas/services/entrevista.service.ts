import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EntrevistaRequest, EntrevistaResponse } from '../models/entrevista.model';

@Injectable({
  providedIn: 'root'
})
export class EntrevistaService {
  private readonly apiUrl = 'http://localhost:5251/api/entrevistas';

  constructor(private http: HttpClient) {}

  listar() {
    return this.http.get<EntrevistaResponse[]>(this.apiUrl);
  }

  criar(request: EntrevistaRequest) {
    return this.http.post<EntrevistaResponse>(this.apiUrl, request);
  }
}
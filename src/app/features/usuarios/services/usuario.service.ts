import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Usuario } from '../models/usuario.model';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private readonly apiUrl = 'http://localhost:5251/api/usuarios';

  constructor(private http: HttpClient) {
  }

  obterUsuarios() {
    return this.http.get<Usuario[]>(this.apiUrl);
  }
}
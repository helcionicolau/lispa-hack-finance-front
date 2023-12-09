import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, forkJoin } from 'rxjs';
import { Emprestimo } from '../models/emprestimo.model';

@Injectable({
  providedIn: 'root',
})
export class EmprestimoService {
  private apiBaseUrl = 'http://127.0.0.1:5000';

  constructor(private http: HttpClient) { }

  getEmprestimos(): Observable<Emprestimo[]> {
    const apiUrl = `${this.apiBaseUrl}/ler_creditos`;
    return this.http.get<Emprestimo[]>(apiUrl);
  }

  getEmprestimoDetails(idEmprestimo: number): Observable<Emprestimo> {
    const apiUrl = `${this.apiBaseUrl}/ler_credito/${idEmprestimo}`;
    return this.http.get<Emprestimo>(apiUrl);
  }

  criarEmprestimo(emprestimo: any): Observable<any> {
    const apiUrl = `${this.apiBaseUrl}/criar_credito`;
    return this.http.post<any>(apiUrl, emprestimo);
  }

  excluirEmprestimo(idEmprestimo: number): Observable<void> {
    const apiUrl = `${this.apiBaseUrl}/deletar_credito/${idEmprestimo}`;
    return this.http.delete<void>(apiUrl);
  }

  // Adicione métodos adicionais conforme necessário, como atualizar, excluir, etc.
}

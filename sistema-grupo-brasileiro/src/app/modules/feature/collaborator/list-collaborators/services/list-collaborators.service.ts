import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ListCollaboratorsService {
  private apiUrl = 'http://localhost:8080/api/v1/employees/allCollaborators';

  constructor(private http: HttpClient) { }

  getCollaborators(page: number, size: number, orderBy?: string, direction?: string): Observable<any> {
    const token = sessionStorage.getItem('auth-token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    let url = `${this.apiUrl}?page=${page}&size=${size}`;

    return this.http.get(url, { headers })
      .pipe(
        map((response: any) => ({
          content: response.content.map((colaborador: any) => ({
            nome: colaborador.name,
            email: colaborador.userView.email,
            numero: colaborador.phonenumber,
            funcao: colaborador.occupation,
            setor: colaborador.sector,
            agencia: colaborador.agency
          })),
          totalElements: response.totalElements,
          totalPages: response.totalPages
        }))
      );
  }
}

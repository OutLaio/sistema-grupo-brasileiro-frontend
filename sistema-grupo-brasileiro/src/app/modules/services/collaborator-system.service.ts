import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

interface Collaborator {
  nome: string;
  numero: string;
  email: string;
  funcao: string;
  setor: string;
  agencia: string;
}

@Injectable({
  providedIn: 'root'
})
export class CollaboratorSystemService {
  private apiUrl = 'http://localhost:8080/collaborators';

  constructor(private http: HttpClient) {}

  getCollaborators(page: number, size: number): Observable<Collaborator[]> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());
    return this.http.get<Collaborator[]>(this.apiUrl, { params });
  }
}

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { CardsAttributes } from '../interfaces/cards-attributes';

@Injectable({
  providedIn: 'root'
})
export class CheckRequestsService {

  private apiUrl = 'http://localhost:8080/api/v1/projects';

  constructor(private http: HttpClient) { }

  getProjects(): Observable<CardsAttributes[]> {
    const token = sessionStorage.getItem('auth-token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.get<CardsAttributes[]>(this.apiUrl, { headers }).pipe(
      map(response => {
        return response.map((project: CardsAttributes) => ({
          id: project.id,
          title: project.title,
          status: project.status,
          collaborator: project.collaborator ? {
            id: project.collaborator.id,
            fullName: project.collaborator.fullName,
            avatar: project.collaborator.avatar,
        } : null,
          client: {
            id: project.client.id,
            fullName: project.client.fullName,
            avatar: project.client.avatar,
          }
        }));
      })
    );
  }

}

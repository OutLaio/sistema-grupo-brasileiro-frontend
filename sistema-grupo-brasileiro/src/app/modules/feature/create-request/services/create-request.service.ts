import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CreateRequestService {
  private readonly apiUrl = 'http://localhost:8080/api/v1/';

  constructor(private http: HttpClient) { }

  submitSignpostRequest(
    sendCompanies: number[],
    sendOthersCompanies: string[],
    boardType: number,
    boardLocation: string,
    sector: string,
    description: string,
    height: number,
    width: number
  ): Observable<any> {

    const idUser = sessionStorage.getItem('idUser');

    const requestBody = {
      projectForm: {
        idClient: Number(idUser),
        title: 'Placa de Sinalização',
      },
      briefingForm: {
        expectedDate: '2024-10-27',
        detailedDescription: description,
        companies: sendCompanies.map(id => ({ idCompany: id })),
        otherCompany: sendOthersCompanies.join(', '), 
        idBriefingType: 2,
        measurement: {
          height: height,
          length: width
        }
      },
      signpostForm: {
        idMaterial: boardType,
        boardLocation: boardLocation,
        sector: sector
      }
    };

    return this.http.post(`${this.apiUrl}signposts`, requestBody);
  }
}

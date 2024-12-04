import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EjemploHypeauditorService {
  private apiUrl = 'http://localhost:8080/manual-ops/api/report';
  private backendUrl = 'http://localhost:8080/manual-ops/api/discover';

  constructor(private http: HttpClient) {}

  getReport(username: string): Observable<any> {
    return this.http.get(`${this.apiUrl}?username=${username}`);
  }

  sendData(requestBody: any): Observable<any> {
    return this.http.post<any>(this.backendUrl, requestBody);
  }
}

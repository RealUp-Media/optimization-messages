import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { GlobalConfig } from '../global-config';

const BASE_URL = GlobalConfig.apiUrl;

@Injectable({
  providedIn: 'root',
})
export class UgcService {
  constructor(private http: HttpClient, private service: AuthService) {}

  saveSaleUGC(signupRequest: any): Observable<any> {
    return this.http.post(BASE_URL + 'api/v1/ugc/save-sale', signupRequest, {
      headers: this.service.createAuthorizationHeader(),
    });
  }
}

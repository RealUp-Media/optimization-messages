import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { GlobalConfig } from '../global-config';
import { Router } from '@angular/router';
//https://shielded-waters-57044-1dfb83ef6590.herokuapp.com/
//https://app-manual-ops-2ac2f5234c81.herokuapp.com/
//http://localhost:8080/

const BASE_URL = GlobalConfig.apiUrl;

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient, private router: Router) {}

  signup(signupRequest: any): Observable<any> {
    return this.http.post(BASE_URL + 'sign-up', signupRequest, {
      headers: this.createAuthorizationHeader(),
    });
  }

  login(loginRequest: any): Observable<any> {
    return this.http.post(BASE_URL + 'authenticate', loginRequest);
  }

  logout(): Observable<any> {
    localStorage.removeItem('JWT');
    window.open('login', '_self');
    return of(null);
  }

  createAuthorizationHeader() {
    const jwtToken = localStorage.getItem('JWT');
    if (jwtToken) {
      return new HttpHeaders().set('Authorization', 'Bearer ' + jwtToken);
    } else {
      console.log('JWT token not found in the Local Storage');
    }
    return new HttpHeaders().set('Authorization', 'Bearer ' + jwtToken);
  }

  verificarToken() {
    const token = localStorage.getItem('JWT');

    if (token) {
      const headers = new HttpHeaders({
        Authorization: `Bearer ${token}`,
      });

      this.http
        .get(BASE_URL + 'api/v1/crowdposting/see-sales', { headers })
        .subscribe(
          (data) => {
            console.log('Respuesta exitosa');
          },
          (error) => {
            console.error('Error en la solicitud:', error);

            // Guarda la URL actual antes de redirigir al login
            localStorage.setItem(
              'redirectAfterLogin',
              window.location.pathname
            );

            localStorage.removeItem('JWT');
            this.router.navigate(['/login']);
          }
        );
    } else {
      console.error('Token no presente en localStorage');

      // Guarda la URL actual antes de redirigir
      localStorage.setItem('redirectAfterLogin', window.location.pathname);

      this.router.navigate(['/login']);
    }
  }
}

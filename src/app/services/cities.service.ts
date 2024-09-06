import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { GlobalConfig } from '../global-config';

const BASE_URL = GlobalConfig.apiUrl;

@Injectable({
  providedIn: 'root',
})
export class CitiesService {
  constructor(private http: HttpClient, private service: AuthService) {}

  // seeCitiesArgentina(): Observable<any> {
  //   return this.http.get(BASE_URL + 'api/v1/cities/see-cities/Argentina', {
  //     headers: this.service.createAuthorizationHeader(),
  //   });
  // }
  seeCitiesArgentina(): Observable<{ name: string; code: string }[]> {
    return this.http
      .get<string[]>(BASE_URL + 'api/v1/cities/see-cities/Argentina', {
        headers: this.service.createAuthorizationHeader(),
      })
      .pipe(
        map((cities) =>
          cities.map((city, index) => ({
            name: city,
            code: city.replace(/\s/g, '').slice(0, 3).toUpperCase(),
          }))
        )
      );
  }

  seeCitiesBolivia(): Observable<{ name: string; code: string }[]> {
    return this.http
      .get<string[]>(BASE_URL + 'api/v1/cities/see-cities/Bolivia', {
        headers: this.service.createAuthorizationHeader(),
      })
      .pipe(
        map((cities) =>
          cities.map((city, index) => ({
            name: city,
            code: city.replace(/\s/g, '').slice(0, 3).toUpperCase(),
          }))
        )
      );
  }

  seeCitiesBrazil(): Observable<{ name: string; code: string }[]> {
    return this.http
      .get<string[]>(BASE_URL + 'api/v1/cities/see-cities/Brazil', {
        headers: this.service.createAuthorizationHeader(),
      })
      .pipe(
        map((cities) =>
          cities.map((city, index) => ({
            name: city,
            code: city.replace(/\s/g, '').slice(0, 3).toUpperCase(),
          }))
        )
      );
  }

  seeCitiesChile(): Observable<{ name: string; code: string }[]> {
    return this.http
      .get<string[]>(BASE_URL + 'api/v1/cities/see-cities/Chile', {
        headers: this.service.createAuthorizationHeader(),
      })
      .pipe(
        map((cities) =>
          cities.map((city, index) => ({
            name: city,
            code: city.replace(/\s/g, '').slice(0, 3).toUpperCase(),
          }))
        )
      );
  }

  seeCitiesColombia(): Observable<{ name: string; code: string }[]> {
    return this.http
      .get<string[]>(BASE_URL + 'api/v1/cities/see-cities/Colombia', {
        headers: this.service.createAuthorizationHeader(),
      })
      .pipe(
        map((cities) =>
          cities.map((city, index) => ({
            name: city,
            code: city.replace(/\s/g, '').slice(0, 3).toUpperCase(),
          }))
        )
      );
  }

  seeCitiesEcuador(): Observable<{ name: string; code: string }[]> {
    return this.http
      .get<string[]>(BASE_URL + 'api/v1/cities/see-cities/Ecuador', {
        headers: this.service.createAuthorizationHeader(),
      })
      .pipe(
        map((cities) =>
          cities.map((city, index) => ({
            name: city,
            code: city.replace(/\s/g, '').slice(0, 3).toUpperCase(),
          }))
        )
      );
  }

  seeCitiesParaguay(): Observable<{ name: string; code: string }[]> {
    return this.http
      .get<string[]>(BASE_URL + 'api/v1/cities/see-cities/Paraguay', {
        headers: this.service.createAuthorizationHeader(),
      })
      .pipe(
        map((cities) =>
          cities.map((city, index) => ({
            name: city,
            code: city.replace(/\s/g, '').slice(0, 3).toUpperCase(),
          }))
        )
      );
  }

  seeCitiesPeru(): Observable<{ name: string; code: string }[]> {
    return this.http
      .get<string[]>(BASE_URL + 'api/v1/cities/see-cities/Peru', {
        headers: this.service.createAuthorizationHeader(),
      })
      .pipe(
        map((cities) =>
          cities.map((city, index) => ({
            name: city,
            code: city.replace(/\s/g, '').slice(0, 3).toUpperCase(),
          }))
        )
      );
  }

  seeCitiesUruguay(): Observable<{ name: string; code: string }[]> {
    return this.http
      .get<string[]>(BASE_URL + 'api/v1/cities/see-cities/Uruguay', {
        headers: this.service.createAuthorizationHeader(),
      })
      .pipe(
        map((cities) =>
          cities.map((city, index) => ({
            name: city,
            code: city.replace(/\s/g, '').slice(0, 3).toUpperCase(),
          }))
        )
      );
  }

  seeCitiesCostaRica(): Observable<{ name: string; code: string }[]> {
    return this.http
      .get<string[]>(BASE_URL + 'api/v1/cities/see-cities/Costa Rica', {
        headers: this.service.createAuthorizationHeader(),
      })
      .pipe(
        map((cities) =>
          cities.map((city, index) => ({
            name: city,
            code: city.replace(/\s/g, '').slice(0, 3).toUpperCase(),
          }))
        )
      );
  }
  seeCitiesCuba(): Observable<{ name: string; code: string }[]> {
    return this.http
      .get<string[]>(BASE_URL + 'api/v1/cities/see-cities/Cuba', {
        headers: this.service.createAuthorizationHeader(),
      })
      .pipe(
        map((cities) =>
          cities.map((city, index) => ({
            name: city,
            code: city.replace(/\s/g, '').slice(0, 3).toUpperCase(),
          }))
        )
      );
  }
  seeCitiesElSalvador(): Observable<{ name: string; code: string }[]> {
    return this.http
      .get<string[]>(BASE_URL + 'api/v1/cities/see-cities/El Salvador', {
        headers: this.service.createAuthorizationHeader(),
      })
      .pipe(
        map((cities) =>
          cities.map((city, index) => ({
            name: city,
            code: city.replace(/\s/g, '').slice(0, 3).toUpperCase(),
          }))
        )
      );
  }
  seeCitiesGuatemala(): Observable<{ name: string; code: string }[]> {
    return this.http
      .get<string[]>(BASE_URL + 'api/v1/cities/see-cities/Guatemala', {
        headers: this.service.createAuthorizationHeader(),
      })
      .pipe(
        map((cities) =>
          cities.map((city, index) => ({
            name: city,
            code: city.replace(/\s/g, '').slice(0, 3).toUpperCase(),
          }))
        )
      );
  }
  seeCitiesHonduras(): Observable<{ name: string; code: string }[]> {
    return this.http
      .get<string[]>(BASE_URL + 'api/v1/cities/see-cities/Honduras', {
        headers: this.service.createAuthorizationHeader(),
      })
      .pipe(
        map((cities) =>
          cities.map((city, index) => ({
            name: city,
            code: city.replace(/\s/g, '').slice(0, 3).toUpperCase(),
          }))
        )
      );
  }
  seeCitiesMexico(): Observable<{ name: string; code: string }[]> {
    return this.http
      .get<string[]>(BASE_URL + 'api/v1/cities/see-cities/Mexico', {
        headers: this.service.createAuthorizationHeader(),
      })
      .pipe(
        map((cities) =>
          cities.map((city, index) => ({
            name: city,
            code: city.replace(/\s/g, '').slice(0, 3).toUpperCase(),
          }))
        )
      );
  }
  seeCitiesNicaragua(): Observable<{ name: string; code: string }[]> {
    return this.http
      .get<string[]>(BASE_URL + 'api/v1/cities/see-cities/Nicaragua', {
        headers: this.service.createAuthorizationHeader(),
      })
      .pipe(
        map((cities) =>
          cities.map((city, index) => ({
            name: city,
            code: city.replace(/\s/g, '').slice(0, 3).toUpperCase(),
          }))
        )
      );
  }
  seeCitiesPanama(): Observable<{ name: string; code: string }[]> {
    return this.http
      .get<string[]>(BASE_URL + 'api/v1/cities/see-cities/Panama', {
        headers: this.service.createAuthorizationHeader(),
      })
      .pipe(
        map((cities) =>
          cities.map((city, index) => ({
            name: city,
            code: city.replace(/\s/g, '').slice(0, 3).toUpperCase(),
          }))
        )
      );
  }
  seeCitiesPuertoRico(): Observable<{ name: string; code: string }[]> {
    return this.http
      .get<string[]>(BASE_URL + 'api/v1/cities/see-cities/Puerto Rico', {
        headers: this.service.createAuthorizationHeader(),
      })
      .pipe(
        map((cities) =>
          cities.map((city, index) => ({
            name: city,
            code: city.replace(/\s/g, '').slice(0, 3).toUpperCase(),
          }))
        )
      );
  }
  seeCitiesUnitedStates(): Observable<{ name: string; code: string }[]> {
    return this.http
      .get<string[]>(BASE_URL + 'api/v1/cities/see-cities/United States', {
        headers: this.service.createAuthorizationHeader(),
      })
      .pipe(
        map((cities) =>
          cities.map((city, index) => ({
            name: city,
            code: city.replace(/\s/g, '').slice(0, 3).toUpperCase(),
          }))
        )
      );
  }
  seeCitiesDominicanRepublic(): Observable<{ name: string; code: string }[]> {
    return this.http
      .get<string[]>(BASE_URL + 'api/v1/cities/see-cities/Dominican Republic', {
        headers: this.service.createAuthorizationHeader(),
      })
      .pipe(
        map((cities) =>
          cities.map((city, index) => ({
            name: city,
            code: city.replace(/\s/g, '').slice(0, 3).toUpperCase(),
          }))
        )
      );
  }
  seeCitiesCanada(): Observable<{ name: string; code: string }[]> {
    return this.http
      .get<string[]>(BASE_URL + 'api/v1/cities/see-cities/Canada', {
        headers: this.service.createAuthorizationHeader(),
      })
      .pipe(
        map((cities) =>
          cities.map((city, index) => ({
            name: city,
            code: city.replace(/\s/g, '').slice(0, 3).toUpperCase(),
          }))
        )
      );
  }
  seeCitiesVenezuela(): Observable<{ name: string; code: string }[]> {
    return this.http
      .get<string[]>(BASE_URL + 'api/v1/cities/see-cities/Venezuela', {
        headers: this.service.createAuthorizationHeader(),
      })
      .pipe(
        map((cities) =>
          cities.map((city, index) => ({
            name: city,
            code: city.replace(/\s/g, '').slice(0, 3).toUpperCase(),
          }))
        )
      );
  }
}

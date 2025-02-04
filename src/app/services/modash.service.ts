import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GlobalConfig } from '../global-config';

const BASE_URL = GlobalConfig.apiUrl;

@Injectable({
  providedIn: 'root',
})
export class ModashService {
  constructor(private http: HttpClient) {}

  // getReportInstagram(username: string): Observable<any> {
  //   return this.http.get(
  //     `${BASE_URL}manual-ops/api/modash/ig-report?username=${username}`
  //   );
  // }

  getReportInstagram(username: string): Observable<any> {
    return this.http.get('assets/data.json');
  }

  // discoverInfluencers(filterData: any): Observable<any> {
  //   return this.http.post<any>(
  //     BASE_URL + 'manual-ops/api/modash/ig-discover',
  //     filterData
  //   );
  // }

  discoverInfluencers(): Observable<any> {
    return this.http.get('assets/dataDiscover.json');
  }
}

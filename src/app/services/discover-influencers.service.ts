import { Injectable } from '@angular/core';
import { GlobalConfig } from '../global-config';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const BASE_URL = GlobalConfig.apiUrl;

@Injectable({
  providedIn: 'root',
})
export class DiscoverInfluencersService {
  constructor(private http: HttpClient) {}

  discoverInfluencers(filterData: any): Observable<any> {
    return this.http.post<any>(
      BASE_URL + 'manual-ops/api/modash/ig-discover',
      filterData
    );
  }

  // discoverInfluencers(): Observable<any> {
  //   return this.http.get('assets/dataDiscover.json');
  // }

  getLocations(): Observable<any> {
    return this.http.get('assets/data/location.json');
  }

  getReportInstagram(username: string): Observable<any> {
    return this.http.get(
      `${BASE_URL}manual-ops/api/modash/ig-report?username=${username}`
    );
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GlobalConfig } from '../global-config';

const BASE_URL = GlobalConfig.apiUrl;

@Injectable({
  providedIn: 'root',
})
export class InfluencersService {
  constructor(private http: HttpClient) {}

  postInfluencer(influencer: any): Observable<any> {
    return this.http.post(
      BASE_URL + 'manual-ops/api/influencers/add-influencer',
      influencer
    );
  }

  getAllInfluencer(): Observable<any> {
    return this.http.get(
      BASE_URL + 'manual-ops/api/influencers/see-influencer'
    );
  }
}

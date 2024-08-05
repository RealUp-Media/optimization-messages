import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

//https://app-manual-ops-2ac2f5234c81.herokuapp.com/
//http://localhost:8080/

const BASE_URL = ['https://app-manual-ops-2ac2f5234c81.herokuapp.com/'];

@Injectable({
  providedIn: 'root',
})
export class CampaignService {
  constructor(private http: HttpClient) {}

  addCampaign(campaign: any): Observable<any> {
    return this.http.post(BASE_URL + 'manual-ops/add-campaign', campaign);
  }

  getCampaignPreparation(): Observable<any> {
    return this.http.get(BASE_URL + 'manual-ops/preparation');
  }

  getCampaignExecution(): Observable<any> {
    return this.http.get(BASE_URL + 'manual-ops/execution');
  }

  getCampaignClosed(): Observable<any> {
    return this.http.get(BASE_URL + 'manual-ops/closed');
  }

  updateNumberCompletedTask(
    idCampaign: number,
    taskCompleted: any
  ): Observable<any> {
    return this.http.put<any>(
      BASE_URL + `manual-ops/update-task-completed/${idCampaign}`,
      taskCompleted
    );
  }

  getOpDaily(nameOp: any): Observable<any> {
    return this.http.post(BASE_URL + 'manual-ops/daily/see-op-daily', nameOp);
  }

  addDaily(dailyData: any): Observable<any> {
    return this.http.post(BASE_URL + 'manual-ops/daily/add-daily', dailyData);
  }

  updateDaily(dailyData: any): Observable<any> {
    return this.http.put<any>(
      BASE_URL + 'manual-ops/daily/update-daily',
      dailyData
    );
  }

  deleteOpDaily(idDaily: any): Observable<any> {
    return this.http.post(BASE_URL + 'manual-ops/daily/delete-daily', idDaily);
  }
}

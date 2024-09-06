import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GlobalConfig } from '../global-config';

const BASE_URL = GlobalConfig.apiUrl;

@Injectable({
  providedIn: 'root',
})
export class ChecklistService {
  constructor(private http: HttpClient) {}

  getTaskCompleted(idCampaign: number): Observable<any> {
    return this.http.get<any>(
      BASE_URL + `manual-ops/checklist/get-task-id/${idCampaign}`
    );
  }

  updateTaskCompleted(idCampaign: number, taskData: any): Observable<any> {
    return this.http.put<any>(
      BASE_URL + `manual-ops/checklist/update-task-id/${idCampaign}`,
      taskData
    );
  }

  updateContentTaskCompleted(
    idCampaign: number,
    taskContentData: any
  ): Observable<any> {
    return this.http.put<any>(
      BASE_URL + `manual-ops/checklist/update-content-task-id/${idCampaign}`,
      taskContentData
    );
  }

  getNumberOfContentsCampaign(campaignId: number): Observable<number> {
    return this.http.get<number>(
      BASE_URL + `manual-ops/checklist/number-contents-campaign/${campaignId}`
    );
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GlobalConfig } from '../global-config';

//https://app-manual-ops-2ac2f5234c81.herokuapp.com/
//http://localhost:8080/

const BASE_URL = GlobalConfig.apiUrl;

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

  getCampaignsProposal(): Observable<any> {
    return this.http.get(BASE_URL + 'manual-ops/proposal');
  }

  getCampaignsArchived(): Observable<any> {
    return this.http.get(BASE_URL + 'manual-ops/archived');
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

  getOpDailyTitle(nameAndTitleOp: any): Observable<any> {
    return this.http.post(
      BASE_URL + 'manual-ops/daily/get-title',
      nameAndTitleOp
    );
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

  updateDailyTitle(dailyData: any): Observable<any> {
    return this.http.put<any>(
      BASE_URL + 'manual-ops/daily/update-title-daily',
      dailyData
    );
  }

  deleteOpDaily(idDaily: any): Observable<any> {
    return this.http.post(BASE_URL + 'manual-ops/daily/delete-daily', idDaily);
  }

  getNumberOfContents(campaignId: number): Observable<number> {
    return this.http.get<number>(
      BASE_URL + `manual-ops/number-contents/${campaignId}`
    );
  }

  updateCampaign(dailyData: any): Observable<any> {
    return this.http.put<any>(
      BASE_URL + 'manual-ops/update-campaign',
      dailyData
    );
  }

  getWeeklyWorkload(): Observable<number> {
    return this.http.get<number>(
      BASE_URL + `manual-ops/weekly/get-weekly-load`
    );
  }

  updateWeeklyLoad(weeklyData: any): Observable<any> {
    return this.http.put<any>(
      BASE_URL + 'manual-ops/weekly/update-weekly-load',
      weeklyData
    );
  }

  updateCampaignTitle(
    idCampaign: number,
    numberState: number
  ): Observable<any> {
    return this.http.put<any>(
      BASE_URL +
        `manual-ops/update-campaign-state/${idCampaign}?state=${numberState}`,
      null
    );
  }

  getNameCampaign(nameOp: string): Observable<any> {
    return this.http.get(
      BASE_URL + `manual-ops/get-name-campaign-op/${nameOp}`
    );
  }

  getAllDailyTask(): Observable<any> {
    return this.http.get(BASE_URL + 'manual-ops/daily/get-daily');
  }

  getAllCampaigns(): Observable<any> {
    return this.http.get(BASE_URL + 'manual-ops/see-campaign');
  }

  updateAllDaily(dailyData: any): Observable<any> {
    return this.http.put<any>(
      BASE_URL + 'manual-ops/daily/update-all',
      dailyData
    );
  }

  updateColorCampaign(data: any): Observable<any> {
    return this.http.put<any>(
      BASE_URL + 'manual-ops/update-campaign-color',
      data
    );
  }

  updateColorTask(data: any): Observable<any> {
    return this.http.put<any>(
      BASE_URL + 'manual-ops/daily/update-task-color',
      data
    );
  }

  updateTimeTask(data: any): Observable<any> {
    return this.http.put<any>(
      BASE_URL + 'manual-ops/daily/update-time-task',
      data
    );
  }

  getCampaignById(idCampaign: number): Observable<any> {
    return this.http.get(
      BASE_URL + `manual-ops/get-campaign-by-id/${idCampaign}`
    );
  }
}

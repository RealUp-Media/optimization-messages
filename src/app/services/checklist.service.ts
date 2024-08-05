import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const BASE_URL = ['http://localhost:8080/'];

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
}

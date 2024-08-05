import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { MessagesTemplateComponent } from './components/messages-template/messages-template.component';
import { TemplateContractsComponent } from './components/template-contracts/template-contracts.component';
import { CampaignComponent } from './components/campaign/campaign.component';
import { ChecklistComponent } from './components/checklist/checklist.component';
import { ScheduleComponent } from './components/schedule/schedule.component';

export const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'messages-template', component: MessagesTemplateComponent },
  { path: 'templates-contract', component: TemplateContractsComponent },
  { path: 'campaign', component: CampaignComponent },
  { path: 'checklist/:idCampaign', component: ChecklistComponent },
  { path: 'schedule', component: ScheduleComponent },
];

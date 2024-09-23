import { RouterModule, Routes } from '@angular/router';
import { MessagesTemplateComponent } from './components/messages-template/messages-template.component';
import { TemplateContractsComponent } from './components/template-contracts/template-contracts.component';
import { CampaignComponent } from './components/campaign/campaign.component';
import { ChecklistComponent } from './components/checklist/checklist.component';
import { ScheduleComponent } from './components/schedule/schedule.component';
import { NgModule } from '@angular/core';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { LoginComponent } from './components/login/login.component';
import { CrowdpostingComponent } from './components/crowdposting/crowdposting.component';
import { UgcComponent } from './components/ugc/ugc.component';
import { BrandAmbassadorComponent } from './components/brand-ambassador/brand-ambassador.component';
import { HomeComponent } from './components/home/home.component';
import { DailyChecklistComponent } from './components/daily-checklist/daily-checklist.component';
import { DailySalesComponent } from './components/daily-sales/daily-sales.component';
import { WeeklyWorkloadsComponent } from './components/weekly-workloads/weekly-workloads.component';
import { ChatbotComponent } from './components/chatbot/chatbot.component';

export const routes: Routes = [
  { path: 'messages-template', component: MessagesTemplateComponent },
  { path: 'templates-contract', component: TemplateContractsComponent },
  { path: 'campaign', component: CampaignComponent },
  { path: 'checklist/:idCampaign', component: ChecklistComponent },
  { path: 'schedule', component: ScheduleComponent },
  { path: 'login', component: LoginComponent },
  { path: 'crowdposting', component: CrowdpostingComponent },
  { path: 'ugc', component: UgcComponent },
  { path: 'brand-ambassador', component: BrandAmbassadorComponent },
  { path: 'home', component: HomeComponent },
  { path: 'daily-checklist', component: DailyChecklistComponent },
  { path: 'daily-sales', component: DailySalesComponent },
  { path: 'weekly-workloads', component: WeeklyWorkloadsComponent },
  { path: 'chatbot', component: ChatbotComponent },
];

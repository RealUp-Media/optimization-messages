import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { MessagesTemplateComponent } from './components/messages-template/messages-template.component';
import { TemplateContractsComponent } from './components/template-contracts/template-contracts.component';

export const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'messages-template', component: MessagesTemplateComponent },
  { path: 'templates-contract', component: TemplateContractsComponent },
];

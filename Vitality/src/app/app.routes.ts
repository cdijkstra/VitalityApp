import { Routes } from '@angular/router';
import { SportsOverviewComponent } from './sports-overview/sports-overview';
import { SportDetailComponent } from './sport-detail/sport-detail';
import { DailyChecklist } from './daily-checklist/daily-checklist';

export const routes: Routes = [
  { path: '', component: SportsOverviewComponent },
  { path: 'sports/:name', component: SportDetailComponent },
  { path: 'daily-checklist', component: DailyChecklist },
];

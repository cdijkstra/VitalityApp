import { Routes } from '@angular/router';
import { SportsOverviewComponent } from './sports-overview/sports-overview';
import { SportDetailComponent } from './sport-detail/sport-detail';

export const routes: Routes = [
  { path: 'sports', component: SportsOverviewComponent },
  { path: 'sports/:name', component: SportDetailComponent },
];

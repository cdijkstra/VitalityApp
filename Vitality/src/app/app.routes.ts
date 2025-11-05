import { Routes } from '@angular/router';
import { SportsOverviewComponent } from './sports-overview/sports-overview';
import { SportDetailComponent } from './sport-detail/sport-detail';
import { DailyChecklist } from './daily-checklist/daily-checklist';
import { EventsComponent } from './events/events';
import { AboutComponent } from './about/about';
import { ProfileComponent } from './profile/profile.component';

export const routes: Routes = [
  { path: '', component: SportsOverviewComponent },
  { path: 'sports', component: SportsOverviewComponent },
  { path: 'sports/:name', component: SportDetailComponent },
  { path: 'daily-checklist', component: DailyChecklist },
  { path: 'events', component: EventsComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'about', component: AboutComponent },
];

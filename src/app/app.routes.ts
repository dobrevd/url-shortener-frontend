import { Routes } from '@angular/router';
import { UrlShortenerComponent } from './features/url-shortener/url-shortener.component';
import { AuditComponent } from './features/audit/audit.component';
import { StatsComponent } from './features/stats/stats.component';
import { HomeComponent } from './features/home/home.component';

export const routes: Routes = [
  { path: 'shortener', component: UrlShortenerComponent },
  { path: 'audit', component: AuditComponent },
  { path: 'stats', component: StatsComponent },
  { path: '', component: HomeComponent, pathMatch: 'full' },
];

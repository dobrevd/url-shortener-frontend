import { Routes } from '@angular/router';
import { UrlShortenerComponent } from './features/url-shortener/url-shortener.component';
import { AuditComponent } from './features/audit/audit.component';
import { StatsComponent } from './features/stats/stats.component';
import { HomeComponent } from './features/home/home.component';
import { AboutProjectComponent } from './shared/header/about-project/about-project.component';
import { ContactsComponent } from './shared/header/contacts/contacts.component';

export const routes: Routes = [
  { path: 'shortener', component: UrlShortenerComponent },
  { path: 'audit', component: AuditComponent },
  { path: 'stats', component: StatsComponent },
  { path: 'about', component: AboutProjectComponent },
  { path: 'contacts', component: ContactsComponent },
  { path: '', component: HomeComponent, pathMatch: 'full' },
];

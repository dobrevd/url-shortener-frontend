import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UrlShortenerComponent } from './features/url-shortener/url-shortener.component';

const routes: Routes = [
  { path: 'shortener', component: UrlShortenerComponent },
  { path: '', redirectTo: 'shortener', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}

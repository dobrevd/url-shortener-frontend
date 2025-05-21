import { CommonModule } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UrlActionButtonComponent } from './buttons/url-action-button/url-action-button.component';
import { HeaderComponent } from './header/header/header.component';

import { environment } from '../../../environments/environment.dev';

@Component({
  selector: 'app-url-shortener',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    UrlActionButtonComponent,
    HeaderComponent,
  ],
  templateUrl: './url-shortener.component.html',
  styleUrl: './url-shortener.component.css',
})
export class UrlShortenerComponent {
  originalUrl = '';
  shortUrl: string | null = null;
  userId = '';
  isShortenFormVisible: boolean = false;
  isResolveFormVisible: boolean = false;
  shortUrlKey = '';
  retrievedLongUrl = '';

  activeAction: 'shorten' | 'resolve' | null = null;

  constructor(private http: HttpClient) {}

  showShortenForm() {
    this.isResolveFormVisible = false;
    this.isShortenFormVisible = true;
    this.activeAction = 'shorten';
  }

  showResolveForm() {
    this.isResolveFormVisible = true;
    this.isShortenFormVisible = false;
    this.activeAction = 'resolve';
  }

  shortenUrl() {
    const headers = new HttpHeaders().set('x-user-id', this.userId);
    const payload = {
      url: this.originalUrl,
    };

    console.log('Sending headers:', headers);

    this.http
      .post(environment.apis.shortener, payload, {
        headers,
        responseType: 'text',
      })
      .subscribe({
        next: (result) => (this.shortUrl = result),
        error: (err) => console.error('Error while shortening', err),
      });
  }

  resolveUrl() {
    const headers = new HttpHeaders().set('x-user-id', this.userId);
    if (!this.userId) {
      alert('User ID is required');
      return;
    }

    this.http
      .get(`${environment.apis.shortener}?shortUrl=${this.shortUrlKey}`, {
        headers,
        responseType: 'text',
      })
      .subscribe({
        next: (result) => (this.retrievedLongUrl = result),
        error: (err) => console.error('Error while resolving', err),
      });
  }
}

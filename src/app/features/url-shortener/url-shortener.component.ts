import { CommonModule } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-url-shortener',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './url-shortener.component.html',
  styleUrl: './url-shortener.component.css',
})
export class UrlShortenerComponent {
  originalUrl = '';
  shortUrl: string | null = null;
  userId = '';
  mode: 'shorten' | 'resolve' = 'shorten';
  shortUrlKey = '';
  retrievedLongUrl = '';

  constructor(private http: HttpClient) {}

  shortenUrl() {
    const headers = new HttpHeaders().set('x-user-id', this.userId);
    const payload = {
      url: this.originalUrl,
    };

    console.log('Sending headers:', headers);

    this.http
      .post('http://localhost:8080/api', payload, {
        headers,
        responseType: 'text',
      })
      .subscribe({
        next: (result) => (this.shortUrl = result),
        error: (err) => console.error('Error while shortening', err),
      });
  }

  toggleMode() {
    this.mode = this.mode === 'shorten' ? 'resolve' : 'shorten';
  }

  resolveUrl() {
    const headers = new HttpHeaders().set('x-user-id', this.userId);
    if (!this.userId) {
      alert('User ID is required');
      return;
    }

    this.http
      .get(`http://localhost:8080/api?shortUrl=${this.shortUrlKey}`, {
        headers,
        responseType: 'text',
      })
      .subscribe({
        next: (result) => (this.retrievedLongUrl = result),
        error: (err) => console.error('Error while resolving', err),
      });
  }
}

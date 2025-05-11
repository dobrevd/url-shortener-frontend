import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../../shared/header/header.component';
import { HttpClient } from '@angular/common/http';
import { UrlEvent } from '../../shared/interfaces/urlevent.interface';
import { DatePipe } from '@angular/common';
import { catchError, finalize, of } from 'rxjs';

@Component({
  selector: 'app-audit',
  imports: [HeaderComponent, DatePipe],
  templateUrl: './audit.component.html',
  styleUrl: './audit.component.css',
})
export class AuditComponent implements OnInit {
  result: UrlEvent[] = [];
  isLoading: boolean = false;
  error: string | null = null;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchLog();
  }

  get isEmpty(): boolean {
    return this.result.length === 0;
  }

  fetchLog() {
    this.isLoading = true;
    this.error = null;

    this.http
      .get<UrlEvent[]>('/api/audit')
      .pipe(
        catchError((err) => {
          console.error('Error while receiving url events', err);
          this.error = 'Failed to load audit log. Please try again later.';
          return of([]);
        }),
        finalize(() => {
          this.isLoading = false;
        })
      )
      .subscribe({
        next: (result) => {
          this.result = result;
        },
      });
  }
}

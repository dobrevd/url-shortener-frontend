import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from '../../shared/header/header.component';
import { HttpClient, HttpParams } from '@angular/common/http';
import { UrlEvent } from '../../shared/interfaces/urlevent.interface';
import { PageResponse } from '../../shared/interfaces/PageResponse.interface';
import { DatePipe } from '@angular/common';
import { catchError, finalize, of } from 'rxjs';

@Component({
  selector: 'app-audit',
  standalone: true,
  imports: [HeaderComponent, DatePipe, FormsModule],
  templateUrl: './audit.component.html',
  styleUrl: './audit.component.css',
})
export class AuditComponent implements OnInit {
  result: UrlEvent[] = [];
  isLoading: boolean = false;
  error: string | null = null;

  // Pagination properties
  currentPage: number = 0;
  pageSize: number = 5;
  totalPages: number = 0;
  totalElements: number = 0;
  sortField: string = 'timestamp';
  sortDirection: string = 'desc';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchLog();
  }

  get isEmpty(): boolean {
    return this.result.length === 0;
  }

  fetchLog(page: number = this.currentPage) {
    this.isLoading = true;
    this.error = null;
    this.currentPage = page;

    // Set up query parameters
    let params = new HttpParams()
      .set('page', page.toString())
      .set('size', this.pageSize.toString())
      .set('sort', `${this.sortField},${this.sortDirection}`);

    this.http
      .get<PageResponse<UrlEvent>>('http://localhost/api/audit', {  // localhost:8082
        params,
      })
      .pipe(
        catchError((err) => {
          console.error('Error while receiving url events', err);
          this.error = 'Failed to load audit log. Please try again later.';
          return of({
            content: [],
            totalPages: 0,
            totalElements: 0,
            size: this.pageSize,
            number: page,
          });
        }),
        finalize(() => {
          this.isLoading = false;
        })
      )
      .subscribe({
        next: (response) => {
          this.result = response.content;
          this.totalPages = response.totalPages;
          this.totalElements = response.totalElements;
        },
      });
  }

  onPageChange(newPage: number) {
    this.fetchLog(newPage);
  }

  changeSort(field: string) {
    if (this.sortField === field) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortField = field;
      this.sortDirection = 'asc';
    }
    this.fetchLog(0); // Reset to first page when sorting changes
  }
}

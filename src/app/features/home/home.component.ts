import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HeaderComponent } from "../../shared/header/header.component";

@Component({
  selector: 'app-home',
  imports: [HeaderComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  constructor(private router: Router) {}

  navigateToUrlShortener() {
    this.router.navigate(['/shortener']);
  }

  navigateToAudit() {
    this.router.navigate(['/audit']);
  }

  navigateToStats() {
    this.router.navigate(['/stats']);
  }
}

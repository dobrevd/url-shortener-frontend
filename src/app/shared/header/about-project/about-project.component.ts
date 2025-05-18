import { Component } from '@angular/core';
import { HeaderComponent } from '../header.component';

@Component({
  selector: 'app-about-project',
  standalone: true,
  imports: [HeaderComponent],
  templateUrl: './about-project.component.html',
  styleUrl: './about-project.component.css',
})
export class AboutProjectComponent {}

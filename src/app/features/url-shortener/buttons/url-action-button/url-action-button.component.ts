import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-url-action-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './url-action-button.component.html',
  styleUrl: './url-action-button.component.css',
})
export class UrlActionButtonComponent {
  @Input() buttonText: string = '';
  @Input() customClass: string = '';
}

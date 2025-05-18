import { Component } from '@angular/core';
import { HeaderComponent } from '../header.component';

@Component({
  selector: 'app-contacts',
  imports: [HeaderComponent],
  templateUrl: './contacts.component.html',
  styleUrl: './contacts.component.css',
})
export class ContactsComponent {}

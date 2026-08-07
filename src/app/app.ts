import { Component, signal } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('bank-loan-app');

  loggedUserData: any;

  constructor() {
    const localData = localStorage.getItem('bankUser');
    if (localData != null) {
      this.loggedUserData = JSON.parse(localData);
    }
  }

  onLogOff() {
    localStorage.removeItem('bankUser');
    this.loggedUserData = undefined;
  }
}

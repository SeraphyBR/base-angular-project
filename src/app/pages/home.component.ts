import { CommonModule } from '@angular/common';
import { Component, HostBinding } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { Router } from '@angular/router';
import AuthService from '../services/auth.service';

@Component({
  selector: 'app-home-page',
  imports: [CommonModule, MatCardModule, MatButtonModule],
  template: `
    <mat-card class="tw-min-w-80 tw-gap-4 tw-rounded tw-p-6">
      <p class="tw-text-xl">Bem Vindo, {{ username }}!</p>
      <button mat-button (click)="logout()">Logout</button>
    </mat-card>
  `,
})
export default class HomePageComponent {
  @HostBinding('class') className = 'tw-bg-blue-400 tw-flex tw-justify-center tw-items-center tw-h-screen';

  protected username: string;

  constructor(
    private auth: AuthService,
    private router: Router,
  ) {
    const user = this.auth.getLoggedUser();
    this.username = user ? user.fullname : 'Visitante';
  }

  protected logout() {
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}

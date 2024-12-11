import { CommonModule } from '@angular/common';
import { Component, HostBinding } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import AuthService from '../services/auth.service';

@Component({
  selector: 'app-home-page',
  imports: [CommonModule, MatCardModule],
  template: `
    <mat-card class="tw-min-w-80 tw-rounded tw-p-6">
      <p class="tw-text-xl">Bem Vindo, {{ username }}!</p>
    </mat-card>
  `,
})
export default class HomePageComponent {
  @HostBinding('class') className = 'tw-bg-blue-400 tw-flex tw-justify-center tw-items-center tw-h-screen';

  username: string;

  constructor(private auth: AuthService) {
    const user = this.auth.getLoggedUser();
    this.username = user ? user.fullname : 'Visitante';
  }
}

import { Component, HostBinding } from '@angular/core';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-login-page',
  imports: [MatCardModule],
  template: `
    <mat-card class="tw-min-w-32 tw-rounded tw-p-6">Teste</mat-card>
  `,
})
export default class LoginPageComponent {
  @HostBinding('class') className = 'tw-flex tw-justify-center tw-items-center tw-h-screen tw-bg-green-800';
}

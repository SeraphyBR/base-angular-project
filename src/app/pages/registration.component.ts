import { CommonModule } from '@angular/common';
import { Component, HostBinding } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Router, RouterModule } from '@angular/router';
import AuthService from '../services/auth.service';

@Component({
  selector: 'app-registration-page',
  imports: [
    MatCardModule,
    MatFormFieldModule,
    CommonModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    RouterModule,
  ],
  template: `
    <mat-card class="tw-min-w-80 tw-rounded tw-p-6">
      <form class="tw-flex tw-flex-col tw-gap-1" [formGroup]="registrationForm" (ngSubmit)="onSubmit()">
        <mat-form-field>
          <mat-label>Nome Completo</mat-label>
          <input matInput placeholder="Nome Completo" formControlName="fullname" />
        </mat-form-field>

        <mat-form-field>
          <mat-label>Email</mat-label>
          <input matInput placeholder="Email" formControlName="email" />
        </mat-form-field>

        <mat-form-field>
          <mat-label>Usuario</mat-label>
          <input matInput placeholder="Usuario" formControlName="username" />
        </mat-form-field>

        <mat-form-field>
          <mat-label>Data de Nascimento</mat-label>
          <input matInput placeholder="Data de Nascimento" formControlName="dateOfBirth" />
        </mat-form-field>

        <mat-form-field>
          <mat-label>Senha</mat-label>
          <input matInput placeholder="Senha" type="password" formControlName="password" />
        </mat-form-field>

        <div class="tw-flex tw-flex-row tw-justify-between tw-gap-1">
          <button mat-flat-button color="primary" type="submit">Registrar</button>
          <button mat-stroked-button color="accent" type="button" [routerLink]="['/login']">Voltar</button>
        </div>

        <div *ngIf="errorMessage" class="tw-mt-2 tw-text-red-500">{{ errorMessage }}</div>
      </form>
    </mat-card>
  `,
})
export default class RegistrationPageComponent {
  @HostBinding('class') className = 'tw-flex tw-justify-center tw-items-center tw-h-screen tw-bg-orange-800';

  protected errorMessage?: string;

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router,
  ) {}

  protected registrationForm = this.fb.group({
    fullname: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    username: ['', Validators.required],
    dateOfBirth: ['', Validators.required],
    password: ['', Validators.required],
  });

  protected async onSubmit() {
    if (!this.registrationForm.valid) return;
    const value = this.registrationForm.getRawValue();

    try {
      const user = await this.auth.signup({
        fullname: value.fullname!,
        email: value.email!,
        username: value.username!,
        dateOfBirth: value.dateOfBirth!,
        createdAt: new Date().toISOString(),
        password: value.password!,
      });

      console.log('Registration successful', user);
      this.router.navigate(['/login']);
    } catch {
      console.log('Registration failed');
      this.errorMessage = 'Erro ao registrar. Tente novamente.';
    }
  }
}

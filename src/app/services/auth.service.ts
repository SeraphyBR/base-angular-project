import { inject, Injectable } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { User } from '../models/user.model';

const USERS_KEY = 'users';

@Injectable({
  providedIn: 'root',
})
export default class AuthService {
  private currentUser: User | undefined;

  public login(username: string, password: string): User | undefined {
    const users = this.getUsers();
    const user = users.find((u) => u.username === username && u.password === password);
    this.currentUser = user;

    return user;
  }

  public signup(newUser: User & { password: string }): boolean {
    const users = this.getUsers();
    if (users.find((u) => u.username === newUser.username || u.email === newUser.email)) {
      return false; // User already exists
    }

    localStorage.setItem(USERS_KEY, JSON.stringify([...users, newUser]));

    return true;
  }

  private getUsers(): (User & { password: string })[] {
    const usersJson = localStorage.getItem(USERS_KEY);
    return usersJson ? JSON.parse(usersJson) : [];
  }

  public getLoggedUser() {
    return this.currentUser;
  }
}

export const isLoggedGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (!authService.getLoggedUser()) {
    return router.parseUrl('/login');
  }

  return true;
};
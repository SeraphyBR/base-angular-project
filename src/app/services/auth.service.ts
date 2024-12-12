import { inject, Injectable } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { User, UserWithPassword } from '../models/user.model';
import { delay } from '../utils/misc.util';

const USERS_KEY = 'users';

@Injectable({
  providedIn: 'root',
})
export default class AuthService {
  public async login(username: string, password: string): Promise<User> {
    await delay(500); // Simulate HTTP request delay
    const users = await this.getUsers();
    const user = users.find((u) => u.username === username);
    if (!user) throw new Error("User doesn't exist");

    const hashHex = await this.hashPassword(password);

    if (hashHex !== user.password) throw new Error("Password doesn't match");

    localStorage.setItem('currentUser', JSON.stringify(user));

    return user;
  }

  public async signup(newUser: UserWithPassword): Promise<User> {
    await delay(500); // Simulate HTTP request delay
    const users = await this.getUsers();

    const existingUser = users.find((u) => u.username === newUser.username || u.email === newUser.email);
    if (existingUser) throw new Error('User already exists');

    const hashHex = await this.hashPassword(newUser.password);
    const userWithHashedPassword: UserWithPassword = { ...newUser, password: hashHex };
    localStorage.setItem(USERS_KEY, JSON.stringify([...users, userWithHashedPassword]));

    return userWithHashedPassword;
  }

  private async hashPassword(password: string): Promise<string> {
    const encoder = new TextEncoder();
    const data = encoder.encode(password);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
  }

  private async getUsers(): Promise<UserWithPassword[]> {
    await delay(500); // Simulate HTTP request delay
    const usersJson = localStorage.getItem(USERS_KEY);
    return usersJson ? JSON.parse(usersJson) : [];
  }

  public getLoggedUser(): User | undefined {
    const storedUser = localStorage.getItem('currentUser');
    return storedUser ? JSON.parse(storedUser) : undefined;
  }

  public async logout(): Promise<void> {
    await delay(200); // Simulate HTTP request delay
    localStorage.removeItem('currentUser');
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

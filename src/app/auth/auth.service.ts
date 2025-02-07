import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {LoginResponse} from '../data/interfaces/login-response.interface';
import {tap} from 'rxjs';
import {RegistrationResponse} from '../data/interfaces/registration-response.interface';
import {CookieService} from 'ngx-cookie-service';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  http = inject(HttpClient);
  cookieService = inject(CookieService)
  router = inject(Router);
  baseUrl = 'http://localhost:8081/api/auth';
  token: string | null = null;

  constructor() { }

  get isAuthenticated(): boolean {
    if (this.token == null) {
      this.token = this.cookieService.get('token')
    }
    return !!this.token;
  }

  login(payload: {email: string, password: string}){
    return this.http.post<LoginResponse>(`${this.baseUrl}/login`, payload).pipe(
      tap(value => {
        this.token = value.token;
        this.cookieService.set('token', this.token);
      }));
  }

  logout() {
    this.token = null;
    this.cookieService.deleteAll()
    this.router.navigate(['/login']);

  }

  registration(payload: {
    email: string,
    password: string,
    repeatPassword: string,
    firstName: string,
    lastName: string,
    shippingAddress: string,
  }){
    return this.http.post<RegistrationResponse>(`${this.baseUrl}/register`, payload)
  }
}

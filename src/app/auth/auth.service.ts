import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {LoginResponse} from '../interfaces/login-response.interface';
import {tap} from 'rxjs';
import {RegistrationResponse} from '../interfaces/registration-response.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  http = inject(HttpClient);
  baseUrl = 'http://localhost:8081/api/auth';
  token: string | null = null;

  constructor() { }

  login(payload: {email: string, password: string}){
    return this.http.post<LoginResponse>(`${this.baseUrl}/login`, payload).pipe(
      tap(value => {this.token = value.token}));
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

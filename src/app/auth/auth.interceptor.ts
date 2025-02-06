import {HttpInterceptorFn} from '@angular/common/http';
import {AuthService} from './auth.service';
import {inject} from '@angular/core';

export const AuthInterceptor: HttpInterceptorFn = (req, next) => {
  const token = inject(AuthService).token;

  if (!token) {
    return next(req);
  }

  req = req.clone({
    setHeaders: {
      'Authorization': `Bearer ${token}`
    }
  })
  return next(req);
}

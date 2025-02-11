import {Component, inject, signal} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {AuthService} from '../../auth/auth.service';
import {NgClass} from '@angular/common';
import {Router, RouterLink} from '@angular/router';

@Component({
  selector: 'app-login-page',
  imports: [ReactiveFormsModule, NgClass, RouterLink],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css'
})
export class LoginPageComponent {
  authService = inject(AuthService);
  router = inject(Router);
  isPasswordVisible = signal<boolean>(false);
  errorMessage: string = '';
  error: boolean = false;

  form = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, Validators.required),
  })

  resetError() {
    this.error = false;
    this.errorMessage = '';
  }

  omSubmit() {
    if (this.form.valid) {
      console.log(this.form.value)
      //@ts-ignore
      this.authService.login(this.form.value).subscribe({
          next: result  => {
            // console.log(result);
            this.router.navigate(['']);
          },
          error: err => {
            this.error = true;
            if (err.status === 401) {
              this.errorMessage = 'Please check your email or password.';
            } else {
              this.errorMessage = err.error.errors.join(', ');
            }
          }
        }
      )
    }
  }
}


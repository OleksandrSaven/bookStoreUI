import {Component, inject} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {AuthService} from '../../auth/auth.service';
import {NgClass} from '@angular/common';

@Component({
  selector: 'app-login-page',
  imports: [ReactiveFormsModule, NgClass],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css'
})
export class LoginPageComponent {
  authService = inject(AuthService);
  errorMessage: string = '';
  error: boolean = false;

  form = new FormGroup({
    email: new FormControl(null, Validators.required),
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
          next: result => {
            console.log(result);
            // redirect to main page
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


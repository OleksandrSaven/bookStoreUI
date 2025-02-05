import {Component, inject} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {AuthService} from '../../auth/auth.service';
import {NgClass, NgIf} from '@angular/common';
import {passwordMatchValidator} from '../../auth/password-validator/password-match-validator';

@Component({
  selector: 'app-registration-page',
  imports: [
    ReactiveFormsModule,
    NgIf,
    NgClass
  ],
  templateUrl: './registration-page.component.html',
  styleUrl: './registration-page.component.css'
})
export class RegistrationPageComponent {
  authService = inject(AuthService);
  emailError: string | null = null;

  // @ts-ignore
  form = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [Validators.required, Validators.minLength(6)]),
    repeatPassword: new FormControl(null, [Validators.required, Validators.minLength(6)]),
    firstName: new FormControl(null, [Validators.required, Validators.minLength(1)]),
    lastName: new FormControl(null, [Validators.required, Validators.minLength(1)]),
    shippingAddress: new FormControl(null, [Validators.required]),
  },
    {validators: passwordMatchValidator}
    )

  errorReset() {
    this.emailError = null;
  }

  onRegistrationSubmit() {
    if (this.form.valid) {
      console.log(this.form.value)
      //@ts-ignore
      this.authService.registration(this.form.value).subscribe({
        next: data => {
          console.log(data);
          //switch to the main page
        },
        error: err => {
          if (err.status === 403) {
            this.emailError = err.error.errors.join(',')
            console.log(this.emailError)
          }
        }
      })
    }
  }
}
